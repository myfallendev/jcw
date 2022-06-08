import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchKYCStatus } from 'features/PersonalPage/userSettingsSlice';
import { fetchGetAllCurrencies } from './components/MoonpayForm/moonpayFormSlice';
import { fetchCurrencyRatesForFiatCurrency } from '../currencyRatesSlice';
import { fetchWalletEvents } from './walletEventsSlice';
import {
	fetchGetAccounts,
	fetchGetAutoConversionPairs,
	fetchSetAutoConversionPair,
	toggleZeroBalances,
} from 'features/accountsSlice';
import { fetchGetTradingPairs } from 'features/Exchange/tradingSlice';
import { LoaderBlock } from './components/LoaderBlock';
import { Wallet } from './components/Wallet';
import { WalletEvents } from './components/WalletEvents';

import _find from 'lodash/find';

export const Home = ({ match, history }) => {
	const [filteredAccounts, setFilteredAccounts] = useState(null);
	//const [message, setMessage] = useState('');
	const [simplexConversionResult, setSimplexConversionResult] = useState(null);
	const { withdrawToWalletSuccess } = useSelector((state) => state.withdraw);
	const { accounts, operators, showZeroBalances, autoConversionPairs, fetchingCryptoAddress } = useSelector(
		(state) => state.newAccounts
	);
	const { userCurrency } = useSelector((state) => state.newUserSettings);
	const { user } = useSelector((state) => state.global);
	const { events: walletEvents } = useSelector((state) => state.walletEvents);
	const { languages, activeLanguage: currentLanguage } = useSelector((state) => state.language);
	const { tradingPairs } = useSelector((state) => state.trading);
	const { codes: currencyCodes } = useSelector((state) => state.currencyCodes);
	const { rates: currencyRates } = useSelector((state) => state.currencyRates);
	const activeLanguage = languages[currentLanguage];

	const dispatch = useDispatch();
	const { params } = match;
	const getAllMoonpayCurrencies = () => dispatch(fetchGetAllCurrencies());

	useEffect(() => {
		dispatch(fetchWalletEvents());
		dispatch(fetchGetTradingPairs());
		dispatch(fetchGetAutoConversionPairs());
		getAllMoonpayCurrencies();
		dispatch(fetchKYCStatus());

		if (params && params.operationResult) {
			//TODO: что дальше? что с результатом операции делаем?
			setSimplexConversionResult(params.operationResult);
		}
	}, []);

	const filterAccounts = (arr) =>
		arr.map((acc) => {
			const buf = operators.find((operator) => operator.currencyId === acc.account.currency);
			return { ...acc, operatorExist: buf !== undefined };
		});

	useEffect(() => {
		if (withdrawToWalletSuccess) {
			//TODO: should fetch wallet events, balances, renew accounts
			dispatch(fetchWalletEvents());
			dispatch(fetchGetAccounts());
			//TODO: выяснить насчет обновления балансов, зачем оно отдельным контроллером, если баланс аккаунта передается полем в объекте аккаунта
		}
	}, [withdrawToWalletSuccess]);

	useEffect(() => {
		if (operators?.length && accounts?.length) {
			setFilteredAccounts(
				showZeroBalances ? filterAccounts(accounts) : filterAccounts(accounts).filter((acc) => acc.balance > 0)
			);
		}
	}, [showZeroBalances, operators, accounts]);

	const refreshAccountsBlock = () => {
		dispatch(fetchCurrencyRatesForFiatCurrency(userCurrency !== null ? userCurrency?.id : 840));
		dispatch(fetchGetAccounts());
		dispatch(fetchWalletEvents());
	};

	const refreshWalletEventsBlock = () => {
		dispatch(fetchCurrencyRatesForFiatCurrency(userCurrency !== null ? userCurrency?.id : 840));
		dispatch(fetchGetAccounts());
		dispatch(fetchWalletEvents());
	};

	const setAutoConversionPair = (accoundId, isActive) => {
		const usdcAccount = _find(accounts, (e) => e.currencyIsoCode === 'USDC');
		if (+accoundId && +usdcAccount.id) {
			dispatch(fetchSetAutoConversionPair(+accoundId, +usdcAccount.id, isActive));
		}
	};

	const showAccountsBlock =
		filteredAccounts &&
		currencyCodes &&
		currencyRates &&
		accounts.length &&
		currencyCodes.length &&
		autoConversionPairs &&
		currencyRates.length &&
		Object.keys(user).length &&
		userCurrency;

	const showWalletEventsBlock =
		accounts &&
		walletEvents &&
		currencyCodes &&
		currencyRates &&
		walletEvents.length &&
		accounts.length &&
		currencyCodes.length &&
		currencyRates.length;

	return (
		<div className="content main-page">
			<div className="row _hiddenArea">
				<div className="accounts col-md-12 col-sm-24">
					<div className="accounts__header">
						<h1>{activeLanguage.wallets_title}</h1>
						<div className="accounts__balances accounts__hide-zero-balances">
							<button className="" onClick={() => dispatch(toggleZeroBalances())}>
								{!showZeroBalances ? 'Show zero balances' : 'Hide zero balances'}
							</button>
						</div>
					</div>

					{showAccountsBlock && filteredAccounts?.length > 0 ? (
						filteredAccounts.map(
							(account) =>
								!account.account.isFiat && (
									<Wallet
										key={account.id}
										user={user}
										account={account}
										activeLanguage={activeLanguage}
										history={history}
										fetchingCryptoAddress={fetchingCryptoAddress}
										currencyCodes={currencyCodes}
										currencyRates={currencyRates}
										tradingPairs={tradingPairs}
										autoConversionPairs={autoConversionPairs}
										setAutoConversionPair={setAutoConversionPair}
									/>
								)
						)
					) : (
						<LoaderBlock
							timeoutText={'Can not load list of wallets. Try again later...'}
							count={filteredAccounts?.length}
							emptyText={'Wallets not found'}
							refreshCallback={refreshAccountsBlock}
							containerMaskClassName="accounts--loading"
						/>
					)}
				</div>

				<div className="wallet-events-container col-md-12 col-sm-24">
					<h1>{activeLanguage.recent_activity_title}</h1>
					{showWalletEventsBlock ? (
						<WalletEvents
							activeLanguage={activeLanguage}
							accounts={accounts}
							currencyCodes={currencyCodes}
							currencyRates={currencyRates}
							currency={userCurrency?.id}
							walletEvents={walletEvents}
						/>
					) : (
						<LoaderBlock
							timeoutText={'Can not load list of transactions. Try again later...'}
							count={walletEvents?.length}
							emptyText={'Transactions not found'}
							refreshCallback={refreshWalletEventsBlock}
							containerMaskClassName="wallet-events--loading"
						/>
					)}
				</div>
			</div>
		</div>
	);
};
