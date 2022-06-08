import React, { useState, useEffect } from 'react';
import { Loader } from 'core/components/Loader';
import Clipboard from 'clipboard';

function DoneIcon() {
	return (
		<svg
			fill="none"
			height="44"
			stroke="#239d60"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
			width="44"
			xmlns="http://www.w3.org/2000/svg"
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	);
}

function CopyIcon() {
	return (
		<svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
			<rect
				fill="none"
				height="13"
				rx="2"
				ry="2"
				stroke="#555"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				width="13"
				x="9"
				y="9"
			/>
			<path
				d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
				fill="none"
				stroke="#555"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	);
}

export const DepositModal = ({ account, fetchingCryptoAddress, activeLanguage }) => {
	const [textCopied, setTextCopied] = useState(false);
	let clipboard;
    const addressText = fetchingCryptoAddress
			? activeLanguage.loading_crypto_address
        : account.cryptoAddress || activeLanguage.loading_crypto_address_error;

	useEffect(() => {
		clipboard = new Clipboard('#wallet-address-button', {
			action: 'copy',
			target: () => document.getElementById('wallet-transfer-address'),
		});

		clipboard.on('success', (e) => {
			setTextCopied(true);
			setTimeout(() => setTextCopied(false), 10000);
		});

		clipboard.on('error', (e) => {
			console.error('Action:', e.action);
			console.error('Trigger:', e.trigger);
		});
		return () => clipboard.destroy();
	});

	return (
		<div className="wallet-transfer-container">
			<h3 className="wallet-transfer-container__subtitle">
				{account.account.currency !== 2019 && account.account.currency !== 2018 ? (
					<img
						className="wallet-transfer-container__currency-image"
						style={{ width: '32px', height: '32px' }}
						src={'img/crypto-icons/_' + account.account.currency + '.svg'}
						alt={account.name}
					/>
				) : (
					<img
						className="wallet-transfer-container__currency-image"
						style={{ width: '32px', height: '32px' }}
						src={'img/crypto-icons/_' + account.account.currency + '.png'}
						alt={account.name}
					/>
				)}
				<span>{account.name}</span>
			</h3>
			<div className="wallet-transfer-container__deposit-qr-n-link">
				{fetchingCryptoAddress ? (
					<Loader />
				) : (
					account.qrUrl && <img src={window.jcApi + '/' + account.qrUrl} alt={account.name} />
				)}
				<p
					className={'wallet-transfer-container__address' + (textCopied ? ' copied' : '')}
					id="wallet-transfer-address"
				>
					<span className="wallet-transfer-container__address-text" id="wallet-address">
						{addressText}
					</span>
					{!fetchingCryptoAddress &&
						account.cryptoAddress &&
						(textCopied ? (
							<DoneIcon />
						) : (
							<button id="wallet-address-button" className="wallet-transfer-container__copy-button">
								<CopyIcon />
							</button>
						))}
				</p>
				{account.account.currency === 2007 && ( // Ripple
					<div>
						<p style={{ fontSize: '.9rem', textAlign: 'left', margin: '10px 0' }}>
							The Ripple network requires a minimum of 20 XRP to be in any active address. The first time you deposit,
							20 XRP will be held in order to reserve the address. Once the address has been funded with 20 XRP, you
							will be able to deposit any amount and receive the full deposit.
						</p>
						<p style={{ fontSize: '.9rem', textAlign: 'left', margin: '10px 0' }}>
							Please note that if you generate a new deposit address, you will have to fund that one with 20 XRP as
							well.
						</p>
						<p style={{ fontSize: '.9rem', textAlign: 'left', margin: '10px 0' }}>
							Additionally, JetCrypto doesn’t require a destination tag for XRP deposits, so if your exchange requires
							one to withdraw you can enter "123456789".
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
