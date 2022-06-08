import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { WalletTransferGateways } from '../WalletTransferGateways';
import { SimplexForm } from '../SimplexForm';
import { MoonPayWidget } from '../MoonpayForm';
import { ModalContainer } from 'core/components/ModalContainer';
import { WithdrawForm } from '../WithdrawForm';
import { DepositModal } from '../DepositModal';
import { fetchGetCryptoAddress } from 'features/accountsSlice';
import { toDecimals } from 'utils/toDecimals';

import _find from 'lodash/find';

export const Wallet = ({
	activeLanguage,
	currencyCodes,
	account,
	currencyRates,
	tradingPairs,
	fetchingCryptoAddress,
	autoConversionPairs,
	setAutoConversionPair,
}) => {
	const [isActive, setActive] = useState(!!_find(autoConversionPairs, (pair) => account.id === pair.userAccountFromId));
	const activeCheckbox = useRef(null);
	const [showBuyWithCardModal, setShowBuyWithCardModal] = useState(false);
	const [showMoonPayForm, setShowMoonPayForm] = useState(false);
	const [showSimplexForm, setShowSimplexForm] = useState(false);
	const [showWithdrawForm, setShowWithdrawForm] = useState(false);
	const [showDepositModal, setShowDepositModal] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (!account.cryptoAddress || !account.qrUrl) {
			dispatch(fetchGetCryptoAddress(account.id));
		}
	}, [account.account.id]);

	const {
		supported_digital_currencies: simplexSupportedCrypto,
		supported_fiat_currencies: simplexSupportedFiat,
	} = useSelector((state) => state.simplex);

	const { supported_crypto_currencies: moonpaySupportedCrypto } = useSelector((state) => state.moonpay);

	const { kycStatus, userCurrency } = useSelector((state) => state.newUserSettings);

	const setAutoConversion = () => {
		setActive((isActive) => !isActive);
		activeCheckbox.current.checked = !isActive;
		setAutoConversionPair(account.id, !isActive);
	};

	const onBuyWithCardModalClick = () => {
		setShowBuyWithCardModal(true);
	};

	const closeBuyWithCardModal = () => {
		setShowBuyWithCardModal(false);
		closeSimplexForm();
		closeMoonPayForm();
	};

	const handleSimplexClick = () => {
		setShowSimplexForm(true);
	};

	const handleMoonpayClick = () => {
		setShowMoonPayForm(true);
	};

	const closeSimplexForm = () => {
		setShowSimplexForm(false);
	};

	const closeMoonPayForm = () => {
		setShowMoonPayForm(false);
	};

	const closeDepositModal = () => {
		setShowDepositModal(false);
	};

	const closeWithdrawModal = () => {
		setShowWithdrawForm(false);
	};

	const onDepositButtonClick = () => {
		setShowDepositModal(true);
	};

	const onWithdrawButtonClick = () => {
		setShowWithdrawForm(true);
	};

	const goToKYCPage = () => {
		history.push('/personal-page/kyc');
	};

	let percentageBalance, percentage;

	const baseCurrency = +userCurrency?.id ?? 840;

	const operatorExist = account.operatorExist;

	const { symbol, name, digits } = currencyCodes.find((currency_code) => currency_code.id === account.account.currency);

	const crDigits = currencyCodes.find((currency_code) => currency_code.id === baseCurrency)?.digits;

	const currencyRate = currencyRates.find((rate) => rate.fromCurrencyId === +account.account.currency);

	const accountIsEmpty = !(account.balance && !!+account.balance);

	if (typeof currencyRate !== 'undefined') {
		percentage = currencyRate.percentageChange24H;
		if (percentage > 0) {
			percentage = '+' + percentage;
			percentageBalance = true;
		} else {
			percentageBalance = false;
		}
	}

	if (account.balance.toString().indexOf('e') !== -1) {
		const str = account.balance.toString().split('e-');
		account.balance =
			'0.' +
			Math.pow(10, parseInt(str[1], 10) - 1)
				.toString()
				.slice(1) +
			parseInt(str[0], 10);
	}

	const currencyPriceSpanClassName =
		'account-wallet__currency-price-value' +
		(percentage ? ' account-wallet__currency-price--' + (percentageBalance ? 'positive' : 'negative') : '');
	const depositButtonClassName =
		'btn btn-primary account-transfer-button account-fill-button account-wallet__btn' +
		(account.account.enabled ? '' : ' disabled disabled-button');
	const depositByCardButtonClassName =
		'btn btn-orange account-transfer-button account-deposit-by-card-button account-wallet__btn' +
		(account.account.enabled ? '' : ' disabled disabled-button');
	const withdrawButtonClassName =
		'btn account-transfer-button account-withdraw-button account-wallet__btn' +
		(accountIsEmpty || !operatorExist ? ' disabled disabled-button' : '');

	const _pairs = tradingPairs.length > 0 && tradingPairs.find((e) => account.currencyIsoCode === e.currencyFrom);

	const isKYCPassed = kycStatus === '3';

	const buyWithCardModal = (
		<ModalContainer
			title={
				isKYCPassed
					? showSimplexForm || showMoonPayForm
						? 'Buy cryptocurrency'
						: 'Choose payment gateway'
					: 'Person verification incomplete'
			}
			fnmodalvisible={closeBuyWithCardModal}
			additionalClass={'fluid'}
		>
			<div className={'wallet-transfer-container'} style={{ height: showMoonPayForm ? '400px' : 'auto' }}>
				{kycStatus !== '3' && (
					<div className="complete-popup">
						<div className="complete-popup__title">Please pass KYC</div>
						<div style={{ textAlign: 'center', margin: '15px 0' }}>
							<img style={{ width: '100px' }} src="/img/modal-ico/modal-warning-ico.png" alt="Success" />
						</div>
						<div className="complete-popup__controls">
							<Link to="/personal-page/kyc">
								<button onClick={goToKYCPage} className="btn btn-orange complete-popup__controls-btn">
									Go to KYC Page
								</button>
							</Link>
						</div>
					</div>
				)}
				{isKYCPassed && !showSimplexForm && !showMoonPayForm && (
					<WalletTransferGateways
						account={account}
						simplexSupportedCrypto={simplexSupportedCrypto}
						moonpaySupportedCrypto={moonpaySupportedCrypto}
						handleSimplexClick={handleSimplexClick}
						handleMoonpayClick={handleMoonpayClick}
					/>
				)}

				{showSimplexForm && (
					<SimplexForm
						account={account}
						closeForm={closeSimplexForm}
						userCurrency={userCurrency}
						supportedFiat={simplexSupportedFiat}
						currencyCodes={currencyCodes}
					/>
				)}

				{showMoonPayForm && <MoonPayWidget accountId={account.id} />}
			</div>
		</ModalContainer>
	);

	const depositModal = (
		<ModalContainer fnmodalvisible={closeDepositModal} title={activeLanguage.wallet_deposit}>
			<DepositModal account={account} fetchingCryptoAddress={fetchingCryptoAddress} activeLanguage={activeLanguage} />
		</ModalContainer>
	);

	const withdrawModal = (
		<ModalContainer fnmodalvisible={closeWithdrawModal} title={activeLanguage.wallet_withdraw}>
			<WithdrawForm
				account={account}
				currencyCodes={currencyCodes}
				currencyRate={currencyRate}
				activeLanguage={activeLanguage}
				closeWithdrawModal={closeWithdrawModal}
			/>
		</ModalContainer>
	);

	return (
		<>
			<div className="account-wallet">
				<div className="account-wallet__title">
					{/* For TRI && XCC logos (!svg); */}
					{account.account.currency !== 2019 && account.account.currency !== 2018 ? (
						<img
							className="account-wallet__currency-ico"
							width="48"
							height="48"
							src={'/img/crypto-icons/_' + account.account.currency + '.svg'}
							alt={name}
						/>
					) : (
						<img
							className="account-wallet__currency-ico"
							width="48"
							height="48"
							src={'/img/crypto-icons/_' + account.account.currency + '.png'}
							alt={name}
						/>
					)}
					<div className="account-wallet__currency-fullname">{name}</div>
				</div>
				<div className="account-wallet__body">
					<div className="account-wallet__sum">
						{toDecimals(+account.balance, digits)} {symbol}
						{account.reserved > 0 && (
							<Link to={'/exchange/' + symbol + '/'} className="account-wallet__reserved">
								Exchange: {toDecimals(account.reserved, digits)} {symbol}
							</Link>
						)}
					</div>
					{typeof currencyRate !== 'undefined' && account.account.currency !== 2016 && (
						<div>
							<div className="account-wallet__currency-price">
								<span className="account-wallet__currency-value">
									1 {symbol} ~ {currencyRate?.value.toFixed(crDigits) || 0} USDC
								</span>
								<span className={currencyPriceSpanClassName}>{percentage} %</span>
								<span className="account-wallet__currency-period">(24 h)</span>
							</div>
							<>
								{typeof _pairs !== 'undefined' && (
									<div
										style={{
											borderTop: '1px solid #ccc',
											padding: '20px 10px 10px 0px',
										}}
									>
										<div className="jc-checkbox" onClick={() => setAutoConversion(account.id)}>
											<input type="checkbox" ref={activeCheckbox} defaultChecked={isActive} />
											<label></label>
											<div className="jc-checkbox__description">Auto convert to {_pairs.currencyTo}</div>
										</div>
									</div>
								)}
							</>
						</div>
					)}
				</div>
				<div className="account-wallet__controls">
					<button disabled={account.blocked} className={depositButtonClassName} onClick={onDepositButtonClick}>
						{activeLanguage.wallet_deposit}
					</button>
					<button
						className={withdrawButtonClassName}
						onClick={onWithdrawButtonClick}
						disabled={accountIsEmpty || account.blocked || !operatorExist}
					>
						{activeLanguage.wallet_withdraw}
					</button>
					{((simplexSupportedCrypto.length > 0 && simplexSupportedCrypto.includes(account.currencyIsoCode)) ||
						(moonpaySupportedCrypto.length > 0 && moonpaySupportedCrypto.includes(account.currencyIsoCode))) && (
						<button
							className={depositByCardButtonClassName}
							onClick={onBuyWithCardModalClick}
							disabled={!currencyRate || account.blocked}
						>
							{activeLanguage.wallet_deposit_by_card}
						</button>
					)}
				</div>
			</div>
			{showBuyWithCardModal && buyWithCardModal}
			{showDepositModal && depositModal}
			{showWithdrawForm && withdrawModal}
		</>
	);
};
