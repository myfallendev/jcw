import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';

import _debounce from 'lodash/debounce';
import _isEmpty from 'lodash/isEmpty';
import _forEach from 'lodash/forEach';

import * as accountActions from 'actions/AccountActions';
import { fetchGetAccounts } from 'features/accountsSlice';
import { fetchGetTradingPairs } from 'features/Exchange/tradingSlice';

import { Loader } from 'core/components/Loader';
import { ModalPDF } from 'core/components/ModalPDF';

import { PaymentAccountsList } from './components/PaymentAccountsList';

import validateAmount from 'utils/validateAmount';
import isInternetExplorer from 'utils/isIE';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import createToastMessage from '../../utils/createToastMessage';

class PaymentsPage extends Component {

	state = {
		baseCurrency: null,
		sellRate: false,

		senderAccId: null,
		senderCurrencyIsoCode: null,
		senderAccountCurrencyId: null,
		senderBalance: 0,
		senderAccountValidated: true,

		receiverAccId: null,
		receiverCurrencyIsoCode: null,
		receiverAccountCurrencyId: null,
		receiverBalance: 0,
		receiverAccountValidated: true,

		minAmount: 0,
		writeOffAmount: 0,

		amountValidated: true,
		amountIsTooSmall: false,

		userIsAgreed: false, //Agreed to payments Terms and Conditions
	};

	constructor(props) {
		super(props);
		this.accuracy = 8;
		this.amountFieldsAreEmpty = true;
		this.amountOffOverflowed = false;
		this.updateRate = _debounce(this.updateRate, 300);
		this.currencyFromId = null;
		this.currencyToId = null;
		this.senderAmountIsChanged = null;
	}

	componentDidMount = () => {
		this.props.fetchGetTradingPairs();
		if (!this.props.accounts.length) this.props.fetchGetAccounts();
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (!prevState.baseCurrency && this.props.tradingPairs.length) {
			const baseCurrency = this.props.tradingPairs.reduce((acc, next) =>
				next.currencyToId === acc.currencyToId ? next : acc
			);
			this.setState({
				baseCurrency: baseCurrency && baseCurrency.currencyToId,
			});
		}

		if (
			this.props.tradingPairs.length &&
			this.state.baseCurrency &&
			this.state.senderAccountCurrencyId &&
			this.state.senderAccountCurrencyId !== prevState.senderAccountCurrencyId &&
			this.state.senderAccountCurrencyId !== this.state.baseCurrency &&
			this.props.tradingPairs.find((pair) => pair.currencyFromId === this.state.senderAccountCurrencyId)
		) {
			this.setState({
				...this.state,
				minAmount: this.props.tradingPairs.find((pair) => pair.currencyFromId === this.state.senderAccountCurrencyId)
					.minAmount,
			});
		} else if (
			this.props.tradingPairs.length &&
			this.state.baseCurrency &&
			this.state.receiverAccountCurrencyId &&
			this.state.receiverAccountCurrencyId !== prevState.receiverAccountCurrencyId &&
			this.state.receiverAccountCurrencyId !== this.state.baseCurrency &&
			this.props.tradingPairs.find((pair) => pair.currencyFromId === this.state.receiverAccountCurrencyId)
		) {
			this.setState({
				...this.state,
				minAmount: this.props.tradingPairs.find((pair) => pair.currencyFromId === this.state.receiverAccountCurrencyId)
					.minAmount,
			});
		}

		if (this.props.ratePair && this.props.ratePair !== prevProps.ratePair) {
			if (this.senderAmountIsChanged !== null) {
				this.senderAmountIsChanged
					? this.setCalculatedAmount(this.refs.amountOff.value, true)
					: this.setCalculatedAmount(this.refs.amountTo.value, false);
			}
		}

		if (prevProps.paymentDone !== this.props.paymentDone) {
			this.props.fetchGetAccounts();
			this.refs.amountOff.value = '';
			this.refs.amountTo.value = '';
			this.refs.confirmationSubmit.setAttribute('disabled', true);
			return;
		}
	};

