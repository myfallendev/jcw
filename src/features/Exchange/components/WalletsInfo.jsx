import React from 'react';
import { toDecimals } from 'utils/toDecimals';

export const WalletsInfo = ({ accounts, currencyCodes, currencyRates, userCurrency }) => {
	return (
		<div className="wallets col-md-8">
			<p className="name">Wallets</p>
			<div className="wallets__container">
				<table>
					<tbody>
						<tr>
							<th>Coin</th>
							<th>Price, {userCurrency?.isoName}</th>
							<th>Change, %</th>
							<th>Amount</th>
						</tr>
						{accounts.length > 0 &&
							currencyCodes.length > 0 &&
							currencyRates.length > 0 &&
							accounts.map(
								(account) =>
									!account.account.isFiat && (
										<Info
											key={account.id}
											account={account}
											currencyCodes={currencyCodes}
											currencyRates={currencyRates}
										/>
									)
							)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const Info = ({ account, currencyCodes, currencyRates }) => {
	const currencyRate = currencyRates.find((rate) => rate.fromCurrencyId === +account.account.currency)?.value ?? '';
	const { symbol, digits } = currencyCodes.find((currency_code) => currency_code.id === account.account.currency);
	const rateChange = typeof currencyRate !== 'undefined' ? currencyRate.percentageChange24H : '';
	const rateCellClassName = rateChange ? (rateChange > 0 ? 'increase' : rateChange < 0 ? 'decrease' : '') : '';

	return (
		<tr className="item">
			<td>{symbol}</td>
			<td>{currencyRate}</td>
			<td className={rateCellClassName}>{rateChange}</td>
			<td>{toDecimals(account.balance, digits)}</td>
		</tr>
	);
};
