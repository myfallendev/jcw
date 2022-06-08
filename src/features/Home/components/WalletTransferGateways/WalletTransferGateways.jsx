import React from 'react';

export const WalletTransferGateways = ({
	account,
	simplexSupportedCrypto,
	moonpaySupportedCrypto,
	handleSimplexClick,
	handleMoonpayClick,
}) => {
	return (
		<div className="wallet-transfer-gateways">
			{simplexSupportedCrypto.length > 0 && simplexSupportedCrypto.includes(account.currencyIsoCode) && (
				<div
					onClick={handleSimplexClick}
					className="wallet-transfer-gateways--gateway wallet-transfer-container__address"
					style={{ background: '#000' }}
				>
					<img className="wallet-transfer-gateways--img" src="img/simplex-logo.png" alt="Simplex" width="150" />
				</div>
			)}
			{moonpaySupportedCrypto.length > 0 && moonpaySupportedCrypto.includes(account.currencyIsoCode) && (
				<div
					onClick={handleMoonpayClick}
					className="wallet-transfer-gateways--gateway wallet-transfer-container__address"
				>
					<img className="wallet-transfer-gateways--img" src="img/moonpay-logo.svg" alt="Moonpay" width="150" />
				</div>
			)}
		</div>
	);
};