	componentWillUnmount = () => {
		this.props.accountActions.resetAccounts();
		this.props.accountActions.closeConfirmationPopup();
	};

	static currencyRatePairCallback = (succeed, message) => {
		console.log('>>>>>>>>', message);
		createToastMessage(message, succeed ? 'info' : 'error');
	};

	//DOM error messages clear
	clearErrors = () => {
		this.setState({
			senderAccountValidated: true,
			receiverAccountValidated: true,
			amountValidated: true,
		});

		this.refs.senderAccountError.innerHTML = '';
		this.refs.receiverAccountError.innerHTML = '';
		this.refs.amountError.innerHTML = '';
		this.refs.amountToError.innerHTML = '';
		this.refs.checkBoxError.innerHTML = '';
	};

	resetSenderAccount = () => {
		this.props.accountActions.changeSenderAccount(this.props.accounts.find((account) => account.id === -1));
		this.setState({
			senderAccId: null,
			senderCurrencyIsoCode: null,
			senderAccountCurrencyId: null,
			senderBalance: 0,
		});
		this.refs.amountOff.value = '';
		this.amountOffOverflowed = false;
	};

	resetReceiverAccount = () => {
		this.props.accountActions.changeReceiverAccount(this.props.accounts.find((account) => account.id === -1));
		this.setState({
			receiverAccId: null,
			receiverCurrencyIsoCode: null,
			receiverAccountCurrencyId: null,
			writeOffAmount: 0,
			receiverBalance: 0,
		});
		this.refs.amountTo.value = '';
	};

	// select list open/close handler
	closeAccLists = (event) => {
		if (event.target.className === 'account-list' || event.target.className === 'account') return;
		if (this.props.senderAccountListOpened)
			this.props.accountActions.changeSenderAccountListStatus(!this.props.senderAccountListOpened);
		if (this.props.receiverAccountListOpened)
			this.props.accountActions.changeReceiverAccountListStatus(!this.props.receiverAccountListOpened);
	};

	//sender account after select state change
	changeSenderAccountListStatus = (id, balance = 0, currencyIsoCode, currencyId) => {
		const { accounts, accountActions, senderAccountListOpened, receiverAccount } = this.props;
		const { baseCurrency, senderAccId } = this.state;
		const currencyToId = this.currencyToId;

		this.clearErrors();

		id &&
			currencyId &&
			this.setState({
				writeOffAmount: 0,
				senderBalance: balance,
				senderCurrencyIsoCode: currencyIsoCode,
				senderAccountCurrencyId: currencyId,
				senderAccId: id,
			});
		if (id !== senderAccId) {
			const selectedAccount = accounts.find((account) => account.id === id);
			this.currencyFromId = selectedAccount && selectedAccount.account.currency;
			this.refs.amountOff.value = '';

			if (senderAccountListOpened && receiverAccount !== undefined && !_isEmpty(receiverAccount)) {
				const fromCurrencyId =
					currencyToId !== baseCurrency ? receiverAccount.account.currency : selectedAccount.account.currency;
				const toCurrencyId =
					currencyToId !== baseCurrency ? selectedAccount.account.currency : receiverAccount.account.currency;

				accountActions.getCurrencyRatePair({
					fromCurrencyId,
					toCurrencyId,
					sellRate: currencyToId !== baseCurrency,
					volume: 1,
					callback: PaymentsPage.currencyRatePairCallback,
				});
			}
			if (senderAccountListOpened) accountActions.changeSenderAccount(selectedAccount);
		}

		this.props.accountActions.changeSenderAccountListStatus(!senderAccountListOpened);
	};

