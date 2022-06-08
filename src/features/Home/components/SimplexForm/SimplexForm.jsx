import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuote, fetchPayment, fetchGetFiatPairCurrencyRate, paymentResultReset } from './simplexSlice';
import { Loader } from 'core/components/Loader';
import { TransferResult } from '../TransferResult';

import createFiatCodesDictionary from 'utils/createFiatCodesDictionary';
import validateAmount from 'utils/validateAmount';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const SimplexForm = ({ account, currencyCodes, closeForm, userCurrency, supportedFiat }) => {
	const [dropdown, setDropdownWidth] = useState({ dropdownWidth: null });
	const [form, setFormSize] = useState({ formSize: null });

	const [fiatCodes, setFiatCodes] = useState({ codes: [] });
	const [currentFiat, selectFiat] = useState({ userCurrency });
	const [minMaxFiatAmounts, setMinAndMaxFiatAmounts] = useState({ minFiatAmount: 0, maxFiatAmount: 0 });

	const [fiatAmount, setFiatAmount] = useState(0);
	const [cryptoAmount, setCryptoAmount] = useState(0);
	const [fiatAmountIsChanged, setFiatIsChanged] = useState(null);
	const [needQuote, setNeedQuote] = useState(false);
	const [fiatCurrencyIsChanged, setFiatCurrencyChange] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [inputHoldbackTimer, setInputHoldbackTimer] = useState({ timerId: null });
	const [quoteValidSeconds, setQuoteValidSeconds] = useState(null);

	const [validation, setValidation] = useState({ isValid: true, msg: '' });

	const {
		cryptoMoney,
		fiatMoney,
		minAmountInUSD,
		maxAmountInUSD,
		quoteId,
		paymentId,
		success,
		validUntil,
		fiatRatePair,
		fetching,
		fetchingPayment,
		errors,
	} = useSelector((state) => state.simplex);
	const { languages, activeLanguage: currLanguage } = useSelector((state) => state.language);
	const dispatch = useDispatch();

	const fiatRatePairValue = fiatRatePair?.value;
	const activeLanguage = languages[currLanguage];
	const { timerId } = inputHoldbackTimer;
	const { minFiatAmount, maxFiatAmount } = minMaxFiatAmounts;
	const btnIsDisabled = validation.isValid && quoteValidSeconds > 0 && !success ? '' : 'disabled';
	const api_url =
		window.location.hostname.includes('beta') || window.location.hostname.includes('localhost')
			? 'https://sandbox.test-simplexcc.com/payments/new'
			: 'https://checkout.simplexcc.com/payments/new';

	//as component unmounts
	useEffect(() => {
		return () => {
			setFiatAmount(0);
			setCryptoAmount(0);
		};
	}, []);

	// as componentDidMount()
	useEffect(() => {
		if (supportedFiat?.length && currencyCodes?.length) {
			const codes = createFiatCodesDictionary(supportedFiat, currencyCodes);
			setFiatCodes({ codes });
		}
	}, [currencyCodes, supportedFiat]);

	// as componentDidUpdate() from quoteId props when a new Quote is received
	useEffect(() => {
		if (validUntil) {
			const now = Date.parse(new Date().toISOString());
			//this is stupid " GMT" hack, because of invalid response field date string
			const until = Date.parse(new Date(validUntil + ' GMT').toISOString());
			const seconds = Math.round((until - now) / 1000);
			setQuoteValidSeconds(seconds);

			if (fiatAmountIsChanged === null) {
				//set min amount to fiat input and corresponding crypto amount
				setFiatAmount(+fiatMoney.total_amount);
				setCryptoAmount(+cryptoMoney.amount);
			} else if (fiatAmountIsChanged) {
				//validate current fiat amount && then send quote after changing fiat input
				setCryptoAmount(+cryptoMoney.amount);
				setFiatIsChanged(true);
				setNeedQuote(true);
			} else if (fiatCurrencyIsChanged) {
				//validate fiat amount after change to different fiat currency
				//invalidate latter validation messages
				setFiatAmount(+fiatMoney.total_amount);
				setCryptoAmount(+cryptoMoney.amount);
				setMinAndMaxFiatAmounts({
					minFiatAmount: Math.ceil(fiatRatePairValue * minAmountInUSD),
					maxFiatAmount: Math.ceil(fiatRatePairValue * maxAmountInUSD),
				});
				setFiatIsChanged(true);
				setNeedQuote(false);
				setFiatCurrencyChange(false);
			} else {
				//validate received fiat amount after changing input in crypto
				setFiatAmount(+fiatMoney.total_amount);
				setFiatIsChanged(true);
				setNeedQuote(false);
			}
		}
	}, [quoteId, validUntil]);

	//quote counter logic
	useEffect(() => {
		let quoteInterval;
		if (validUntil) {
			quoteInterval = setInterval(() => setQuoteValidSeconds((quoteValidSeconds) => quoteValidSeconds - 1), 1000);
		}
		if (quoteValidSeconds === 0) {
			clearInterval(quoteInterval);
		}
		return () => {
			clearInterval(quoteInterval);
		};
	}, [validUntil, quoteValidSeconds]);

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

	// as componentDidUpdate() from fiatAmountIsChanged props
	useEffect(() => {
		validateFiatAmount(fiatAmount);
	}, [fiatAmount, validateFiatAmount]);

	//set min and max amounts
	useEffect(() => {
		setMinAndMaxFiatAmounts({
			minFiatAmount: Math.ceil(fiatRatePairValue * minAmountInUSD),
			maxFiatAmount: Math.ceil(fiatRatePairValue * maxAmountInUSD),
		});
	}, [fiatRatePair]);

	useEffect(() => {
		//when change fiat input from keyboard and it's valid - send request to get crypto quote
		if (validation.isValid && needQuote) {
			const cryptoQuote = setTimeout(
				() => dispatch(fetchQuote(account.id, currentFiat.userCurrency.id, true, fiatAmount)),
				700
			);
			setInputHoldbackTimer({ timerId: cryptoQuote });
		}
	}, [validation.isValid, account.id, currentFiat.userCurrency.id, fiatAmount, fetchQuote, needQuote]);

	// as componentDidUpdate() from currentFiat props after different fiat currency has been selected
	useEffect(() => {
		dispatch(fetchGetFiatPairCurrencyRate(840, currentFiat.userCurrency.id));
	}, [currentFiat.userCurrency.id, fetchGetFiatPairCurrencyRate]);

	// as componentDidUpdate() from fiatRatePairValue props after different fiat currency has been selected
	useEffect(() => {
		if (fiatRatePairValue && fiatAmount) {
			dispatch(
				fetchQuote(account.id, currentFiat.userCurrency.id, true, Math.ceil(fiatRatePairValue * minAmountInUSD))
			);
		}
	}, [fiatRatePairValue]);

	useEffect(() => {
		if (success && paymentId) document.forms['payment_form'].submit();
	}, [success, paymentId]);

	useEffect(() => {
		if (errors && errors.length)
			for (const err of errors) {
				toast.error(err.value, {
					position: 'top-center',
					autoClose: 7000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					draggablePercent: 60,
				});
			}
	}, [errors]);

	const handleChange = (e) => {
		if (timerId) {
			clearTimeout(timerId);
			setInputHoldbackTimer({ timerId: null });
		}
		setValidation({ ...validation, msg: '' });
		if (e.target.name === 'fiatAmount') {
			setFiatAmount(+e.target.value);
			setFiatIsChanged(true);
			setNeedQuote(true);
			validateFiatAmount(+e.target.value);
		} else {
			setCryptoAmount(e.target.value);
			setFiatIsChanged(false);
			const val = e.target.value;
			if (val <= 0) {
				setValidation({ isValid: false, msg: activeLanguage.not_null_err });
			} else {
				const fiatQuote = setTimeout(
					() => dispatch(fetchQuote(account.id, currentFiat.userCurrency.id, false, val)),
					700
				);
				setInputHoldbackTimer({ timerId: fiatQuote });
			}
		}
	};

	const handleFiatSelect = (e) => {
		const val = e.target.innerText;
		selectFiat({ userCurrency: fiatCodes.codes.find((item) => item.isoName === val) });
		setShowDropdown(false);
		setValidation({ isValid: false, msg: '' });
		setFiatIsChanged(false);
		setFiatCurrencyChange(true);
	};

	const dropdownRef = useCallback((node) => {
		if (node !== null) {
			setDropdownWidth({ dropdownWidth: node.getBoundingClientRect().width });
		}
	}, []);

	const formRef = useCallback((node) => {
		if (node !== null) {
			setFormSize({
				formSize: { width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height },
			});
		}
	}, []);

	const handleBuyClick = (e) => {
		e.preventDefault();
		if (btnIsDisabled) return;
		const paymentData = {
			quoteId,
			userAccountId: account.id,
			fiatCurrencyId: currentFiat.userCurrency.id,
			fiatAmount,
			cryptoAmount,
		};
		dispatch(fetchPayment(paymentData));
	};

	const handleRefreshClick = (e) => {
		e.preventDefault();
		dispatch(
			fetchQuote(
				account.id,
				currentFiat.userCurrency.id,
				needQuote ? true : false,
				needQuote ? fiatAmount : cryptoAmount
			)
		);
	};

	const closeSimplexModal = () => {
		dispatch(paymentResultReset());
		closeForm();
	};

	if (fetchingPayment || fetching)
		return (
			<div style={form.formSize}>
				<Loader />
			</div>
		);

	if (success === null)
		return (
			<>
				<ToastContainer />
				<form
					id="payment_form"
					ref={formRef}
					action={api_url}
					method="post"
					className="wallet-transfer-buyWithCard-form"
					noValidate
					autoComplete={'off'}
				>
					<div className="wallet-transfer-buyWithCard-form--item">
						<div className="wallet-transfer-buyWithCard-form--item__title">Buy</div>
						<input
							className={fetching || success ? 'blur' : ''}
							type="text"
							name="cryptoAmount"
							onInput={validateAmount}
							onChange={handleChange}
							value={cryptoAmount}
						/>
						<span>{account.currencyIsoCode}</span>
						<p className="field-error">
							{!fetching && !success && validation.isValid && quoteValidSeconds !== null && quoteValidSeconds > 0
								? activeLanguage.seconds_left.replace('{quoteValidSeconds}', quoteValidSeconds)
								: !fetching && validation.isValid && quoteValidSeconds !== null && quoteValidSeconds <= 0
								? activeLanguage.pls_refresh
								: null}
						</p>
					</div>
					<div className="wallet-transfer-buyWithCard-form--item">
						<div className="wallet-transfer-buyWithCard-form--item__title">Withdraw</div>
						<input
							className={fetching || success ? 'blur' : ''}
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
							{supportedFiat
								.filter((name) => currentFiat.userCurrency.isoName !== name)
								.map((name) => (
									<li onClick={handleFiatSelect} key={name}>
										{name}
									</li>
								))}
						</ul>
						<p className="field-error">{validation.msg}</p>
					</div>

					<div className="btn-wrapper">
						<button onClick={closeForm} className={'btn btn-orange btn-cancel' + (success ? ' disabled' : '')}>
							Cancel
						</button>
						{((quoteValidSeconds !== null && quoteValidSeconds > 0 && validation.isValid) || !validation.isValid) && (
							<button onClick={handleBuyClick} className={`btn btn-primary ${btnIsDisabled}`}>
								{activeLanguage.buy_txt}
							</button>
						)}
						{quoteValidSeconds !== null && quoteValidSeconds <= 0 && validation.isValid && (
							<button onClick={handleRefreshClick} className={`btn btn-primary`}>
								{activeLanguage.refresh_txt}
							</button>
						)}
					</div>

					<input type="hidden" name="version" value="1" />
					<input type="hidden" name="partner" value="jetcrypto" />
					<input type="hidden" name="payment_flow_type" value="wallet" />
					<input
						type="hidden"
						name="return_url_success"
						value={`https://${window.location.hostname}/simplex/success`}
					/>
					<input type="hidden" name="return_url_fail" value={`https://${window.location.hostname}/simplex/failed`} />
					<input type="hidden" name="quote_id" value={quoteId || ''} />
					<input type="hidden" name="payment_id" value={paymentId || ''} />
					<input type="hidden" name="user_id" value={account.userId} />
					<input type="hidden" name="destination_wallet[address]" value={account.cryptoAddress} />
					<input type="hidden" name="destination_wallet[currency]" value={account.currencyIsoCode} />
					<input type="hidden" name="fiat_total_amount[amount]" value={fiatAmount} />
					<input type="hidden" name="fiat_total_amount[currency]" value={currentFiat.userCurrency.isoName} />
					<input type="hidden" name="digital_total_amount[amount]" value={cryptoAmount} />
					<input type="hidden" name="digital_total_amount[currency]" value={account.currencyIsoCode} />
				</form>
			</>
		);

	if (success)
		return <TransferResult isSuccess={true} message={activeLanguage.purchase_complete} cb={closeSimplexModal} />;

	if (success === false)
		return <TransferResult isSuccess={false} message={activeLanguage.purchase_failed} cb={closeSimplexModal} />;
};
