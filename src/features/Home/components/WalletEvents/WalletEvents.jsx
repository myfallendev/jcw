import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiatEvent } from '../FiatEvent';
import { PaymentEvent } from '../PaymentEvent';
//import { fetchCurrencyRatesForFiatCurrency } from 'features/currencyRatesSlice';
import { fetchFiatOrders } from '../../walletEventsSlice';
import moment from 'moment';

import _orderBy from 'lodash/orderBy';
import _find from 'lodash/find';
import _take from 'lodash/take';

export const WalletEvents = ({ activeLanguage, accounts, currencyCodes, currencyRates, currency, walletEvents }) => {
	const dispatch = useDispatch();
	const [eventsLimit, setEventsLimit] = useState(10);
	const [events, setEvents] = useState([]);
	const { fiatOrders } = useSelector((state) => state.walletEvents);

	useEffect(() => {
		//const copyFields = document.querySelectorAll('.wallet-events__item-source-copy');
		// Fucking IE11!!!
		// for (let i = 0; i < copyFields.length; i++) {
		// 	const transactionInputField = copyFields[i].previousElementSibling;
		// 	const clipboard = new Clipboard(copyFields[i], {
		// 		action: 'copy',
		// 		target: () => transactionInputField,
		// 	});
		// }
		dispatch(fetchFiatOrders());
	}, []);

	const showOlderActivity = () => {
		setEventsLimit((state) => state + 10);
	};

	// const getFiat = () => {
	// 	axiosWrapper('/api/FiatWithdraw?page=1&itemsPerPage=100', {
	// 		method: 'GET',
	// 	}).then((response) => {
	// 		let fiatOrders = response.data.response;
	// 		if (!!fiatOrders) {
	// 			fiatOrders.forEach((order) => {
	// 				order.withdrawComplete !== null ? (order.orderComplete = true) : (order.orderComplete = false);
	// 			});
	// 			setFiatList(fiatOrders);
	// 		}
	// 	});
	// };

	const copyTransactionId = (e) => {
		const target = e.currentTarget;
		target.classList.add('wallet-events__item-source-copy--pending');
		setTimeout(() => {
			target.classList.remove('wallet-events__item-source-copy--pending');
		}, 3000);
	};

	//const currentCurrency = isNaN(parseInt(currency, 10)) ? 840 : parseInt(this.props.currency, 10);
	useEffect(() => {
		let events = [];
		if (accounts.length && currencyCodes.length && currencyRates.length && walletEvents.length && currency) {
			events = walletEvents.map((event) => {
				const _event = { ...event };
				let account = _find(accounts, { id: event.transactionSourceId });
				if (event.transactionSource === 3) {
					account = _find(accounts, { id: event.targetId });
				}
				if (account !== undefined) {
					const ccurrency = _find(currencyCodes, { id: parseInt(account.account.currency, 10) });
					const activeCurrency = _find(currencyCodes, { id: parseInt(currency, 10) });
					const currencyRate = currencyRates.find(
						(rate) => rate.fromCurrencyId === parseInt(account.account.currency, 10)
					);
					_event.account = account;
					_event.currency = ccurrency;
					_event.activeCurrencyAmount = !!currencyRate ? currencyRate.value * event.amount : event.amount;
					_event.activeCurrency = activeCurrency;
					_event.createDateSort = moment(event.createDate).format('X');
				}

				if (
					!!event.additionalInfo &&
					event.additionalInfo.CurrencyId === 2001 &&
					!!event.additionalInfo.ServerResponse
				) {
					try {
						let ServerResponse = JSON.parse(event.additionalInfo.ServerResponse);
						_event.txId = ServerResponse.txId;
					} catch {
						_event.txId = null;
					}
				}
				return _event;
			});
			events = _orderBy(events, ['createDateSort'], ['desc']);
			events.forEach((event, index) => {
				event.itemClassTop =
					events[index + 1] && event.transactionNumber === events[index + 1].transactionNumber
						? ' wallet-events__item--top '
						: '';
				event.itemClassBottom =
					events[index - 1] && event.transactionNumber === events[index - 1].transactionNumber
						? ' wallet-events__item--bottom '
						: '';
			});
			events[eventsLimit - 1]?.itemClassTop === ''
				? (events = _take(events, eventsLimit))
				: (events = _take(events, eventsLimit + 1));
		}
		setEvents(events);
	}, [accounts, currencyCodes, currencyRates, walletEvents, eventsLimit]);

	return (
		<div className="wallet-events">
			{accounts.length && currencyCodes.length && currencyRates.length && currency && events.length
				? events.map(
						(event) =>
							event.account && (
								<div className={'wallet-events__item ' + event.itemClassTop + event.itemClassBottom} key={event.id}>
									<div className="wallet-events__item-date-container">
										<div
											className={
												'wallet-events__item-date ' +
												(moment().format('YYYY') === moment(event.createDate).format('YYYY')
													? ''
													: 'wallet-events__item-date--with-year')
											}
										>
											{moment().format('YYYY') === moment(event.createDate).format('YYYY')
												? moment(event.createDate).format('DD MMM')
												: moment(event.createDate).format('DD MMM YYYY')}
										</div>
									</div>
									<div className="wallet-events__item-content-container">
										<div className="wallet-events__item-operation-container">
											<div className="wallet-events__item-icon">
												<img
													className="wallet-events__item-icon-img"
													width="48"
													height="48"
													src={
														'/img/crypto-icons/' +
														event.account.currencyIsoCode.toLowerCase() +
														(event.account.account.currency === 2018 || event.account.account.currency === 2019
															? '.png'
															: '.svg')
													}
													alt={event.account.account.name}
													title={event.account.account.name}
												/>
											</div>
											<div className="wallet-events__item-action-container">
												<div className="wallet-events__item-action">
													{event.amount > 0
														? activeLanguage.wallet_events_received
														: activeLanguage.wallet_events_spent}{' '}
													{event.account.currencyIsoCode}
												</div>
												{event.transactionNumber && (
													<div className="wallet-events__item-source _mw375">
														<div className="wallet-events__item-source-input-container">
															<input type="text" readOnly defaultValue={event.transactionNumber} />
														</div>
														<button onClick={copyTransactionId} className="wallet-events__item-source-copy">
															<svg
																className="wallet-events__item-source-copy--default"
																height="24"
																viewBox="0 0 24 24"
																width="24"
																xmlns="http://www.w3.org/2000/svg"
															>
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
																></rect>
																<path
																	d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
																	fill="none"
																	stroke="#555"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth="2"
																></path>
															</svg>
															<svg
																className="wallet-events__item-source-copy--copied"
																fill="none"
																height="28"
																stroke="#239d60"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																viewBox="0 0 24 24"
																width="28"
																xmlns="http://www.w3.org/2000/svg"
															>
																<polyline points="20 6 9 17 4 12"></polyline>
															</svg>
														</button>
													</div>
												)}

												{event.account.account.currency === 2001 &&
													event?.additionalInfo?.PaymentStatus === 'Successful' &&
													event.txId && (
														<div style={{ margin: '10px 0' }}>
															<a
																target="_blank"
																rel="noopener noreferrer"
																className="btn btn-orange"
																href={'https://live.blockcypher.com/btc/tx/' + event.txId + '/'}
															>
																View public Metadata
															</a>
														</div>
													)}

												{event?.additionalInfo?.PaymentStatus === 'Successful' && (
													<div className={'wallet-events__item-status wallet-events__item-cryptoamount--increment'}>
														{event.additionalInfo.PaymentStatus}
													</div>
												)}

												{event?.additionalInfo?.TransferStatus === 'Successful' && (
													<div className={'wallet-events__item-status wallet-events__item-cryptoamount--increment'}>
														{event.additionalInfo.TransferStatus}
													</div>
												)}
												{(event?.additionalInfo?.PaymentStatus === 'Initialized' ||
													event?.additionalInfo?.PaymentStatus === 'Processing') && (
													<div className={'wallet-events__item-status wallet-events__item-cryptoamount--pending'}>
														{event.additionalInfo.PaymentStatus}
													</div>
												)}
												{(event?.additionalInfo?.PaymentStatus === 'NotSuccessful' ||
													event?.additionalInfo?.PaymentStatus === 'InternalError') && (
													<div className={'wallet-events__item-status wallet-events__item-cryptoamount--decrement'}>
														{event.additionalInfo.PaymentStatus}
													</div>
												)}
												{event?.additionalInfo?.OperationType === 'Payment' &&
													event?.additionalInfo?.PaymentStatus === 'Successful' && (
														<PaymentEvent payment={event.additionalInfo} currencyCodes={currencyCodes} />
													)}
												{event?.additionalInfo?.OperationType === 'Money transfer' && (
													<FiatEvent
														transferId={event.additionalInfo.TransferId}
														currencyCodes={currencyCodes}
														fiatList={fiatOrders}
													/>
												)}
											</div>
										</div>
										<div className="wallet-events__item-source _mw320">
											<div className="wallet-events__item-source-input-container">
												<input type="text" readOnly defaultValue={event.transactionNumber} />
											</div>
											<button onClick={copyTransactionId} className="wallet-events__item-source-copy">
												<svg
													className="wallet-events__item-source-copy--default"
													height="24"
													viewBox="0 0 24 24"
													width="24"
													xmlns="http://www.w3.org/2000/svg"
												>
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
													></rect>
													<path
														d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
														fill="none"
														stroke="#555"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
													></path>
												</svg>
												<svg
													className="wallet-events__item-source-copy--copied"
													fill="none"
													height="28"
													stroke="#239d60"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													viewBox="0 0 24 24"
													width="28"
													xmlns="http://www.w3.org/2000/svg"
												>
													<polyline points="20 6 9 17 4 12"></polyline>
												</svg>
											</button>
										</div>
										<div className="wallet-events__item-amount-container">
											<div
												className={
													'wallet-events__item-cryptoamount wallet-events__item-cryptoamount--' +
													(event.amount > 0 ? 'increment' : 'decrement')
												}
											>
												{event.amount > 0 ? ' + ' : ' - '} {Math.abs(event.amount).toFixed(event.currency.digits)}{' '}
												{event.currency.isoName}
											</div>
										</div>
									</div>
								</div>
							)
				  )
				: ''}
			{!events.length && activeLanguage.no_transactions_found}
			{events.length > eventsLimit && (
				<button className="wallet-events__older-activity" onClick={showOlderActivity}>
					{activeLanguage.wallet_events_older_activity}
				</button>
			)}
		</div>
	);
};