	//receiver account after select state change
	changeReceiverAccountListStatus = (id, balance = 0, currencyIsoCode, currencyId) => {
		const { receiverAccountListOpened, accounts, senderAccount, accountActions } = this.props;
		const { baseCurrency, receiverAccId } = this.state;
		const currencyFromId = this.currencyFromId;

		this.clearErrors();

		id !== null &&
			currencyId &&
			this.setState({
				writeOffAmount: 0,
				receiverBalance: balance,
				receiverCurrencyIsoCode: currencyIsoCode,
				receiverAccountCurrencyId: currencyId,
				receiverAccId: id,
			});
		if (id !== receiverAccId) {
			const selectedAccount = accounts.find((account) => account.id === id);
			this.currencyToId = selectedAccount && selectedAccount.account.currency;
			this.refs.amountTo.value = '';

			if (receiverAccountListOpened && !_isEmpty(senderAccount) && selectedAccount !== undefined) {
				const fromCurrencyId =
					currencyFromId === baseCurrency ? selectedAccount.account.currency : senderAccount.account.currency;
				const toCurrencyId =
					currencyFromId === baseCurrency ? senderAccount.account.currency : selectedAccount.account.currency;
				this.setState({ sellRate: currencyFromId === baseCurrency });

				accountActions.getCurrencyRatePair({
					fromCurrencyId,
					toCurrencyId,
					sellRate: currencyFromId === baseCurrency,
					volume: 1,
					callback: PaymentsPage.currencyRatePairCallback,
				});
			}
			if (receiverAccountListOpened) accountActions.changeReceiverAccount(selectedAccount);
		}
		accountActions.changeReceiverAccountListStatus(!receiverAccountListOpened);
	};

	closeConfirmationPopup = () => this.props.accountActions.closeConfirmationPopup();

	//validate input fields, send account payment request
	accountPayment = () => {
		const {
			senderAccount,
			receiverAccount,
			activeLanguage,
			fetchingPaymentRequest,
			accountActions,
			ratePair,
		} = this.props;

		const { senderAccId, receiverAccId, senderBalance, userIsAgreed } = this.state;

		const {
			senderAccountError,
			receiverAccountError,
			amountOff,
			amountTo,
			amountError,
			amountToError,
			checkbox,
			checkBoxError,
		} = this.refs;

		if (
			fetchingPaymentRequest ||
			!senderAccId ||
			!receiverAccId ||
			!senderBalance ||
			!userIsAgreed ||
			this.amountOffOverflowed ||
			this.amountFieldsAreEmpty
		)
			return;

		this.clearErrors();
		let paymentFieldsVerified = true;
		let objForSetState = {};

		if (_isEmpty(senderAccount)) {
			senderAccountError.innerHTML = activeLanguage.sender_account_error_text;
			paymentFieldsVerified = false;

			Object.assign(objForSetState, { senderAccountValidated: false });
		}

		if (_isEmpty(receiverAccount)) {
			receiverAccountError.innerHTML = activeLanguage.receiver_account_error_text;
			paymentFieldsVerified = false;

			Object.assign(objForSetState, { receiverAccountValidated: false });
		}

		if (senderAccount.balance < this.state.writeOffAmount) {
			amountError.innerHTML = activeLanguage.conversion_balance_error_text;
			amountToError.innerHTML = activeLanguage.conversion_balance_error_text;
			paymentFieldsVerified = false;

			Object.assign(objForSetState, { amountValidated: false });
		}

		if (!amountOff.value || !amountTo.value) {
			amountError.innerHTML = activeLanguage.conversion_amount_error_text;
			amountToError.innerHTML = activeLanguage.conversion_amount_error_text;
			paymentFieldsVerified = false;

			Object.assign(objForSetState, { amountValidated: false });
		}

		if (!checkbox.checked) {
			checkBoxError.innerHTML = activeLanguage.conversion_conditions_error_text;
			paymentFieldsVerified = false;
		}

		if (!paymentFieldsVerified) {
			this.setState(objForSetState);

			return;
		}

		accountActions.accountPaymentRequest(
			senderAccount.id,
			receiverAccount.id,
			amountOff.value,
			ratePair.value,
			(succeed, message) => {
				createToastMessage(message, succeed ? 'info' : 'error');
			}
		);

		this.resetSenderAccount();
		this.resetReceiverAccount();
		this.refs.amountOff.value = '';
		this.refs.amountTo.value = '';
		this.refs.checkbox.checked = false;

		this.setState({ userIsAgreed: false });
	};

