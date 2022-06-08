import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Loader } from 'core/components/Loader';
import { fetchGetTradingHistory } from '../tradingSlice';
import { toDecimals } from 'utils/toDecimals';

export const TradeHistory = ({ currentTicker }) => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const { tradeHistoryAvailableMore: availableMore, tradingHistoryFetching: isFetching, tradeHistory } = useSelector(
		(state) => state.trading
	);

	const { user } = useSelector((state) => state.global);

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	if (nextProps.currentTicker !== prevState.currentTicker) {
	// 		return {
	// 			currentPage: 1,
	// 			currentTicker: nextProps.currentTicker,
	// 		};
	// 	}

	// 	return {};
	// }

	const handleShowMoreClick = (e) => {
		e.preventDefault();
		if (availableMore) {
			const nextPage = currentPage + 1;
			dispatch(fetchGetTradingHistory(currentTicker, nextPage));
			setCurrentPage(nextPage);
		}
	};

	const handleShowLessClick = (e) => {
		e.preventDefault();
		dispatch(fetchGetTradingHistory(currentTicker, 1));
		setCurrentPage(1);
	};
	const accuracy = 8;
	const data = tradeHistory?.length > 0;
	const showLessButton = tradeHistory.length > 20;
	const isMobileWidth = window.innerWidth < 700;
	const dateFormatStr = isMobileWidth ? 'L LT' : 'MMMM Do YYYY, h:mm:ss a';

	return (
		<div className="trade-history col-md-16">
			<p className="name">Trade history</p>
			{isFetching && <Loader />}
			{currentTicker && (
				<div className={'trade-history__table-container' + (isFetching ? ' blur' : '')}>
					<table>
						<tbody>
							<tr>
								<th>Type</th>
								<th className="date">Date</th>
								<th>Price, {currentTicker.currencyTo}</th>
								<th>Amount, {currentTicker.currencyFrom}</th>
								<th>Total, {currentTicker.currencyTo}</th>
							</tr>
							{data &&
								tradeHistory.map((item, index) => (
									<tr
										className={
											'item ' +
											(user.id === item.userIdFrom
												? item.isSellOrder
													? 'item--decrease'
													: 'item--increase'
												: !item.isSellOrder
												? 'item--decrease'
												: 'item--increase')
										}
										key={index}
									>
										<td>
											{user.id === item.userIdFrom
												? item.isSellOrder
													? 'Sell'
													: 'Buy'
												: !item.isSellOrder
												? 'Sell'
												: 'Buy'}
										</td>
										<td className="date">{moment(item.createDate).format(dateFormatStr)}</td>
										<td>{item.price}</td>
										<td>
											{item.amount} (Fee: {item.fee.toFixed(8)})
										</td>
										<td>{toDecimals(+(item.price * item.amount), accuracy)}</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			)}
			{!isFetching && (
				<div className="trade-history__buttons">
					{showLessButton && (
						<button
							className="btn btn-primary trade-history__button trade-history__button--less"
							onClick={handleShowLessClick}
						></button>
					)}
					{availableMore && (
						<button
							className="btn btn-primary trade-history__button trade-history__button--more"
							onClick={handleShowMoreClick}
						></button>
					)}
				</div>
			)}
		</div>
	);
};
