import React from 'react';

export const PaymentEvent = ({ payment, currencyCodes }) => {
	const getWithdrawal = (json, fix) => {
		try {
			return JSON.parse(json)['Withdrew'];
		} catch (e) {
			return fix;
		}
	};

	return (
		<div className="wallet-events__payments">
			<span className="wallet-events__transaction-plate">
				<span className="wallet-events__transaction-plate__icon">
					<img
						className="wallet-events__item-icon-img"
						width="30"
						height="30"
						src={
							'/img/crypto-icons/' +
							currencyCodes.filter((code) => code.id === payment.CurrencyId)[0].isoName.toLowerCase() +
							(payment.CurrencyId === 2018 || payment.CurrencyId === 2019 ? '.png' : '.svg')
						}
						alt={currencyCodes.filter((code) => code.id === payment.CurrencyId)[0].isoName}
						title={currencyCodes.filter((code) => code.id === payment.CurrencyId)[0].isoName}
					/>
				</span>
				{payment.Amount.toFixed(currencyCodes.filter((code) => code.id === payment.CurrencyId)[0].digits)}{' '}
				{currencyCodes.filter((code) => code.id === payment.CurrencyId)[0].isoName}&nbsp;
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
							currencyCodes.find((code) => code.id === payment.WithdrawalCurrencyId).isoName.toLowerCase() +
							(payment.WithdrawalCurrencyId === 2018 || payment.WithdrawalCurrencyId === 2019 ? '.png' : '.svg')
						}
						alt={currencyCodes.find((code) => code.id === payment.WithdrawalCurrencyId).isoName}
						title={currencyCodes.find((code) => code.id === payment.WithdrawalCurrencyId).isoName}
					/>
				</span>
				{payment.ServerResponse
					? getWithdrawal(payment.ServerResponse, payment.withdrawalAmount) !== undefined
						? getWithdrawal(payment.ServerResponse, payment.WithdrawalAmount).toFixed(
								currencyCodes.find((code) => code.id === payment.WithdrawalCurrencyId).digits
						  )
						: payment.WithdrawalAmount.toFixed(
								currencyCodes.find((code) => code.id === payment.WithdrawalCurrencyId).digits
						  )
					: payment.WithdrawalAmount.toFixed(
							currencyCodes.find((code) => code.id === payment.WithdrawalCurrencyId).digits
					  )}{' '}
				&nbsp;
				{currencyCodes.find((code) => code.id === payment.WithdrawalCurrencyId).isoName}
			</span>
			{payment.TrovematFee !== 0 && (
				<p className={'wallet-events__item-currencyamount'}>
					<br />
					Earn: {payment.TrovematFee.toFixed(currencyCodes.find((code) => code.id === payment.CurrencyId).digits)}{' '}
					{currencyCodes.find((code) => code.id === payment.CurrencyId).isoName}
				</p>
			)}
		</div>
	);
};