	// рассчитать сколько валюты будет списано
	calcAmountOff = (value) => {
		const { ratePair } = this.props;
		const { sellRate } = this.state;

		if (_isEmpty(ratePair) || !ratePair.value) return 0;

		const floatValue = parseFloat(value);
		const floatRatePair = parseFloat(ratePair.value);

		const result = (sellRate ? floatValue * floatRatePair : floatValue / floatRatePair).toFixed(this.accuracy);

		const superZero = '0.' + Array(this.accuracy + 1).join('0');

		return result === superZero ? '' : +result;
	};

	//рассчитать сколько валюты будет получено
	calcAmountTo = (value) => {
		const { ratePair } = this.props;
		const { sellRate } = this.state;

		if (_isEmpty(ratePair) || !ratePair.value) return 0;

		const floatValue = parseFloat(value);
		const floatRatePair = parseFloat(ratePair.value);

		const result = (sellRate ? floatValue / floatRatePair : floatValue * floatRatePair).toFixed(this.accuracy);

		const superZero = '0.' + Array(this.accuracy + 1).join('0');

		return result === superZero ? '' : +result;
	};

	updateRate = (volume) => {
		if (!volume) return;
		this.props.accountActions.getCurrencyRatePair({
			fromCurrencyId: this.senderAmountIsChanged ? this.currencyFromId : this.currencyToId,
			toCurrencyId: this.senderAmountIsChanged ? this.currencyToId : this.currencyFromId,
			sellRate: this.senderAmountIsChanged === false,
			volume,
			callback: PaymentsPage.currencyRatePairCallback,
		});
	};

	setMaxOffAmount = (e) => {
		e.preventDefault();

		this.refs.amountOff.value = this.state.senderBalance;
		this.handleOffAmountChange(this.state.senderBalance);
	};

	checkMinTradingAmount = (amount) => {
		if (!this.state.sellRate) {
			this.refs.amountError.innerHTML =
				+amount < this.state.minAmount && parseFloat(amount) > 0
					? this.props.activeLanguage.amount_is_to_small + this.state.minAmount + ' ' + this.state.senderCurrencyIsoCode
					: '';
		} else {
			this.refs.amountToError.innerHTML =
				+amount < this.state.minAmount && parseFloat(amount) > 0
					? this.props.activeLanguage.amount_is_to_small +
					  this.state.minAmount +
					  ' ' +
					  this.state.receiverCurrencyIsoCode
					: '';
		}
	};

	setCalculatedAmount = (value, isChangedAmountOff) => {
		if (isChangedAmountOff) {
			//calc amountTo and show it in view
			const amountTo = this.calcAmountTo(+value);
			this.refs.amountTo.value = amountTo || '';

			//if convert coin to [basecurrency] pick right writeOff amount
			const amount = this.state.sellRate ? amountTo : +value;

			//change state accordingly
			this.setState({ writeOffAmount: amount });

			//check if withdrawal amount < then balance and write bool to variable
			this.amountOffOverflowed = +value > this.state.senderBalance;

			this.checkMinTradingAmount(amount);

			//check if amount inputs are empty or not and write bool to variable
			this.amountFieldsAreEmpty = !+value || !amountTo;

			this.updateSubmitAvailability();
		} else {
			const amountOff = this.calcAmountOff(+value);
			this.refs.amountOff.value = amountOff || '';

			const amount = this.state.sellRate ? +value : amountOff;

			this.setState({ writeOffAmount: amount });

			this.amountOffOverflowed = +amountOff > this.state.senderBalance;
			this.amountFieldsAreEmpty = !+value || !amountOff;

			if (this.amountOffOverflowed && this.refs.accountContainerSpan && this.refs.amountOff) {
				this.refs.accountContainerSpan.classList.add('overflow');
				this.refs.amountOff.classList.add('overflow');
			}

			this.checkMinTradingAmount(amount);

			this.updateSubmitAvailability();
		}
	};

