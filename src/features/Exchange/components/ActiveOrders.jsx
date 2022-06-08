//import { bindActionCreators } from 'redux';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRemoveOrder } from '../tradingSlice';

//import * as exchangeActions from 'actions/ExchangeActions';

import { Loader } from 'core/components/Loader';
import moment from 'moment';

import _groupBy from 'lodash/groupBy';
import _toPairs from 'lodash/toPairs';

import createToastMessage from 'utils/createToastMessage';

export const ActiveOrders = ({ currentTicker, type = 'My open orders', pairsFilter, activeLanguage }) => {
	const dispatch = useDispatch();
	const [isExpandView, setExpandView] = useState(false);
	const [currentPairOrders, setCurrentPairOrders] = useState([]);
	const [otherOrders, setOtherOrders] = useState([]);
	const { activeOrders, activeOrdersFetching, removeOrderFetching } = useSelector((state) => state.trading);
	const { errors, activeLanguage: currentLanguage } = useSelector((state) => state.language);

	useEffect(() => {
		if (activeOrders?.length) {
			const arr = activeOrders.map(
				(item) => ({ ...item, name: `${item.currencyFrom}/${item.currencyTo}` })
				//Object.assign(item, { name: '' + item.currencyFrom + '/' + item.currencyTo })
			);
			const groupped = _groupBy(arr, (item) => item.name);
			const oOrders = _toPairs(groupped).filter((item) => {
				if (pairsFilter) {
					return item[0] !== pairName && item[0].search(pairsFilter) !== -1;
				} else {
					return item[0] !== pairName;
				}
			});
			setCurrentPairOrders(groupped[pairName] || []);
			setOtherOrders(oOrders);
		}
	}, [activeOrders]);

	const removeActiveOrderClick = (item, e) => {
		e.preventDefault();

		const postObject = {
			id: item.id,
			currencyFrom: item.currencyFrom,
			currencyTo: item.currencyTo,
		};

		dispatch(
			fetchRemoveOrder(postObject, currentTicker, (succeed) => {
				const errorMessage = errors[currentLanguage]['try_later'];
				const message = succeed
					? 'Order #' + item.id + ' ' + item.currencyFrom + '/' + item.currencyTo + ' successfully removed'
					: errorMessage;

				createToastMessage(message, succeed ? 'info' : 'error');
			})
		);
	};

	const isFetching = activeOrdersFetching || removeOrderFetching;

	const pairName =
		currentTicker && currentTicker.currencyFrom && currentTicker.currencyTo
			? '' + currentTicker.currencyFrom + '/' + currentTicker.currencyTo
			: '';

	const bodyWidth = document.body.offsetWidth;
	const isMobileWidth = bodyWidth < 500;

	return (
		<div className="active-orders">
			{isMobileWidth && (
				<button
					className={
						'btn btn-primary active-orders__expand-button ' +
						(isExpandView ? 'active-orders__expand-button--collapse' : 'active-orders__expand-button--expand')
					}
					onClick={() => setExpandView((state) => !state)}
				></button>
			)}
			<p className="name">
				{type} {pairName || ''}
			</p>
			{isFetching && <Loader />}
			{currentPairOrders.length ? (
				<div className={'current-pair-orders' + (isFetching ? ' blur' : '')}>
					<OrdersTable
						onDeleteClick={removeActiveOrderClick}
						onExpandClick={() => setExpandView((state) => !state)}
						data={currentPairOrders}
						isExpandView={isExpandView}
					/>
				</div>
			) : (
				<p className="active-orders__no-orders-text">{activeLanguage.noActiveOrders}</p>
			)}
			{otherOrders.length > 0 && (
				<div className={'other-orders' + (isFetching ? ' blur' : '')}>
					<h4 className="other-orders__title">Other orders</h4>
					{otherOrders.map((supItem, supIndex) => {
						if (!supItem[1] || !supItem[1].length) return null;

						return (
							<div className="other-orders__item" key={supIndex}>
								<p className="other-orders__subtitle">{supItem[0]}</p>
								<OrdersTable onDeleteClick={removeActiveOrderClick} data={supItem[1]} />
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

const OrdersTable = ({ data, isExpandView, onDeleteClick }) => {
	return (
		<table>
			<tbody>
				<tr>
					<th>Type</th>
					<th>Price</th>
					{isExpandView && <th>Volume</th>}
					<th>Volume left</th>
					{isExpandView && <th className="time">Time</th>}
					<th></th>
				</tr>
				{data.length > 0 &&
					data.map((item, index) => (
						<tr className="item" key={index}>
							<td>{item.isSellOrder ? 'Sell' : 'Buy'}</td>
							<td>{item.price}</td>
							{isExpandView && <td>{item.initialAmount}</td>}
							<td>{item.amountLeft}</td>
							{isExpandView && <td className="time">{moment(item.createDate).format('LT')}</td>}
							<td>
								<button className="active-orders__cancel-button" onClick={(e) => onDeleteClick(item, e)}></button>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};
