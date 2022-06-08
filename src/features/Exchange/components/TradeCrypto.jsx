import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _isEmpty from 'lodash/isEmpty';
import { Loader } from 'core/components/Loader';
import createToastMessage from 'utils/createToastMessage';
import { fetchSendOrder } from '../tradingSlice';

function validateAmount(newValue, decimals) {
	switch (newValue) {
		case '':
		case '0':
		case 0:
			return newValue;

		case '00':
			return '0.0';

		case '.':
		case ',':
			return '0.';

		default:
			let result = newValue.replace(/[,.]+/g, '.').replace(/[^0-9.]/, '');
			let dotsAmount = result.match(/\./g);

			if (result.match(/^0+\d/)) result = result.replace(/0+/, '');

			if (dotsAmount) {
				let arr = result.split('.');
				result = arr[0] + '.' + arr[1].slice(0, decimals);
			} else {
				return result;
			}

			return result;
	}
}

export const TradeCrypto = ({
	type,
	accounts,
	updateExchangeData,
	currentTicker,
	tickerInfo,
	marketPrice,
	marketPriceTime,
	amountUpdateTime,
	isTradingBlocked,
	digits,
}) => {
	const dispatch = useDispatch();
	const [price, setPrice] = useState(0);
	const [amount, setAmount] = useState('');
	const [total, setTotal] = useState('');
	const [totalMax, setTotalMax] = useState('');
	const [balance, setBalance] = useState('');
	const [bestBid, setBestBid] = useState('');
	const [bestAsk, setBestAsk] = useState('');
	const [updateIsRequired, setUpdateIsRequired] = useState(false);

	const { marketOrders, fetching, marketOrdersFetching, fetchingTradingPairs } = useSelector((state) => state.trading);
	const { activeLanguage: currentLanguage, errors: errorsLang } = useSelector((state) => state.language);
	const { fetching: fetchingAccounts } = useSelector((state) => state.newAccounts);
	const errors = errorsLang[currentLanguage];
	const priceInput = useRef();
	const amountInput = useRef();
	const totalInput = useRef();
	const dataIsFetching = fetching || marketOrdersFetching || fetchingTradingPairs || fetchingAccounts;

	useEffect(() => {
		if (
			!dataIsFetching &&
			(_isEmpty(currentTicker) ||
				_isEmpty(accounts) ||
				!(currentTicker.currencyFrom || currentTicker.currencyTo) ||
				!type)
		) {
			console.log('Trade crypto error: ');
			if (!type) console.log('- type is empty');
			if (_isEmpty(currentTicker)) console.log('- currentTicker is empty');
			if (_isEmpty(accounts)) console.log('- accounts are empty');
			if (!(currentTicker.currencyFrom || currentTicker.currencyTo))
				console.log('- currentTicker.currencyFromCode or currentTicker.currencyToCode is empty');
			setUpdateIsRequired(false);
		}
	}, [dataIsFetching, currentTicker, accounts, type]);

	useEffect(() => {
		setPrice(marketPrice || tickerInfo?.lastPrice || 0);
	}, [marketPrice, tickerInfo]);

	useEffect(() => {
		const bestBid = marketOrders?.buy && marketOrders.buy[marketOrders.buy.length - 1]?.price;
		const bestAsk = marketOrders?.sell && marketOrders.sell[0]?.price;
		const price = type === 'Buy' ? bestAsk : bestBid;
		const total = amount * price ? +(amount * price).toFixed(digits) : 0;
		setBestBid(bestBid || '');
		setBestAsk(bestAsk || '');
		setPrice(price || 0);
		setTotal(total);
	}, [marketOrders]);

	useEffect(() => {
		if (Object.keys(currentTicker).length && accounts.length) {
			const balanceFrom = currentTicker?.currencyFrom
				? accounts.find((acc) => currentTicker?.currencyFrom === acc.currencyIsoCode)?.balance
				: 0;
			const balanceTo = currentTicker?.currencyTo
				? accounts.find((acc) => currentTicker?.currencyTo === acc.currencyIsoCode)?.balance
				: 0;
			const balance = type === 'Buy' ? balanceTo : balanceFrom;
			setBalance(balance);
			//let nAmount = amount;
			const totalMax = type === 'Buy' ? +balance : balance * (price || 0);
			//let total = nAmount && price ? +(amount * price).toFixed(digits) : 0;
			// if (+total > totalMax) {
			// 	total = totalMax;
			// 	nAmount = price ? +(total / price).toFixed(currentTicker.decimalPlaces) : 0;
			// }
			//setAmount(nAmount);
			//setTotal(total);
			setTotalMax(totalMax);
		}
	}, [currentTicker, accounts, marketPriceTime, type, price]);

	useEffect(() => {
		if (typeof balance !== 'undefined' && balance.toString().indexOf('e') !== -1) {
			const str = balance.toString().split('e-');
			setBalance(
				'0.' +
					Math.pow(10, parseInt(str[1], 10) - 1)
						.toString()
						.slice(1) +
					parseInt(str[0], 10)
			);
		}
	}, [balance]);

	useEffect(() => {
		setTotal(0);
		setAmount(0);
	}, [amountUpdateTime]);

	const handlePriceChange = (e) => {
		let price = validateAmount(e.target.value, digits);

		let total = price * (amount || 0);
		if (total % 1 !== 0) {
			total = total.toFixed(digits);
		}
		setPrice(price);
		setTotal(total);
	};

	const handleAmountChange = (e) => {
		let amount = validateAmount(e.target.value, currentTicker.decimalPlaces);
		let total = (amount || 0) * (price || 0);
		if (total % 1 !== 0) {
			total = total.toFixed(digits);
		}
		if (+total > +totalMax) {
			total = totalMax;
			amount = price ? +(total / price).toFixed(currentTicker.decimalPlaces) : 0;
		}
		setAmount(amount);
		setTotal(total);
	};

	const handleTotalChange = (e) => {
		let total = validateAmount(e.target.value, digits);
		total = +total > +totalMax ? totalMax : total;
		let amount = price ? total / price : 0;
		if (amount % 1 !== 0) amount = amount.toFixed(digits);
		setAmount(amount);
		setTotal(total);
	};

	const getLimits = () => {
		const amount = type === 'Sell' ? balance : price ? +(totalMax / price).toFixed(currentTicker.decimalPlaces) : 0;
		const total = type === 'Sell' ? +(amount * price).toFixed(digits) : totalMax;
		return {
			amount,
			total,
		};
	};

	const onMaxButtonClick = (e) => {
		e.preventDefault();
		const { amount, total } = getLimits();
		setTotal(total);
		setAmount(amount);
	};

	const onSellBuyButtonClick = (e) => {
		e.preventDefault();
		const currencyFrom = currentTicker.currencyFrom;
		const currencyTo = currentTicker.currencyTo;
		if (!amount || !price || !totalMax || !currencyFrom || !currencyTo) return;
		const isSellOrder = type === 'Sell';

		const resObj = {
			currencyFrom: currentTicker.currencyFrom,
			currencyTo: currentTicker.currencyTo,
			amount,
			price,
			isSellOrder,
		};

		dispatch(
			fetchSendOrder(resObj, currentTicker, (succeed) => {
				const errorMessage = errors['trade_crypto'] || '';
				const succedMessage =
					'' +
					(isSellOrder ? 'Sell' : 'Buy') +
					' order ' +
					currencyFrom +
					'/' +
					currencyTo +
					', ' +
					amount +
					' ' +
					currencyFrom +
					' by ' +
					price +
					'\u00A0' +
					currencyTo +
					' successfully\u00A0send';
				const message = succeed ? succedMessage : errorMessage;

				createToastMessage(message, succeed ? 'info' : 'error');
			})
		);

		setAmount(amount);
		setTotal(total);
	};

	const onPriceButtonClick = (e, price) => {
		e.preventDefault();

		if (!price) return;

		const total = amount * price ? +(amount * price).toFixed(digits) : 0;

		setPrice(price);
		setTotal(total);
	};

	const overflowed = +total > +totalMax;
	const disableInputs = !balance;
	const showMaxButton = !disableInputs && price > 0;
	const buttonSendIsDisabled = !price || !amount || !totalMax || overflowed;
	const labelClassName = 'trade-crypro__label' + (disableInputs ? ' trade-crypro__label--disabled' : '');
	const bestPrice = type === 'Buy' ? bestAsk : bestBid;
	const currencyText = type === 'Buy' ? currentTicker.currencyTo : currentTicker.currencyTo;
	const buttonPriceText = bestPrice && currencyText ? bestPrice + ' ' + currencyText : '';

	const buttonAmountText =
		type === 'Buy' ? (currencyText ? balance + ' ' + currencyText : '') : `${balance} ${currentTicker.currencyFrom}`;

	return (
		<div className="trade-crypto">
			{!dataIsFetching && updateIsRequired && (
				<div className="trade-crypto__no-data">
					<p>Server error or slow network connection, please try again</p>
					<button className="btn btn-primary btn-refresh" onClick={() => updateExchangeData(currentTicker)}></button>
				</div>
			)}
			{dataIsFetching && <Loader />}
			{!updateIsRequired && currentTicker && (
				<div>
					<p className="name">
						{type} {currentTicker.currencyFrom || ''}
					</p>
					<div className={'trade-crypto__header' + (dataIsFetching ? ' blur' : '')}>
						<p className="trade-crypto__header-text">
							{!type === 'Buy' ? 'Highest bid ' : 'Lowest ask '}
							<button
								className={'trade-crypto__header-button' + (type === 'Buy' ? ' __triggerB' : ' __triggerS')}
								onClick={(e) => onPriceButtonClick(e, marketPrice)}
							>
								{buttonPriceText}
							</button>
						</p>
						<p className={'trade-crypto__header-text' + (overflowed ? ' overflow' : '')}>
							<span>Max amount </span>
							<button className="trade-crypto__header-button" onClick={onMaxButtonClick}>
								{buttonAmountText}
							</button>
						</p>
					</div>
					<div className={'form' + (dataIsFetching ? ' blur' : '')}>
						<label className={labelClassName}>
							<span className="trade-crypto__label-text">Price</span>
							<input
								ref={priceInput}
								onChange={handlePriceChange}
								className="trade-crypro__input"
								type="text"
								value={price}
							/>
							<span className="trade-crypto__currency">{currentTicker.currencyTo || ''}</span>
						</label>
						<label className={labelClassName}>
							<span className="trade-crypto__label-text">Amount</span>
							<input
								ref={amountInput}
								value={amount}
								onChange={handleAmountChange}
								className="trade-crypro__input"
								type="text"
								disabled={disableInputs}
							/>
							{showMaxButton && (
								<button className="trade-crypto__max-button" onClick={onMaxButtonClick}>
									max
								</button>
							)}
							<span className="trade-crypto__currency">{currentTicker.currencyFrom || ''}</span>
						</label>
						<label className={'' + labelClassName + (overflowed ? ' trade-crypro__label--unvalidated' : '')}>
							<span className="trade-crypto__label-text">Total</span>
							<input
								ref={totalInput}
								value={total}
								onChange={handleTotalChange}
								className="trade-crypro__input"
								type="text"
								disabled={disableInputs}
							/>
							<span className="trade-crypto__currency">{currentTicker.currencyTo || ''}</span>
						</label>
						<button
							className={'btn btn-orange submit' + (buttonSendIsDisabled || isTradingBlocked ? ' disabled' : '')}
							onClick={onSellBuyButtonClick}
							disabled={buttonSendIsDisabled || isTradingBlocked}
						>
							{type}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};