	//onchange input 'amount from' handler
	handleOffAmountChange = (value) => {
		if (!this.state.receiverAccId) return;
		this.senderAmountIsChanged = true;
		this.updateRate(+value || 0);
	};

	//onchange input 'amount to' handler
	handleToAmountChange = (value) => {
		if (!this.state.senderAccId) return;
		this.senderAmountIsChanged = false;
		this.updateRate(+value || 0, this.state.receiverAccountCurrencyId);
	};

	updateSubmitAvailability = () => {
		if (this.checkIfSubmitDisabled()) {
			this.refs.confirmationSubmit.setAttribute('disabled', true);
		} else {
			this.refs.confirmationSubmit.removeAttribute('disabled');
		}
	};

	handleAgreeClick = (value) => this.setState({ userIsAgreed: value });

	handleTermsFileLinkClick = (e, title) => {
		document.body.style.overflow = 'hidden';
		e.preventDefault();
		this.setState({
			showPdfModal: true,
			pdfModalTitle: title,
			pdfModalLink: e.target.href,
		});
	};

	handlePdfModalCloseClick = () => {
		document.body.style.overflow = '';

		this.setState({ showPdfModal: false });
	};

	checkIfSubmitDisabled = () => {
		const { senderAccount, receiverAccount, fetchingPaymentRequest, fetchingRatePair, ratePairError } = this.props;

		const { senderAccId, receiverAccId, userIsAgreed } = this.state;
		const fetching = fetchingPaymentRequest || fetchingRatePair;
		const amountValidated =
			this.state.amountValidated && (_isEmpty(senderAccount) || _isEmpty(receiverAccount) || !ratePairError);

		return (
			!senderAccId ||
			!receiverAccId ||
			!userIsAgreed ||
			!amountValidated ||
			fetching ||
			this.amountOffOverflowed ||
			this.amountFieldsAreEmpty
		);
	};

