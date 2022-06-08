//import { bindActionCreators } from 'redux';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFees } from 'features/feesSlice';
import { fetchGetTradingPairs } from 'features/Exchange/tradingSlice';

import { Loader } from '../Loader';

export const Fee = () => {
	const dispatch = useDispatch();
	const [mergedCurrencies, setMergedCurrencies] = useState([]);
	const [mergedTable, setMergedTable] = useState([]);
	const { fetching: fetchingFees, fees } = useSelector((state) => state.fees);
	const { fetching: fetchingTradingPairs, tradingPairs } = useSelector((state) => state.trading);

	const fetching = fetchingFees || fetchingTradingPairs;

	useEffect(() => {
		dispatch(fetchGetFees());
		dispatch(fetchGetTradingPairs());
	}, [dispatch]);

	useEffect(() => {
		if (fees.length && tradingPairs.length) {
			const feesCurrencies = fees.map((item) => item.currencyIso);
			const tradingCurrencies = tradingPairs.map((item) => item.currencyFrom);
			setMergedCurrencies(new Set([...tradingCurrencies.filter(Boolean), ...feesCurrencies.filter(Boolean)]));
		}
	}, [fees, tradingPairs]);

	useEffect(() => {
		if (mergedCurrencies.size) {
			const data = Array.from(mergedCurrencies).map((item) => {
				const obj = {};
				obj.currencyIso = item; // { currencyIso: 'BTC' }
				const withdrawalFeeObject = fees.find((e) => e.currencyIso === item);
				obj.withdrawalFee = !!withdrawalFeeObject ? withdrawalFeeObject.fee : ' - '; // { currencyIso: 'BTC', withdrawalFee: '0.0005' }
				const tradingFeeObject = tradingPairs.find((e) => e.currencyFrom === item);
				obj.tradingFee = !!tradingFeeObject ? tradingFeeObject.fee + '%' : ' - '; // { currencyIso: 'BTC', withdrawalFee: '0.0005'. tradingFee: '0.0001%' }
				obj.minAmount = !!tradingFeeObject ? tradingFeeObject.minAmount : ' - '; // { currencyIso: 'BTC', withdrawalFee: '0.0005'. tradingFee: '0.0001%', minAmount: 0.00001 }
				return obj;
			});
			setMergedTable(data);
		}
	}, [mergedCurrencies]);

	return (
		<div className={'fee-container'}>
			{fetching ? (
				<div style={{ padding: '150px 0' }}>
					<Loader />
				</div>
			) : (
				<div className={'fee-tables'}>
					{mergedTable.length ? (
						<div>
							<table className={'fee-modal-table'}>
								<thead>
									<tr>
										<th>Currency</th>
										<th>Withdrawal Fee</th>
										<th>Trading Fee</th>
										<th>Min Trade Amount</th>
									</tr>
								</thead>
								<tbody>
									{mergedTable.map((item) => (
										<tr key={item.currencyIso}>
											<td>{item.currencyIso}</td>
											<td>{item.withdrawalFee}</td>
											<td>{item.tradingFee}</td>
											<td>{item.minAmount}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div style={{ margin: '50px 25px' }}>Can't load data</div>
					)}
				</div>
			)}
		</div>
	);
};
