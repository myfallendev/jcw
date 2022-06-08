import React, { useState, useEffect } from 'react';

export const FiatEvent = ({ fiatList = [], currencyCodes = [], transferId }) => {
	const [order, setOrder] = useState();

	useEffect(() => {
		setOrder(fiatList.find((item) => item.transferId === parseFloat(transferId)));
	}, [fiatList, transferId]);

	return (
		order !== undefined && (
			<div className="wallet-events__payments">
				<span className="wallet-events__transaction-plate">
					<span className="wallet-events__transaction-plate__icon">
						<img
							className="wallet-events__item-icon-img"
							width="30"
							height="30"
							src={
								'/img/crypto-icons/' +
								currencyCodes.filter((code) => code.id === order.transferCurrencyId)[0].isoName.toLowerCase() +
								(order.transferCurrencyId === 2018 || order.transferCurrencyId === 2019 ? '.png' : '.svg')
							}
							alt={currencyCodes.filter((code) => code.id === order.transferCurrencyId)[0].isoName}
							title={currencyCodes.filter((code) => code.id === order.transferCurrencyId)[0].isoName}
						/>
					</span>
					{order.transferAmount.toFixed(currencyCodes.filter((code) => code.id === order.transferCurrencyId)[0].digits)}{' '}
					{currencyCodes.filter((code) => code.id === order.transferCurrencyId)[0].isoName}&nbsp;
				</span>
				<svg className="wallet-events__transaction-arrow" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
					<g>
						<polygon points="1,26 44.586,26 38.293,32.293 39.707,33.707 48.414,25 39.707,16.293 38.293,17.707 44.586,24 1,24  " />
					</g>
				</svg>
				&nbsp;
				<span className="wallet-events__transaction-plate">
					<span className="wallet-events__transaction-plate__icon">
						<img
							className="wallet-events__item-icon-img"
							width="30"
							height="30"
							src={
								'/img/crypto-icons/' +
								currencyCodes.find((code) => code.id === order.withdrawCurrencyId).isoName.toLowerCase() +
								(order.withdrawCurrencyId === 2018 || order.withdrawCurrencyId === 2019 ? '.png' : '.svg')
							}
							alt={currencyCodes.find((code) => code.id === order.withdrawCurrencyId).isoName}
							title={currencyCodes.find((code) => code.id === order.withdrawCurrencyId).isoName}
						/>
					</span>
					{(order.withdrawAmount - order.feeAmount).toFixed(
						currencyCodes.find((code) => code.id === order.withdrawCurrencyId).digits
					)}{' '}
					&nbsp;
					{currencyCodes.find((code) => code.id === order.withdrawCurrencyId).isoName}
				</span>
				{order.feeAmount !== 0 && (
					<p className={'wallet-events__item-currencyamount'}>
						<br />
						Earn: {order.feeAmount.toFixed(
							currencyCodes.find((code) => code.id === order.withdrawCurrencyId).digits
						)}{' '}
						{currencyCodes.find((code) => code.id === order.withdrawCurrencyId).isoName}
					</p>
				)}
			</div>
		)
	);
};
