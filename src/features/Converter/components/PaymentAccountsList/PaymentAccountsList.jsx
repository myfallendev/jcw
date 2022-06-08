import React from 'react';
import isInternetExplorer from 'utils/isIE';

export const PaymentAccountsList = ({ account, onChange }) => {
	const isIE = isInternetExplorer();
	return (
		<li
			onClick={() => onChange(account.id, account.balance, account.currencyIsoCode, account.account.currency)}
			className="account"
		>
			{isIE ? (
				<img style={{ width: '32px', marginRight: '15px' }} src={'/img/' + account.account.image} alt="" />
			) : (
				<img
					style={{ marginRight: '15px' }}
					width="32"
					height="auto"
					src={
						'/img/crypto-icons/' +
						account.currencyIsoCode.toLowerCase() +
						(account.account.currency === 2018 || account.account.currency === 2019 ? '.png' : '.svg')
					}
					alt={account.name}
				/>
			)}
			{account.name} ({account.balance})
		</li>
	);
};
