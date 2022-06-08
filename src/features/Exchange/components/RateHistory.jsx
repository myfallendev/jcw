import React, { useEffect, useState } from 'react';
import { Loader } from 'core/components/Loader';

export const RateHistory = ({ tickerInfo, currentTicker, currencyRates, currencyCodes }) => {
	const [cryptoCodes, setCryptoCodes] = useState({});

	const accuracy = 8;
	const tickerNameFirst = currentTicker ? currentTicker.currencyFrom : '';
	const tickerNameSecond = currentTicker ? currentTicker.currencyTo : '';

	const volume = tickerInfo?.volume ?? 0;
	const lastPrice = tickerInfo?.lastPrice ?? 0;

	useEffect(() => {
		if (currencyCodes.length) {
			const cryptoCodes = currencyCodes
				.filter((item) => item.id > 2000)
				.reduce((acc, next) => {
					acc[next.isoName] = next.id;
					return acc;
				}, {});
			setCryptoCodes(cryptoCodes);
		}
	}, [currencyCodes]);

	const getName = () => {
		if (!(tickerNameFirst && tickerNameSecond)) return '';

		return '' + tickerNameFirst + ' / ' + tickerNameSecond;
	};

	const getHighValue = () => {
		let high = tickerInfo && tickerInfo.high ? tickerInfo.high.toFixed(accuracy) : 0;

		if (high && String(high).search('e') !== 1) {
			high = String(high)
				.split('.')
				.map((item, index) => (index === 1 ? item.slice(0, accuracy + 1) : item))
				.join('.');
		}

		return high;
	};

	const getLowValue = () => {
		let low = tickerInfo && tickerInfo.low ? tickerInfo.low.toFixed(accuracy) : 0;

		if (low && String(low).search('e') !== 1) {
			low = String(low)
				.split('.')
				.map((item, index) => (index === 1 ? item.slice(0, accuracy + 1) : item))
				.join('.');
		}

		return low;
	};

	const getChange = () => {
		//TODO: разобраться что здесь происходит, результат странный получается (при пустых данных тикера)
		if (!currencyRates.length) return '';

		if (!(tickerNameFirst && tickerNameSecond && Object.keys(cryptoCodes).length)) return '';

		const rateFrom = currencyRates.find((item) => item.fromCurrencyId === cryptoCodes[tickerNameFirst]);
		const rateTo = currencyRates.find((item) => item.fromCurrencyId === cryptoCodes[tickerNameSecond]);

		if (!(rateFrom && rateTo && Object.keys(rateFrom).length && Object.keys(rateTo).length)) return '';

		let prevFrom = rateFrom.value / (rateFrom.percentageChange24H / 100 + 1);
		let prevTo = rateTo.value / (rateTo.percentageChange24H / 100 + 1);

		let prevDelta = prevFrom / prevTo;
		let delta = rateFrom.value / rateTo.value;

		return prevDelta ? ((delta / prevDelta - 1) * 100).toFixed(2) : 0;
	};

	const name = getName();
	const change = getChange();
	const high = getHighValue();
	const low = getLowValue();

	return (
		<div className="rate-history">
			{currentTicker.id ? (
				<div className="markets">
					<p className="px16-semipale-text">Markets</p>
					<span className="first-cur">{tickerNameFirst} / </span>
					<span className="second-cur">{tickerNameSecond}</span>
					<sup className="change-percent">{change}</sup>
				</div>
			) : (
				<Loader />
			)}
			<div className="prices">
				{name ? (
					<div>
						<p className="px16-semipale-text">Last price</p>
						<span className="value">{lastPrice}</span>
						<p className="px16-semipale-text">Volume 24-hours</p>
						<span className="value">{volume} </span>
						<p className="px16-semipale-text highest">Highest 24-hours</p>
						<span className="value">{high}</span>
						<img src="/img/course-arrow-up.png" alt="↑" />
						<p className="px16-semipale-text">Lowest 24-hours</p>
						<span className="value">{low}</span>
						<img src="/img/course-arrow-down.png" alt="↓" />
					</div>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};
