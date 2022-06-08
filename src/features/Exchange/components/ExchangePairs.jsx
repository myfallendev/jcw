import React from 'react';
import { Loader } from 'core/components/Loader';

export const ExchangePairs = ({
	pairsAreFetching,
	pairsFilter,
	handleFilterTyping,
	resetFilter,
	filteredPairs,
	currentTicker,
	onSelect,
}) => {
	const itemIsCurrent = (item) => {
		return item.currencyFrom === currentTicker.currencyFrom && item.currencyTo === currentTicker.currencyTo;
	};
	return (
		<div className="exchange-page__pairs-container exchange-pairs">
			{pairsAreFetching && <Loader />}
			<p className="exchange-pairs__title">Pairs</p>
			<ul className="exchange-pairs__list">
				{filteredPairs.length > 0 &&
					currentTicker &&
					filteredPairs.map((item, index) => (
						<li key={index} className="exchange-pairs__item">
							<button
								className={
									'btn btn-orange exchange-pairs__button' +
									(itemIsCurrent(item) ? ' exchange-pairs__button--current' : '')
								}
								onClick={() => onSelect(item)}
							>
								{item.currencyFrom + ' / ' + item.currencyTo}
							</button>
						</li>
					))}
			</ul>
			<div className="exchange-pairs__filter-container">
				{pairsFilter && filteredPairs.length > 0 && (
					<button className="btn btn-prime btn-close exchange-pairs__filter-button" onClick={resetFilter}></button>
				)}
				<input
					value={pairsFilter}
					type="text"
					placeholder="filter"
					className="exchange-pairs__filter-input"
					onChange={handleFilterTyping}
				/>
			</div>
		</div>
	);
};
