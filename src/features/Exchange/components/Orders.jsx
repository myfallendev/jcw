import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import _sortBy from 'lodash/sortBy';
import { Loader } from 'core/components/Loader';

export const Orders = ({
	type,
	onSelect,
	handleSwapBlocks,
	showSwapIcon,
	leftCurrencyDecimals,
	rightCurrencyDecimals,
}) => {
	const { marketOrders, marketOrdersFetching } = useSelector((state) => state.trading);
	const [data, setData] = useState([]);
	const accuracy = 8;

	useEffect(() => {
		const dataBuy = marketOrders?.buy ?? [];
		const dataSell = marketOrders?.sell ?? [];
		const data = type === 'Buy' ? _sortBy(dataBuy, (o) => o.price).reverse() : type === 'Sell' ? dataSell : [];
		setData(data);
	}, [marketOrders, type]);

	const currencyFrom = (data?.length && data[0].currencyFrom) || '';
	const currencyTo = (data?.length && data[0].currencyTo) || '';

	return (
		<div className="market-orders">
			{marketOrdersFetching && <Loader />}
			<p className="name">{type} Orders</p>
			<div className={'market-orders__container' + (marketOrdersFetching ? ' blur' : '')}>
				<table>
					<tbody>
						<tr>
							<th>Price</th>
							<th>Amount {currencyFrom ? ', ' + currencyFrom : ''}</th>
							<th>Volume {currencyTo ? ', ' + currencyTo : ''}</th>
						</tr>
						{data.length > 0 &&
							data.map((item, index) => (
								<tr className="item" key={index} onClick={(e) => onSelect(item.price, e)}>
									<td>{item.price}</td>
									<td>{(+item.amount || 0).toFixed(leftCurrencyDecimals) || 0}</td>
									<td>{(+item.volume || 0).toFixed(rightCurrencyDecimals) || 0}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			{showSwapIcon && (
				<div className={'swap-exchange-blocks'} onClick={() => handleSwapBlocks()}>
					<img src="/img/dashboard/swap.svg" alt="" />
				</div>
			)}
		</div>
	);
};
