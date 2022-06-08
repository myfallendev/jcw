import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { toDecimals } from 'utils/toDecimals';

import {
	withdrawReset,
	fetchWithdrawToWallet,
	fetchTransferByPhone,
	hideWrongCodePopup,
	hideServerError,
	hideResultIsSuccessPopup,
	hideResultIsFailurePopup,
	fetchIsJCAccount,
	resetIsJCAccountErrors,
} from './withdrawSlice';
import { fetchGetFees } from 'features/feesSlice';

import validateAmount from 'utils/validateAmount';
//import isDevServer from 'utils/isDevServer';
import walletMasks from 'utils/walletMasks';

import { Loader } from 'core/components/Loader';

import QrReader from 'react-qr-reader';
import WAValidator from 'wallet-address-validator';
import { TransferResult } from '../TransferResult';

export const WithdrawForm = ({ account, currencyRate = 0, currencyCodes, activeLanguage, closeWithdrawModal }) => {
	const [showError, setShowError] = useState({
		amountError: false,
		balanceError: false,
		addressError: false,
		fieldPatternError: false,
		addressPatternError: false,
	});
	const {
		fetching,
		withdrawToWalletCodeRequest,
		withdrawToWalletFailed,
		withdrawToWalletSuccess,
		withdrawToWalletVerificationType,
		transferByPhoneCodeRequest,
		transferByPhoneFailed,
		transferByPhoneSuccess,
		transferByPhoneVerificationType,
		showVerificationCodeErrorMsg,
		showServerErrorMsg,
		checkExists,
		errors,
	} = useSelector((state) => state.withdraw);
	const { fees } = useSelector((state) => state.fees);
	const { operators } = useSelector((state) => state.newAccounts);
	const { userCurrency } = useSelector((state) => state.newUserSettings);

	const dispatch = useDispatch();

	const [maxUserCurrencyAmount, setMaxUserCurrencyAmount] = useState(0);
	const [maxAmount, setMaxAmount] = useState(0);
	const [amount, setAmount] = useState(0);
	const [withdrawAmount, setWithdrawAmount] = useState(0);
	const [userCurrencyAmount, setUserCurrencyAmount] = useState(0);
	const [digits, setDigits] = useState(0);
	const [withdrawQuery, setWithdrawQuery] = useState({});
	const [showCamera, setShowCamera] = useState(false);
	const [showCameraErr, setShowCameraErr] = useState(false);
	const [fields, setFields] = useState([]);
	const [withdrawTo, setWithdrawTo] = useState('wallet');
	const [phone, setPhone] = useState('+1');
	const [phoneValidated, setPhoneValidated] = useState(false);
	const [walletAddress, setWalletAddress] = useState('');
	const [currentFee, setCurrentFee] = useState(0);
	const [confCode, setConfCode] = useState('');
	const [feeMode, setFeeMode] = useState('');
	const fieldsRef = useRef([]);
	const getMaxAmount = useCallback(() => {
		const maxAmount = account?.balance ? account.balance - (checkExists ? 0 : currentFee) : 0;
		return toDecimals(+maxAmount, digits);
	}, [account, checkExists, currentFee, digits]);

	const walletInput = useRef();

	useEffect(() => {
		dispatch(fetchGetFees());
		dispatch(resetIsJCAccountErrors());
		dispatch(withdrawReset());
	}, [dispatch]);

	useEffect(() => {
		const currentOp = operators.find((op) => op.currencyId === account.account.currency);
		if (currentOp?.fields) {
			setFields(currentOp.fields);
		}
		const wCurrency = currencyCodes.find((currency_code) => currency_code.id === account.account.currency);
		setDigits(wCurrency.digits);
	}, [currencyCodes, operators, account.account.currency]);

	useEffect(() => {
		fieldsRef.current = fieldsRef.current.slice(0, fields.length);
	}, [fields]);

	useEffect(() => {
		if (walletAddress) {
			setMaxAmount(getMaxAmount());
			setWithdrawAmount(toDecimals(+amount, digits));
		}
		if (checkExists === false) {
			setFeeMode('add');
			setWithdrawAmount(toDecimals(+amount + currentFee, digits));
		}
	}, [checkExists]);

	useEffect(() => {
		const wAmount = feeMode === 'add' ? toDecimals(+amount + currentFee, digits) : toDecimals(+amount, digits);
		setWithdrawAmount(wAmount);
	}, [feeMode, currentFee, digits]);

	useEffect(() => {
		setMaxAmount(getMaxAmount());
	}, [digits, getMaxAmount]);

	useEffect(() => {
		if (fees.length) {
			setMaxAmount(getMaxAmount());
			setCurrentFee(fees.find((item) => item.currencyIso === account.currencyIsoCode)?.fee);
		}
	}, [fees, account, getMaxAmount]);

	useEffect(() => {
		const maxUserCurrencyAmount =
			account.balance && rate
				? toDecimals(+((account.balance - (checkExists ? 0 : currentFee)) * currencyRate.value), 2)
				: 0;
		setMaxUserCurrencyAmount(maxUserCurrencyAmount);
	}, [account, currencyRate, currentFee, checkExists, rate]);

	const clearErrors = useCallback(() => {
		setShowError({
			amountError: false,
			balanceError: false,
			addressError: false,
			addressPatternError: false,
			fieldPatternError: false,
		});

		if (withdrawToWalletSuccess || transferByPhoneSuccess) {
			dispatch(withdrawReset());
		}
	}, [dispatch, withdrawToWalletSuccess, transferByPhoneSuccess]);

	const validateWallet = (wallet = walletAddress) => {
		const { currency } = account.account;
		const pattern = walletMasks.find(({ currencyId }) => currencyId === currency)?.pattern;
		clearErrors();
		if (currency === 2001) {
			if (WAValidator.validate(wallet, 'BTC')) {
				dispatch(fetchIsJCAccount(wallet));
				return true;
			} else {
				setShowError({ ...showError, addressPatternError: true });
				return false;
			}
		} else {
			if (pattern) {
				if (pattern.test(wallet)) {
					dispatch(fetchIsJCAccount(wallet));
					return true;
				} else {
					setShowError({ ...showError, addressPatternError: true });
					return false;
				}
			} else {
				dispatch(fetchIsJCAccount(wallet));
				return true;
			}
		}
	};

	const validateField = (e, val) => {
		let pattern = fields.find((field) => field.validExpression)?.validExpression;
		if (pattern) {
			pattern = new RegExp(pattern);
			if (pattern.test(e?.target?.value || val)) {
				return true;
			} else {
				setShowError({ ...showError, fieldPatternError: true });
				return false;
			}
		}
		return true;
	};

	const checkBalanceAndAmount = () => account.balance >= parseFloat(amount);

	const formatEto0s = (val) => {
		if (val.toString().indexOf('e') !== -1) {
			const str = val.toString().split('e-');
			return (
				'0.' +
				Math.pow(10, parseInt(str[1], 10) - 1)
					.toString()
					.slice(1) +
				parseInt(str[0], 10)
			);
		}
		return val;
	};

	const onMaxButtonClick = (e) => {
		e.preventDefault();
		const max = getMaxAmount();
		setAmount(max);
		currencyRate?.value && setUserCurrencyAmount(toDecimals(+(max * currencyRate.value), 2));
		let withdrawAmount = max ? max + (checkExists ? 0 : currentFee) : 0;
		withdrawAmount = toDecimals(withdrawAmount, digits);
		withdrawAmount = formatEto0s(withdrawAmount);
		setWithdrawAmount(withdrawAmount);
	};

	const handleCurrencyAmountTyping = (e) => {
		clearErrors();
		validateAmount(e);
		setUserCurrencyAmount(e.target.value);
		const value = +e.target.value;
		const maxAmount = +maxUserCurrencyAmount;
		if (value > maxAmount) {
			return onMaxButtonClick(e);
		}
		const amount = value
			? currencyRate.value
				? value === maxAmount
					? account.balance
					: toDecimals(value / currencyRate.value, digits)
				: ''
			: '';
		setAmount(amount);
		let withdrawAmount = amount ? +amount + currentFee : 0;
		withdrawAmount = toDecimals(withdrawAmount, digits);
		withdrawAmount = formatEto0s(withdrawAmount);
		setWithdrawAmount(withdrawAmount);
	};

	const handleAmountTyping = (e) => {
		clearErrors();
		validateAmount(e);
		const value = e.target.value;
		setAmount(value);
		const max = getMaxAmount();
		if (value > max) {
			return onMaxButtonClick(e);
		}
		calcWithdrawAmount(+value);
	};

	const calcWithdrawAmount = (cryptoAmount) => {
		let withdrawAmount = cryptoAmount ? cryptoAmount + (checkExists ? 0 : currentFee) : 0;
		withdrawAmount = toDecimals(withdrawAmount, digits);
		withdrawAmount = formatEto0s(withdrawAmount);
		setWithdrawAmount(withdrawAmount);
		const userCurrAmount = cryptoAmount
			? currencyRate.value
				? toDecimals(cryptoAmount * currencyRate.value, 2)
				: ''
			: '';
		setUserCurrencyAmount(userCurrAmount);
	};

	const toggleCamera = () => {
		setShowCamera((prev) => !prev);
	};

	const closeCamera = (e) => {
		e.stopPropagation();
		if (e.target.classList.contains('__closeArea')) {
			toggleCamera();
		}
	};

	const handleScan = (data) => {
		if (!!data) {
			toggleCamera();
			setWalletAddress(data);
			validateWallet(data);
		}
	};

	const handleError = (err) => {
		setShowCameraErr(true);
		setTimeout(() => {
			toggleCamera();
			setShowCameraErr(false);
		}, 3000);
	};

	const withdrawToWallet = (e) => {
		e.preventDefault();
		const { currency } = account.account;

		if (walletAddress === '') {
			setShowError({ addressError: true });
		}

		if (!validateWallet()) {
			setShowError({ addressPatternError: true });
			return;
		}

		if (fields.length && fields.find((field) => field.validExpression)) {
			if (fieldsRef.current.some((el) => !el.value || !validateField(null, el.value))) {
				setShowError({ ...showError, fieldPatternError: true });
				return;
			}
		}

		if (!amount) {
			setShowError({ amountError: true });
			return;
		}

		if (!checkBalanceAndAmount()) {
			return setShowError({ balanceError: true });
		}

		if (walletAddress && amount && checkBalanceAndAmount()) {
			let operatorId = null;
			let operatorFinded = operators.find((op) => op.currencyId === currency);
			let _params = ``;
			if (operatorFinded) {
				operatorId = operatorFinded.id;
				_params = `{"address":"${walletAddress}"`;
				if (operatorFinded.fields.length) {
					operatorFinded.fields.forEach((item) => {
						_params += `,"${item.parameterName}":"${
							fieldsRef.current.find((input) => input.id === item.parameterName)?.value
						}"`;
					});
				}
				_params += `}`;
			} else {
				_params = `{"address":"${walletAddress}"}`;
			}
			const query = {
				OperatorId: operatorId,
				Params: _params,
				CurrencyId: currency,
				Amount: +withdrawAmount,
				moneySource: 2,
				moneySourceId: account.accountId,
			};
			setWithdrawQuery(query);
			dispatch(fetchWithdrawToWallet(query));
		}
	};

	const handleWithdrawToWalletCommit = () => {
		if (confCode) {
			const q = { ...withdrawQuery, verificationCode: confCode, verificationType: withdrawToWalletVerificationType };
			dispatch(fetchWithdrawToWallet(q));
			setConfCode('');
		}
	};

	const resetVerificationError = () => {
		hideServerError();
		hideWrongCodePopup();
	};

	const handleChooseWalletWithdraw = (e) => {
		e.preventDefault();
		dispatch(resetIsJCAccountErrors());
		clearErrors();
		setWithdrawTo('wallet');
		setPhone('+1');
	};

	const handleChoosePhoneWithdraw = (e) => {
		e.preventDefault();
		dispatch(resetIsJCAccountErrors());
		clearErrors();
		setWithdrawTo('phone');
		setWalletAddress('');
	};

	const handlePhoneInput = (e) => {
		const value = e.target.value.replace(/[^\d\s\-()]/gi, '');
		const valueToSend = value.replace(/\D/gi, '');
		setPhone('+' + value);
		setPhoneValidated(valueToSend.length >= 9);
	};

	const checkIfJCAccount = () => {
		const userPhone = phone.replace(/\+/, '');
		if (userPhone && userPhone.length > 8) {
			dispatch(fetchIsJCAccount('', userPhone));
		}
	};

	const handleTransferByPhone = (e) => {
		const { currency } = account.account;
		e.preventDefault();
		const userPhone = phone.replace(/\+/, '');
		if (userPhone && withdrawAmount) {
			dispatch(fetchTransferByPhone(userPhone, currency, withdrawAmount));
			setWithdrawQuery({ userPhone, currencyId: currency, amount: withdrawAmount });
		}
	};

	const handleTransferByPhoneCommit = (e) => {
		e.preventDefault();
		const { userPhone, currencyId, amount } = withdrawQuery;
		if (confCode) {
			dispatch(fetchTransferByPhone(userPhone, currencyId, amount, confCode, transferByPhoneVerificationType));
			setConfCode('');
		}
	};

	const handleAddressChange = (e) => {
		clearErrors();
		setWalletAddress(e.target.value);
	};

	const closeTransferFailedModal = () => {
		dispatch(hideResultIsFailurePopup());
		closeWithdrawModal();
	};

	const closeTransferSuccessModal = () => {
		dispatch(hideResultIsSuccessPopup());
		closeWithdrawModal();
	};

	const handleToggleFeeClick = (e) => {
		e.preventDefault();
		setFeeMode(e.target.name);
	};

	const cryptoCurrencyName = account?.currencyIsoCode;
	const currencyName = userCurrency?.isoName;
	const rate = currencyRate?.value;
	const phoneCns = cn('phone-input', {
		'phone-input--valid': checkExists === true,
		unvalidated: checkExists === false,
	});

	const isTooManyAttemptsError = errors?.length && errors[0].code === 4 ? errors[0].value : '';
	const errorMessage = errors?.length && !errors[0].code ? errors[0].value : '';
	const recipientAmount = feeMode
		? feeMode === 'add'
			? toDecimals(+amount, digits)
			: toDecimals(+amount - currentFee, digits)
		: amount;
	const addFeeBtnStyle =
		checkExists === false && feeMode === 'add'
			? { color: 'rgba(27, 205, 24, 1)', background: 'rgba(27, 205, 24, 0.15' }
			: { color: 'rgba(27, 205, 24, 0.4)' };
	const substractFeeBtnStyle =
		checkExists === false && feeMode === 'substract'
			? { color: 'rgba(228, 86, 68, 0.8)', background: 'rgba(228, 86, 68, 0.1)' }
			: { color: 'rgba(228, 86, 68, 0.3)' };
	const notEnoughBalanceForWithdrawal = account.balance <= currentFee;

	return (
		<div className="wallet-transfer-container">
			<h3 className="wallet-transfer-container__subtitle">
				{account.account.currency !== 2019 && account.account.currency !== 2018 ? (
					<img
						className="wallet-transfer-container__currency-image"
						style={{ width: '32px', height: '32px' }}
						src={'img/crypto-icons/_' + account.account.currency + '.svg'}
						alt={account.name}
					/>
				) : (
					<img
						className="wallet-transfer-container__currency-image"
						style={{ width: '32px', height: '32px' }}
						src={'img/crypto-icons/_' + account.account.currency + '.png'}
						alt={account.name}
					/>
				)}
				<span>{account.name}</span>
			</h3>
			<div style={{ position: 'static' }}>
				{fetching && <Loader />}
				{!showCamera ? (
					<div className={fetching ? ' blur' : ''}>
						<form>
							<div className="form-group">
								<div className="choose-withdraw-type">
									<button
										onClick={handleChooseWalletWithdraw}
										className={'choose-withdraw-type__button ' + (withdrawTo === 'wallet' ? 'active' : '')}
									>
										By wallet address
									</button>
									<button
										onClick={handleChoosePhoneWithdraw}
										className={'choose-withdraw-type__button ' + (withdrawTo === 'phone' ? 'active' : '')}
									>
										By phone number
									</button>
								</div>
								{withdrawTo === 'wallet' && (
									<div className={'qr-scan'}>
										<input
											type="text"
											className={'form-control ' + (showError.addressError ? 'unvalidated' : '')}
											id="wallet"
											ref={walletInput}
											autoComplete={'off'}
											onChange={handleAddressChange}
											onBlur={() => validateWallet()}
											placeholder={activeLanguage.withdraw_wallet}
											value={walletAddress}
											disabled={withdrawToWalletCodeRequest}
										/>
										<img src={'/img/_qr_code_ico.jpg'} alt="QR" onClick={toggleCamera} />
									</div>
								)}
								{withdrawTo === 'phone' && (
									<input
										type="text"
										id="phone"
										autoComplete={'off'}
										onChange={clearErrors}
										onInput={handlePhoneInput}
										onBlur={checkIfJCAccount}
										maxLength={21}
										className={phoneCns}
										value={phone}
										disabled={transferByPhoneCodeRequest}
									/>
								)}
							</div>
							{showError.addressError && <p className="field-error">{activeLanguage.withdraw_errors[0]}</p>}
							{showError.addressPatternError && <p className="field-error">{activeLanguage.withdraw_errors[2]}</p>}
							{errorMessage && withdrawTo === 'phone' && (
								<p className="field-error">{activeLanguage.withdraw_to_phone_user_not_found}</p>
							)}
							{isTooManyAttemptsError && (
								<p className="field-error">{activeLanguage.withdraw_to_wallet_too_many_attempts}</p>
							)}

							{fields.length > 0 && (
								<>
									{fields.map((item, i) => (
										<div className="form-group" key={item.parameterName}>
											<label className="form-group__title" htmlFor={item.parameterName}>
												{item.name}
											</label>
											<div className={'qr-scan'}>
												<input
													type="text"
													className={'form-control ' + (showError.fieldPatternError ? 'unvalidated' : '')}
													autoComplete={'off'}
													ref={(el) => (fieldsRef.current[i] = el)}
													id={item.parameterName}
													placeholder={item.name}
													onBlur={validateField}
													onFocus={clearErrors}
												/>
											</div>
										</div>
									))}
									{showError.fieldPatternError && <p className="field-error">{'Invalid input value!'}</p>}
								</>
							)}

							<div className="form-group form-group--amounts">
								<label className="form-group__title" htmlFor="Amount">
									{activeLanguage.withdraw_amount}
								</label>
								<div className="form-group__subgroup">
									<div className="form-group__input-container">
										<label className="form-group__currency-label" htmlFor="Amount">
											{cryptoCurrencyName}
										</label>
										<input
											type="text"
											autoComplete={'off'}
											onChange={handleAmountTyping}
											className={'form-control ' + (showError.amountError ? 'unvalidated' : '')}
											id="Amount"
											value={amount}
										/>
									</div>
									{showError.amountError && <p className="field-error">{activeLanguage.withdraw_errors[1]}</p>}
									{account.balance && (
										<p className="wallet-transfer-container__max-amount-text">
											Max:
											<button className="wallet-transfer-container__max-amount-button" onClick={onMaxButtonClick}>
												{notEnoughBalanceForWithdrawal ? '0' : maxAmount}
											</button>
										</p>
									)}
								</div>
								<div style={{ visibility: rate > 0 ? 'visible' : 'hidden' }} className="form-group__subgroup">
									<div className="form-group__input-container">
										<label className="form-group__currency-label" htmlFor="userCurrencyAmount">
											{currencyName}
										</label>
										<input
											autoComplete={'off'}
											type="text"
											onChange={handleCurrencyAmountTyping}
											className={'currency-input form-control ' + (showError.amountError ? 'unvalidated' : '')}
											id="userCurrencyAmount"
											value={userCurrencyAmount}
										/>
									</div>
									{showError.amountError && <p className="field-error">{activeLanguage.withdraw_errors[1]}</p>}
									{account.balance && (
										<p className="wallet-transfer-container__max-amount-text">
											Max:
											<button className="wallet-transfer-container__max-amount-button" onClick={onMaxButtonClick}>
												{notEnoughBalanceForWithdrawal ? '0' : maxUserCurrencyAmount}
											</button>
										</p>
									)}
								</div>
								{showError.balanceError && !showError.amountError && (
									<p className="field-error">{activeLanguage.withdraw_errors[3]}</p>
								)}
							</div>

							{!(
								withdrawToWalletCodeRequest ||
								transferByPhoneCodeRequest ||
								withdrawToWalletSuccess ||
								transferByPhoneSuccess
							) && (
								<>
									{withdrawTo === 'wallet' && (
										<>
											<div className={'form-group wallet-transfer-container__fees'}>
												{notEnoughBalanceForWithdrawal && (
													<p className="wallet-transfer-container__fee-text" style={{ color: 'red' }}>
														{`Not enough account balance for withdrawal!`}
													</p>
												)}
												<p className="wallet-transfer-container__fee-text">
													{`Network fee: ${checkExists ? 0.0 : currentFee} ${cryptoCurrencyName}`}
												</p>
												<p className="wallet-transfer-container__fee-text">{`Withdrawal amount: ${withdrawAmount} ${cryptoCurrencyName}`}</p>
												<p className="wallet-transfer-container__fee-text">{`Recipient will get: ${recipientAmount} ${cryptoCurrencyName}`}</p>
												<div className="wallet-transfer-container__fee-togglers">
													<button
														name={'add'}
														disabled={checkExists === null || checkExists}
														onClick={handleToggleFeeClick}
														className="wallet-transfer-container__fee-toggler"
														style={addFeeBtnStyle}
													>
														ADD FEE
													</button>
													<span></span>
													<button
														name={'substract'}
														disabled={checkExists === null || checkExists}
														onClick={handleToggleFeeClick}
														className="wallet-transfer-container__fee-toggler"
														style={substractFeeBtnStyle}
													>
														SUBSTRACT FEE
													</button>
												</div>
												<p className="wallet-transfer-container__fee-text wallet-transfer-container__fee-text--prime">
													* There are no fees for transfers within JetCrypto
												</p>
											</div>

											<button
												onClick={withdrawToWallet}
												className={
													'btn btn-primary account-transfer-button account-fill-button account-wallet__btn account-wallet__btn--modal ' +
													(!amount || isTooManyAttemptsError ? 'disabled' : '')
												}
												disabled={!amount || isTooManyAttemptsError}
											>
												{activeLanguage.withdraw_to_wallet}
											</button>
										</>
									)}

									{withdrawTo === 'phone' && (
										<button
											onClick={handleTransferByPhone}
											className={
												'btn btn-primary account-transfer-button account-fill-button account-wallet__btn account-wallet__btn--modal ' +
												(!checkExists || !amount || isTooManyAttemptsError ? 'disabled' : '')
											}
											disabled={!checkExists || !amount || isTooManyAttemptsError}
										>
											Transfer to JetCrypto user
										</button>
									)}
								</>
							)}
						</form>

						{(withdrawToWalletCodeRequest || transferByPhoneCodeRequest) && (
							<div style={{ position: 'relative' }}>
								<div className={'form-group__subgroup'}>
									<div className={'form-group__input-container'}>
										<label className="form-group__currency-label" htmlFor="withdrawConfirmationCode">
											Enter confirmation code from
											{withdrawTo === 'wallet'
												? withdrawToWalletVerificationType === 1
													? ' "Google Authenticator":'
													: withdrawToWalletVerificationType === 2
													? ' Email:'
													: withdrawToWalletVerificationType === 3
													? ' SMS:'
													: ''
												: transferByPhoneVerificationType === 1
												? ' "Google Authenticator":'
												: transferByPhoneVerificationType === 2
												? ' Email:'
												: transferByPhoneVerificationType === 3
												? ' SMS:'
												: ''}
										</label>
										<input
											type="text"
											autoComplete={'off'}
											onFocus={resetVerificationError}
											className={'form-control ' + (showVerificationCodeErrorMsg ? 'unvalidated' : '')}
											id="withdrawConfirmationCode"
											onChange={(e) => setConfCode(e.target.value)}
											value={confCode}
										/>
										{showVerificationCodeErrorMsg ? (
											<p className="modal-fullscreen__input-error-text">Wrong verification code!</p>
										) : (
											''
										)}
										{showServerErrorMsg ? (
											<p className="modal-fullscreen__input-error-text">
												The web server reported a gateway time-out error. Please try again in a few minutes.
											</p>
										) : (
											''
										)}
									</div>

									<div className={'form-group'}>
										<button
											onClick={withdrawTo === 'wallet' ? handleWithdrawToWalletCommit : handleTransferByPhoneCommit}
											onSubmit={() => window.alert('oi')}
											className="btn btn-primary account-transfer-button account-fill-button account-wallet__btn account-wallet__btn--modal"
										>
											Confirm withdraw
										</button>
									</div>
								</div>
							</div>
						)}

						{(withdrawToWalletFailed || transferByPhoneFailed) && (
							<TransferResult
								isSuccess={false}
								message={activeLanguage.withdraw_to_wallet_failed_text}
								cb={closeTransferFailedModal}
							/>
						)}

						{(withdrawToWalletSuccess || transferByPhoneSuccess) && (
							<TransferResult
								isSuccess={true}
								message={activeLanguage.withdraw_to_wallet_complete_text}
								cb={closeTransferSuccessModal}
							/>
						)}
					</div>
				) : (
					<div className="withdraw-camera __closeArea" onClick={closeCamera}>
						<div className={'withdraw-camera-container'}>
							{showCamera && !showCameraErr && (
								<div>
									<div className={'withdraw-camera-title'}>Scan your QR-code</div>
									<QrReader
										delay={300}
										onError={handleError}
										onScan={handleScan}
										showViewFinder={false}
										style={{ width: '100%' }}
									/>
									<div className="withdraw-camera-container-controls">
										<button className="btn btn-warning btn-small __closeArea" onClick={closeCamera}>
											Cancel
										</button>
									</div>
								</div>
							)}
							<p className={'withdraw-camera-result'}>{(phone, phoneValidated)}</p>
						</div>
					</div>
				)}

				{showCameraErr && (
					<div>
						<p style={{ textAlign: 'center' }}>
							<img src="/img/camera_off.png" alt="camera is off" />
						</p>
						<h5>Can't find camera</h5>
					</div>
				)}
			</div>
		</div>
	);
};
