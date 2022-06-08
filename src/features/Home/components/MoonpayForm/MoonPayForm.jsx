import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchAuthenticate,
	fetchAuthenticateConfirm,
	fetchGetLimits,
	fetchGetInfo,
	fetchGetRateForCurrency,
	fetchVerifyPhone,
	fetchVerifyPhoneConfirm,
	fetchMakePayment,
	fetchGetPayment,
	setFiatCurrency,
} from './moonpayFormSlice';

import createFiatCodesDictionary from 'utils/createFiatCodesDictionary';
import validateAmount from 'utils/validateAmount';
import { Loader } from 'core/components/Loader';

export const MoonPayForm = ({ account, activeLanguage, closeForm, currencyCodes, userCurrencyObj }) => {
	const [form, setFormSize] = useState({ formSize: null });
	const [auth, setAuthSize] = useState({ authSize: null });
	const [dropdown, setDropdownWidth] = useState({ dropdownWidth: null });
	const [showDropdown, setShowDropdown] = useState(false);

	const [fiatCodes, setFiatCodes] = useState({ codes: [] });
	const [currentFiat, selectFiat] = useState({ userCurrency: userCurrencyObj });
	const [minMaxFiatAmounts, setMinAndMaxFiatAmounts] = useState({
		minFiatAmount: 20,
		maxFiatAmount: 20000,
	});

	const [code, setCode] = useState('');
	const [fiatAmount, setFiatAmount] = useState(0);
	const [cryptoAmount, setCryptoAmount] = useState(0);
	const [fiatAmountIsChanged, setFiatAmountIsChanged] = useState(false);
	const [fiatCurrencyIsChanged, setFiatCurrencyChange] = useState(false);
	const [inputHoldbackTimer, setInputHoldbackTimer] = useState({ timerId: null });

	const [validation, setValidation] = useState({ isValid: true, msg: '' });

	//CREDIT CARD
	const [cardNumber, setCardNumber] = useState('');
	const [expiryDate, setExpiryDate] = useState('');
	const [cvc, setCvc] = useState('');

	const {
		fetching,
		fetchingPayment,
		errors,
		isMoonPayUser,
		supported_fiat_currencies,
		limits,
		verificationLevels,
		isPhoneNumberVerified,
		fiatCurrencyISOName,
		isAuthenticated,
		rate,
		getInfo,
		paymentId,
		paymentSuccess,
		minAmountInUSD,
		maxAmountInUSD,
	} = useSelector((state) => state.moonpay);

	const dispatch = useDispatch();

	const { minFiatAmount, maxFiatAmount } = minMaxFiatAmounts;
	const btnIsDisabled = validation.isValid && rate && !paymentSuccess ? '' : 'disabled';
	const loaderSize = auth.authSize || form.formSize;
	const { timerId } = inputHoldbackTimer;
	const isSessionExpired = errors.length && errors[0].code === 2;

	useEffect(() => {
		dispatch(fetchGetInfo());
	}, []);

	useEffect(() => {
		dispatch(setFiatCurrency(userCurrencyObj.isoName));
	}, [userCurrencyObj.isoName]);

	useEffect(() => {
		if (!isAuthenticated && isSessionExpired) {
			dispatch(fetchAuthenticate());
		}
		if (isAuthenticated) {
			dispatch(fetchGetInfo());
			dispatch(fetchGetLimits());
		}
	}, [isAuthenticated, isSessionExpired]);

	// useEffect(() => {
	// 	if (isPhoneNumberVerified === false) {
	// 		dispatch(fetchVerifyPhone());
	// 	}
	// }, [isPhoneNumberVerified]);

	useEffect(() => {
		if (supported_fiat_currencies.length && currencyCodes.length) {
			const codes = createFiatCodesDictionary(supported_fiat_currencies, currencyCodes);
			setFiatCodes({ codes });
		}
	}, [currencyCodes, supported_fiat_currencies]);

	useEffect(() => {
		if (fiatAmount && fiatAmountIsChanged && validation.isValid) {
			const cryptoRate = setTimeout(() => dispatch(fetchGetRateForCurrency(account.currencyIsoCode)), 700);
			setInputHoldbackTimer({ timerId: cryptoRate });
		}
	}, [fiatAmount, fiatAmountIsChanged, validation.isValid, account.currencyIsoCode]);

	useEffect(() => {
		if (fiatAmountIsChanged) {
			const amount = (isFinite(fiatAmount / rate) ? fiatAmount / rate : 0).toFixed(8);
			const fxAmount = amount.length > 8 ? amount : fiatAmount / rate || 0;
			setCryptoAmount(+fxAmount);
		}
		if (!fiatAmountIsChanged) {
			const amount = (cryptoAmount * rate).toFixed(2);
			validateFiatAmount(amount);
			setFiatAmount(amount);
		}
	}, [rate, fiatAmount, cryptoAmount]);

	const formRef = useCallback((node) => {
		if (node !== null) {
			setFormSize({
				formSize: {
					width: node.getBoundingClientRect().width + 'px',
					height: node.getBoundingClientRect().height + 'px',
				},
			});
		}
	}, []);

	const authRef = useCallback((node) => {
		if (node !== null) {
			setAuthSize({
				authSize: {
					width: node.getBoundingClientRect().width + 'px',
					height: node.getBoundingClientRect().height + 'px',
				},
			});
		}
	}, []);

	const dropdownRef = useCallback((node) => {
		if (node !== null) {
			setDropdownWidth({ dropdownWidth: node.getBoundingClientRect().width });
		}
	}, []);

	const handleCodeChange = (e) => {
		setCode(e.target.value);
	};

	const handleCodeSubmit = (e) => {
		e.preventDefault();
		dispatch(fetchAuthenticateConfirm(code));
		setCode('');
	};

	const handleVerifyPhoneSubmit = (e) => {
		e.preventDefault();
		dispatch(fetchVerifyPhoneConfirm(code));
		setCode('');
	};

	const validateFiatAmount = useCallback(
		(val) => {
			if (typeof val !== 'undefined') {
				const msg =
					val < minFiatAmount
						? `${activeLanguage.min_amount_err[0]} ${minAmountInUSD} USD` +
						  (currentFiat.userCurrency.id !== 840
								? ` ${activeLanguage.min_amount_err[1]} ${minFiatAmount} ${currentFiat.userCurrency.isoName}`
								: '')
						: val > maxFiatAmount
						? `${activeLanguage.max_amount_err[0]} ${maxAmountInUSD} USD` +
						  (currentFiat.userCurrency.id !== 840
								? ` ${activeLanguage.max_amount_err[0]} ${maxFiatAmount} ${currentFiat.userCurrency.isoName}`
								: '')
						: '';
				const isValid = !(val < minFiatAmount || val > maxFiatAmount);
				setValidation({ isValid, msg });
			}
		},
		[fiatAmount]
	);

	const handleFiatSelect = (e) => {
		const val = e.target.innerText;
		selectFiat({ userCurrency: fiatCodes.codes.find((item) => item.isoName === val) });
		dispatch(setFiatCurrency(val));

		setShowDropdown(false);
		setValidation({ isValid: false, msg: '' });
		setFiatAmountIsChanged(false);
		setFiatCurrencyChange(true);
	};

	const handleChange = (e) => {
		if (timerId) {
			clearTimeout(timerId);
			setInputHoldbackTimer({ timerId: null });
		}
		setValidation({ ...validation, msg: '' });
		switch (e.target.name) {
			case 'fiatAmount': {
				setFiatAmount(e.target.value);
				validateFiatAmount(+e.target.value);
				setFiatAmountIsChanged(true);
				break;
			}
			case 'cryptoAmount': {
				setCryptoAmount(e.target.value);
				setFiatAmountIsChanged(false);
				if (e.target.value <= 0) {
					setValidation({ isValid: false, msg: activeLanguage.not_null_err });
				} else {
					const fiatQuote = setTimeout(() => dispatch(fetchGetRateForCurrency(account.currencyIsoCode)), 700);
					setInputHoldbackTimer({ timerId: fiatQuote });
				}
				break;
			}
			case 'expiryDate': {
				let val = e.target.value.replace(/[^/|^\d\s]/gi, '');
				expiryDate.length < val.length && val.length === 2 && (val = val + ' / ');
				val.length === 8 && (val = val.slice(0, -1));
				setExpiryDate(val);
				break;
			}
			case 'cvc': {
				let val = e.target.value.replace(/[^\d]/gi, '');
				val.length === 4 && (val = val.slice(0, -1));
				setCvc(val);
				break;
			}
			default: {
				let val = e.target.value.replace(/[^\d\s]/gi, '');
				cardNumber.length < val.length && /4|9|14|19/.test(val.length) && (val = val + ' ');
				val.length === 25 && (val = val.slice(0, 24));
				setCardNumber(val);
			}
		}
	};

	const validateCardNumber = () => cardNumber.length > 15 && cardNumber.length < 21;
	const validateExpiryDate = () => expiryDate.length === 5;
	const validateCVC = () => cvc.length === 3;

	if (fetching && isMoonPayUser) {
		return (
			<div style={loaderSize}>
				<Loader />
			</div>
		);
	}

	const PaymentForm = (
		<form
			id="moonpay_form"
			ref={formRef}
			className="wallet-transfer-buyWithCard-form"
			noValidate
			autoComplete={'off'}
			onSubmit={(e) => e.preventDefault()}
		>
			<div className="wallet-transfer-buyWithCard-form--item">
				<div className="wallet-transfer-buyWithCard-form--item__title">Buy</div>
				<input
					className={fetching || fetchingPayment || paymentSuccess ? 'blur' : ''}
					type="text"
					name="cryptoAmount"
					onInput={validateAmount}
					onChange={handleChange}
					value={cryptoAmount}
				/>
				<span>{account.currencyIsoCode}</span>
			</div>
			<div className="wallet-transfer-buyWithCard-form--item">
				<div className="wallet-transfer-buyWithCard-form--item__title">Withdraw</div>
				<input
					className={fetching || fetchingPayment || paymentSuccess ? 'blur' : ''}
					type="text"
					name="fiatAmount"
					onChange={handleChange}
					onInput={validateAmount}
					value={fiatAmount}
				/>
				<span ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)} className="fiat">
					{currentFiat.userCurrency.isoName}
				</span>
				<ul
					style={{ display: showDropdown ? 'block' : 'none', width: dropdown.dropdownWidth + 'px' }}
					className="wallet-transfer-buyWithCard-form--item__optionList"
				>
					{supported_fiat_currencies
						.filter((name) => currentFiat.userCurrency.isoName !== name)
						.map((name) => (
							<li onClick={handleFiatSelect} key={name}>
								{name}
							</li>
						))}
				</ul>
				<p className="field-error">{validation.msg}</p>
			</div>
			<div className="wallet-transfer-buyWithCard-form--sectionTitle">Card Details</div>
			<div className="wallet-transfer-buyWithCard-form--item wallet-transfer-buyWithCard-form--item__cardNumber">
				<div className="wallet-transfer-buyWithCard-form--item__title">Card Number</div>
				<input
					className={fetching || fetchingPayment || paymentSuccess ? 'blur' : ''}
					type="text"
					name="cardNumber"
					onBlur={validateCardNumber}
					onChange={handleChange}
					value={cardNumber}
				/>
			</div>
			<div className="wallet-transfer-buyWithCard-form--item wallet-transfer-buyWithCard-form--item__expiryDate">
				<div className="wallet-transfer-buyWithCard-form--item__title">Expiration</div>
				<input
					className={fetching || fetchingPayment || paymentSuccess ? 'blur' : ''}
					type="text"
					name="expiryDate"
					onBlur={validateExpiryDate}
					onChange={handleChange}
					value={expiryDate}
				/>
			</div>
			<div className="wallet-transfer-buyWithCard-form--item wallet-transfer-buyWithCard-form--item__cvc">
				<div className="wallet-transfer-buyWithCard-form--item__title">CVV / CVC</div>
				<input
					className={fetching || fetchingPayment || paymentSuccess ? 'blur' : ''}
					type="text"
					name="cvc"
					onBlur={validateCVC}
					onChange={handleChange}
					value={cvc}
				/>
			</div>
			<div className="btn-wrapper">
				<button onClick={closeForm} className={'btn btn-orange btn-cancel' + (paymentSuccess ? ' disabled' : '')}>
					Cancel
				</button>
				{validation.isValid && (
					<button onClick={() => void 1} className={`btn btn-primary ${btnIsDisabled}`}>
						{activeLanguage.buy_txt}
					</button>
				)}
			</div>
		</form>
	);

	const AuthenticationForm = (
		<form onSubmit={handleCodeSubmit} className="wallet-transfer-buyWithCard-auth" ref={authRef}>
			{fetching ? (
				<div className="wallet-transfer-buyWithCard-auth--title">Authenticating...</div>
			) : (
				isMoonPayUser && (
					<>
						<div className="wallet-transfer-buyWithCard-auth--title">Enter confirmation code from your email</div>
						<div className="wallet-transfer-buyWithCard-auth--code-input">
							<input type="text" name="authCode" onChange={handleCodeChange} value={code} />
						</div>
						<button onClick={handleCodeSubmit} style={{ marginBottom: '6px' }} className={`btn btn-primary`}>
							Send
						</button>
					</>
				)
			)}
			{errors.length > 0 &&
				errors.map((err) => (
					<p key={err.code} className="field-error">
						{err.value}
					</p>
				))}
		</form>
	);

	const verifyPhoneForm = (
		<form onSubmit={handleVerifyPhoneSubmit} className="wallet-transfer-buyWithCard-auth">
			<div className="wallet-transfer-buyWithCard-auth--title">
				{fetching ? 'Fetching...' : 'Enter SMS code to verify your phone number'}
			</div>
			<div className="wallet-transfer-buyWithCard-auth--code-input">
				<input type="text" name="verifyPhoneCode" onChange={handleCodeChange} value={code} />
			</div>
			<button onClick={handleVerifyPhoneSubmit} style={{ marginBottom: '6px' }} className={`btn btn-primary`}>
				Send
			</button>
		</form>
	);

	//return isAuthenticated ? (isPhoneNumberVerified ? PaymentForm : verifyPhoneForm) : AuthenticationForm;
	return isAuthenticated ? PaymentForm : AuthenticationForm;
};
