import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetAccounts } from 'features/accountsSlice';
import {
	fetchGetTradingPairs,
	fetchGetActiveOrders,
	fetchGetMarketOrders,
	fetchGetTradingHistory,
	fetchGetTickerInfo,
	fetchGetChartData,
} from './tradingSlice';

import { WalletsInfo } from './components/WalletsInfo.jsx';
import { RateHistory } from './components/RateHistory.jsx';
import { TradeCrypto } from './components/TradeCrypto.jsx';
import { ActiveOrders } from './components/ActiveOrders.jsx';
import { Orders } from './components/Orders.jsx';
import { TradeHistory } from './components/TradeHistory.jsx';
import { ExchangePairs } from './components/ExchangePairs.jsx';
import { Stockchart } from './components/Stockchart.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import isIE from 'utils/isIE';

const filterPairs = (filter, pairs) => {
	if (!pairs) return [];
	const filtered = pairs.filter((item) => item.currencyFrom.includes(filter.toUpperCase()));
	return filtered.length ? filtered : pairs;
};

export const Exchange = ({ match, history }) => {
	const dispatch = useDispatch();

	const [pairsFilter, setPairsFilter] = useState('');
	const [currentTicker, setCurrentTicker] = useState({});
	const [filteredPairs, setFilteredPairs] = useState([]);
	const [marketPrice, setMarketPrice] = useState(0);
	const [marketPriceTime, setMarketPriceTime] = useState(0);
	const [amountUpdateTime, setAmountUpdateTime] = useState(0);
	const [expandChart, setExpandChart] = useState(window.innerWidth > 500);
	const [ordersBlockOrder, setOrdersBlockOrder] = useState(false);

	const { tradingPairs, tickerInfo, fetchingTradingPairs } = useSelector((state) => state.trading);
	const { accounts } = useSelector((state) => state.newAccounts);
	const { rates: currencyRates } = useSelector((state) => state.currencyRates);
	const { codes: currencyCodes } = useSelector((state) => state.currencyCodes);
	const { userCurrency } = useSelector((state) => state.newUserSettings);
	const { activeLanguage: currentLanguage, languages } = useSelector((state) => state.language);
	const activeLanguage = languages[currentLanguage];

	useEffect(() => {
		if (!tradingPairs?.length) {
			dispatch(fetchGetTradingPairs());
		}
	}, [tradingPairs]);

	useEffect(() => {
		if (match?.params?.filter) {
			setPairsFilter(match.params.filter);
			const filteredPairs = filterPairs(match.params.filter, tradingPairs);
			setFilteredPairs(filteredPairs);
			history.replace('/exchange');
		}
	}, []);

	useEffect(() => {
		setFilteredPairs(tradingPairs);
	}, [tradingPairs]);

	useEffect(() => {
		if (filteredPairs?.length) {
			handlePairSelect(filteredPairs[0]);
		}
	}, [filteredPairs]);

	useEffect(() => {
		if (pairsFilter) {
			setFilteredPairs((pairs) => {
				return pairs?.length < tradingPairs.length && filteredPairs.length === tradingPairs.length ? [] : filteredPairs;
			});
		}
	}, [pairsFilter]);

	useEffect(() => {
		if (Object.keys(currentTicker).length) {
			dispatch(fetchGetChartData(currentTicker));
			dispatch(fetchGetActiveOrders());
			dispatch(fetchGetMarketOrders(currentTicker));
			dispatch(fetchGetTradingHistory(currentTicker));
		}
	}, [currentTicker]);

	const updateData = (ticker) => {
		dispatch(fetchGetAccounts());
		dispatch(fetchGetTickerInfo(ticker));
	};

	const resetFilter = (e) => {
		e.preventDefault();
		setPairsFilter('');
		setFilteredPairs(tradingPairs);
	};

	const handleFilterTyping = (e) => {
		e.preventDefault();
		const value = e.target.value.replace(/[^a-zA-Z]/gi, '');
		const filteredPairs = filterPairs(value, tradingPairs);
		setPairsFilter(value);
		setFilteredPairs(filteredPairs);
	};

	const handlePairSelect = (item) => {
		dispatch(fetchGetTickerInfo(item));
		setCurrentTicker(item);
		setMarketPrice(0);
		setMarketPriceTime(new Date());
		setAmountUpdateTime(new Date());
	};

	const handleMarketPriceSelect = (price, e) => {
		e.preventDefault();
		setMarketPrice(price);
		setMarketPriceTime(new Date());
	};

	const checkIsBlockedAccount = (ticker, accounts) => {
		if (accounts.length && Object.keys(ticker).length) {
			const baseAcc = accounts.find((acc) => acc.currencyIsoCode === ticker.currencyFrom) || {};
			const cryptoAcc = accounts.find((acc) => acc.currencyIsoCode === ticker.currencyTo) || {};
			return baseAcc.blocked || cryptoAcc.blocked;
		}
	};

	const browserIsIE = isIE();
	const isBlockedAccount =
		accounts.length && Object.keys(currentTicker).length && checkIsBlockedAccount(currentTicker, accounts);
	const rightCurrencyDecimals = currencyCodes
		.filter((item) => item.id > 2000)
		.find((item) => item.id === currentTicker.currencyToId)?.digits;

	return (
		<div className="content exchange-page">
			<ToastContainer />
			<div className="row first-row">
				<ExchangePairs
					pairsAreFetching={fetchingTradingPairs}
					pairsFilter={pairsFilter}
					filteredPairs={filteredPairs}
					currentTicker={currentTicker}
					onSelect={handlePairSelect}
					resetFilter={resetFilter}
					handleFilterTyping={handleFilterTyping}
				/>
				<RateHistory
					tickerInfo={tickerInfo}
					currencyCodes={currencyCodes}
					currencyRates={currencyRates}
					currentTicker={currentTicker}
				/>
				{!browserIsIE ? (
					<div className="trading-view">
						<button
							className={
								'trading-view__toggle-button' +
								(expandChart ? ' trading-view__toggle-button--close' : ' trading-view__toggle-button--open')
							}
							onClick={() => setExpandChart((state) => !state)}
						/>
						{expandChart && <Stockchart updateExchangeData={updateData} currentTicker={currentTicker} />}
					</div>
				) : (
					<div className="trading-view">
						<img
							alt="Show chart"
							className="trading-view__no-chart-icon"
							src="/img/chart-icon.svg"
							width="100"
							height="100"
						/>
					</div>
				)}
			</div>
			<div className="row trading">
				<WalletsInfo
					accounts={accounts}
					currencyRates={currencyRates}
					currencyCodes={currencyCodes}
					userCurrency={userCurrency}
				/>
				<TradeCrypto
					type="Sell"
					updateExchangeData={updateData}
					marketPrice={marketPrice}
					marketPriceTime={marketPriceTime}
					amountUpdateTime={amountUpdateTime}
					isTradingBlocked={isBlockedAccount}
					tickerInfo={tickerInfo}
					currentTicker={currentTicker}
					accounts={accounts}
					digits={rightCurrencyDecimals}
				/>
				<TradeCrypto
					type="Buy"
					updateExchangeData={updateData}
					marketPrice={marketPrice}
					marketPriceTime={marketPriceTime}
					amountUpdateTime={amountUpdateTime}
					isTradingBlocked={isBlockedAccount}
					tickerInfo={tickerInfo}
					currentTicker={currentTicker}
					accounts={accounts}
					digits={rightCurrencyDecimals}
				/>
			</div>

			<div className="row orders">
				<ActiveOrders pairsFilter={pairsFilter} activeLanguage={activeLanguage} currentTicker={currentTicker} />
				<Orders
					type={!ordersBlockOrder ? 'Buy' : 'Sell'}
					handleSwapBlocks={() => setOrdersBlockOrder((state) => !state)}
					onSelect={handleMarketPriceSelect}
					showSwapIcon={true}
					leftCurrencyDecimals={currentTicker.decimalPlaces}
					rightCurrencyDecimals={rightCurrencyDecimals}
				/>
				<Orders
					type={!ordersBlockOrder ? 'Sell' : 'Buy'}
					onSelect={handleMarketPriceSelect}
					leftCurrencyDecimals={currentTicker.decimalPlaces}
					rightCurrencyDecimals={rightCurrencyDecimals}
				/>
			</div>

			<div className="row trade-history-container">
				<TradeHistory currentTicker={currentTicker} />
			</div>
		</div>
	);
};