	render() {
		const {
			senderAccount,
			receiverAccount,
			senderAccountListOpened,
			receiverAccountListOpened,
			accounts,
			showConfirmationPopup,
			fetchingPaymentRequest,
			fetchingRatePair,
			ratePairError,
			activeLanguage,
			fetchingTradingPairs,
			tradingPairs,
		} = this.props;

		const {
			senderAccId,
			receiverAccId,
			senderBalance,
			receiverBalance,
			senderCurrencyIsoCode,
			receiverCurrencyIsoCode,
		} = this.state;

		const senderAccountId = _isEmpty(senderAccount) ? null : senderAccount.id;
		const receiverAccountId = _isEmpty(receiverAccount) ? null : receiverAccount.id;

		let walletsWithBalance = 0;
		accounts.forEach((account) => {
			if (parseFloat(account.balance) > 0) {
				walletsWithBalance++;
			}
		});

		const isIE = isInternetExplorer();
		const fetching = fetchingPaymentRequest || fetchingRatePair;
		const submitIsDisabled = this.checkIfSubmitDisabled();
		const ratePairErrorExist =
			ratePairError && ratePairError.errors && Array.isArray(ratePairError.errors) && ratePairError.errors.length;

		// ??!?? что это зачем это
		const amountValidated =
			this.state.amountValidated && (_isEmpty(senderAccount) || _isEmpty(receiverAccount) || !ratePairError);

		const _all_pairs = []; //все возможные валюты для обмена на бирже
		const _pairs1 = []; //пары для выбора 1
		const _pairs2 = []; // пары для выбора 2

		//заполняем массивы
		if (tradingPairs.length) {
			_forEach(tradingPairs, (pair) => {
				if (pair.currencyFrom && !_all_pairs.includes(pair.currencyFrom)) {
					_all_pairs.push(pair.currencyFrom);
					if (!_pairs1.includes(pair.currencyFrom)) _pairs1.push(pair.currencyFrom);
				}
				if (pair.currencyTo && !_all_pairs.includes(pair.currencyTo)) {
					_all_pairs.push(pair.currencyTo);
					if (!_pairs2.includes(pair.currencyTo)) _pairs2.push(pair.currencyTo);
				}
			});
		}

		//отфильтрованные кошельки для начального/первого выбора
		const _accounts = accounts.filter((account) => _all_pairs.includes(account.currencyIsoCode));

		return (
			<div className="content payments-page">
				<ToastContainer />

				<div className="row">
					<div className="left-column">
						<div className="transfer" onClick={this.closeAccLists}>
							{fetchingTradingPairs && (
								<div className="payments-loader">
									<Loader />
								</div>
							)}
							<div style={{ display: fetchingTradingPairs ? 'none' : 'block' }}>
								<h1 className="transfer__title">{activeLanguage.conversion}</h1>

								<div className="account-container sender-account">
									<p className="account-container__field-descripion">From</p>
									<div className={'account-list ' + (senderAccountListOpened ? 'opened' : 'closed')}>
										{senderAccount !== undefined && Object.keys(senderAccount).length ? (
											<div className="current-sender-account">
												<p onClick={() => this.changeSenderAccountListStatus(senderAccountId)}>
													{isIE ? (
														<img
															style={{ width: '32px', marginRight: '15px' }}
															src={'/img/' + senderAccount.account.image}
															alt={senderAccount.name}
														/>
													) : (
														<img
															style={{ marginRight: '15px' }}
															width="32"
															height="auto"
															src={
																'/img/crypto-icons/' +
																senderAccount.currencyIsoCode.toLowerCase() +
																(senderAccount.account.currency === 2018 || senderAccount.account.currency === 2019
																	? '.png'
																	: '.svg')
															}
															alt={senderAccount.name}
														/>
													)}
													{senderAccount.name}
												</p>
												<button className="clear-current-acc" onClick={this.resetSenderAccount}>
													+
												</button>
											</div>
										) : (
											<input
												type="text"
												placeholder={activeLanguage.sender_text}
												className={this.state.senderAccountValidated ? '' : 'unvalidated'}
												onClick={() => this.changeSenderAccountListStatus(senderAccountId)}
												readOnly={true}
											/>
										)}
										<ul>
											<ScrollArea style={{ position: 'relative', overflow: 'hidden' }}>
												{!receiverAccId &&
													_accounts.length &&
													_accounts.map(
														(account) =>
															parseFloat(account.balance) > 0 && (
																<PaymentAccountsList
																	key={account.id}
																	account={account}
																	onChange={this.changeSenderAccountListStatus}
																/>
															)
													)}

												{receiverAccId &&
													_accounts.length &&
													_pairs1.includes(receiverCurrencyIsoCode) &&
													_accounts
														.filter((_item) => _pairs2.includes(_item.currencyIsoCode))
														.map(
															(account) =>
																parseFloat(account.balance) > 0 && (
																	<PaymentAccountsList
																		key={account.id}
																		account={account}
																		onChange={this.changeSenderAccountListStatus}
																	/>
																)
														)}

												{receiverAccId &&
													_accounts.length &&
													_pairs2.includes(receiverCurrencyIsoCode) &&
													_accounts
														.filter((_item) => _pairs1.includes(_item.currencyIsoCode))
														.map(
															(account) =>
																parseFloat(account.balance) > 0 && (
																	<PaymentAccountsList
																		key={account.id}
																		account={account}
																		onChange={this.changeSenderAccountListStatus}
																	/>
																)
														)}

												{walletsWithBalance === 0 && <li className="account">No wallet with available balance</li>}
											</ScrollArea>
										</ul>
									</div>
									<p className="field-error" ref="senderAccountError"></p>

									<p className="account-container__field-descripion">
										<span>Amount</span>
										{senderAccountId && (
											<span
												ref="accountContainerSpan"
												className={'account-container__available' + (this.amountOffOverflowed ? ' overflow' : '')}
											>
												balance: <b>{senderBalance}</b> {' ' + senderCurrencyIsoCode}
											</span>
										)}
									</p>

									<div className="account-container__amount-container" ref="amountOffContainer">
										<input
											type="text"
											ref="amountOff"
											className={
												'account-payment-amount' +
												(amountValidated ? '' : ' unvalidated') +
												(fetching ? ' blur' : '') +
												(this.amountOffOverflowed ? ' overflow' : '')
											}
											placeholder={activeLanguage.amount_text}
											onClick={this.clearErrors}
											onChange={(e) => this.handleOffAmountChange(e.target.value)}
											onInput={validateAmount}
											disabled={!this.state.senderAccId || !this.state.receiverAccId}
										/>
										{senderBalance > 0 && (
											<button className="account-container__max-button" onClick={this.setMaxOffAmount}>
												MAX
											</button>
										)}
									</div>
									{!amountValidated && ratePairErrorExist && (
										<p className="field-error">{ratePairError.errors[0].value}</p>
									)}
									<p className="field-error" ref="amountError"></p>
								</div>

								<div className="account-container receiver-account">
									<p className="account-container__field-descripion">
										<span>To</span>
									</p>
									<div className={'account-list ' + (receiverAccountListOpened ? 'opened' : 'closed')}>
										{!_isEmpty(receiverAccount) ? (
											<div className="current-receiver-account">
												<p onClick={() => this.changeReceiverAccountListStatus(receiverAccountId)}>
													{isIE ? (
														<img
															style={{ width: '32px', marginRight: '15px' }}
															src={'/img/' + receiverAccount.account.image}
															alt=""
														/>
													) : (
														<img
															style={{ marginRight: '15px' }}
															width="32"
															height="auto"
															src={
																'/img/crypto-icons/' +
																receiverAccount.currencyIsoCode.toLowerCase() +
																(receiverAccount.account.currency === 2018 || receiverAccount.account.currency === 2019
																	? '.png'
																	: '.svg')
															}
															alt={receiverAccount.account.name}
														/>
													)}
													{receiverAccount.name}
												</p>
												<button className="clear-current-acc" onClick={this.resetReceiverAccount}>
													+
												</button>
											</div>
										) : (
											<input
												type="text"
												placeholder={activeLanguage.receiver_text}
												className={this.state.receiverAccountValidated ? '' : 'unvalidated'}
												onClick={() => this.changeReceiverAccountListStatus(receiverAccountId)}
												readOnly={true}
											/>
										)}
										<ul>
											<ScrollArea style={{ position: 'relative', overflow: 'hidden' }}>
												{!senderAccId &&
													_accounts.length &&
													_accounts.map((account) => (
														<PaymentAccountsList
															key={account.id}
															account={account}
															onChange={this.changeReceiverAccountListStatus}
														/>
													))}

												{senderAccId &&
													_accounts.length &&
													_pairs1.includes(senderCurrencyIsoCode) &&
													_accounts
														.filter((_item) => _pairs2.includes(_item.currencyIsoCode))
														.map((account) => (
															<PaymentAccountsList
																key={account.id}
																account={account}
																onChange={this.changeReceiverAccountListStatus}
															/>
														))}

												{senderAccId &&
													_accounts.length &&
													_pairs2.includes(senderCurrencyIsoCode) &&
													_accounts
														.filter((_item) => _pairs1.includes(_item.currencyIsoCode))
														.map((account) => (
															<PaymentAccountsList
																key={account.id}
																account={account}
																onChange={this.changeReceiverAccountListStatus}
															/>
														))}

												{walletsWithBalance === 0 && <li className="account">No wallet with available balance</li>}
											</ScrollArea>
										</ul>
									</div>
									<p className="field-error" ref="receiverAccountError"></p>
									<p className="account-container__field-descripion">
										<span>Amount</span>
										{receiverAccountId && (
											<span className="account-container__available">
												balance: <b ref="max-to">{receiverBalance}</b>
												{' ' + receiverCurrencyIsoCode}
											</span>
										)}
									</p>
									<input
										type="text"
										ref="amountTo"
										className={
											'account-payment-amount ' + (amountValidated ? '' : 'unvalidated') + (fetching ? ' blur' : '')
										}
										placeholder={activeLanguage.amount_text}
										onClick={this.clearErrors}
										onChange={(e) => this.handleToAmountChange(e.target.value)}
										onInput={validateAmount}
										disabled={!this.state.senderAccId || !this.state.receiverAccId}
									/>
									{!amountValidated && ratePairErrorExist && (
										<p className="field-error">{ratePairError.errors[0].value}</p>
									)}
									<p className="field-error" ref="amountToError"></p>
								</div>

								<div className="confirmation">
									<div className="checkbox-area">
										<input
											id="payment-terms"
											ref="checkbox"
											type="checkbox"
											onClick={(e) => this.handleAgreeClick(e.target.checked)}
										/>
										<label></label>
									</div>

									<p className="confirmation-text">
										<span>{activeLanguage.agreement_text}</span>
										<a
											className="terms-and-privacy-policy__link"
											href="./docs/JetCrypto_Terms_of_Use.pdf"
											target="_blank"
										>
											{activeLanguage.terms_and_conditions}
										</a>
									</p>
									<p className="field-error" ref="checkBoxError"></p>
								</div>
								<button
									ref="confirmationSubmit"
									className="btn btn-primary"
									onClick={this.accountPayment}
									disabled={submitIsDisabled}
								>
									{activeLanguage.convert_btn}
								</button>
							</div>
							{fetching && <Loader />}
						</div>

						{showConfirmationPopup && (
							<div className="popup confirm-payment-popup">
								<p>{activeLanguage.payment_success_text}</p>
								<button className="btn btn-orange btn-large" onClick={this.closeConfirmationPopup}>
									{activeLanguage.ok_btn}
								</button>
							</div>
						)}
					</div>

					{this.state.showPdfModal && (
						<ModalPDF
							onCloseClick={this.handlePdfModalCloseClick}
							title={this.state.pdfModalTitle}
							pdfLink={this.state.pdfModalLink}
						/>
					)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		activeLanguage: state.language.languages[state.language.activeLanguage],
		userCurrency: state.newUserSettings.userCurrency,
		currencyCodes: state.currencyCodes.codes,
		accounts: state.newAccounts.accounts,
		tradingPairs: state.trading.tradingPairs,

		senderAccount: state.accounts.senderAccount,
		senderAccountListOpened: state.accounts.senderAccountListOpened,

		receiverAccount: state.accounts.receiverAccount,
		receiverAccountListOpened: state.accounts.receiverAccountListOpened,

		ratePair: state.accounts.ratePair,
		ratePairError: state.accounts.ratePairError,
		fetchingRatePair: state.accounts.fetchingRatePair,

		fetchingTradingPairs: state.trading.fetchingTradingPairs,
		fetchingPaymentRequest: state.accounts.fetchingPaymentRequest,

		showConfirmationPopup: state.accounts.showConfirmationPopup,
		paymentDone: state.accounts.paymentDone,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		accountActions: bindActionCreators(accountActions, dispatch),
		fetchGetAccounts: () => dispatch(fetchGetAccounts()),
		fetchGetTradingPairs: () => dispatch(fetchGetTradingPairs())
	};
}

export const Converter = connect(mapStateToProps, mapDispatchToProps)(PaymentsPage);
