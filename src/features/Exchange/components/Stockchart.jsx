import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import { ChartCanvas, Chart, ZoomButtons } from 'react-stockcharts';
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } from 'react-stockcharts/lib/coordinates';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip';
import { last } from 'react-stockcharts/lib/utils';

import { fetchGetChartData } from '../tradingSlice';

import { Loader } from 'core/components/Loader';

export const Stockchart = ({
	updateExchangeData,
	currentTicker,
	ratio = 1,
	type = 'hybrid',
	mouseMoveEvent,
	panEvent,
	zoomEvent,
	zoomAnchor,
	clamp,
}) => {
	const dispatch = useDispatch();
	const { chartData, fetching } = useSelector((state) => state.trading);

	const handleResetClick = () => {
		dispatch(fetchGetChartData(currentTicker));
	};

	const bodyWidth = document.body.offsetWidth;
	const width =
		bodyWidth > 1300
			? Math.floor((bodyWidth - 80) * 0.8 - 220 - 80)
			: bodyWidth > 450
			? bodyWidth * 0.9
			: bodyWidth - 40;
	const pairName = currentTicker ? '' + currentTicker.currencyFrom + '/' + currentTicker.currencyTo : '';
	const isMobileWidth = bodyWidth < 450;

	if (fetching) {
		return <Loader />;
	} else if (!chartData || chartData.length < 2) {
		return (
			<div className="trading-view__no-data">
				<span>No data </span>
				<button className="btn btn-primary btn-refresh" onClick={() => updateExchangeData(currentTicker)}></button>
			</div>
		);
	}

	const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => new Date(d.date));

	const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(chartData);

	const start = xAccessor(last(data));
	const end = xAccessor(data[Math.max(0, data.length - 150)]);
	const xExtents = [start + 2, end];

	const margin = { left: 20, right: 20, top: 20, bottom: 20 };

	const height = 500;

	const gridHeight = height - margin.top - margin.bottom;
	const gridWidth = width - margin.left - margin.right;

	const showGrid = true;
	const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {};
	const xGrid = showGrid ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 } : {};

	return (
		<ChartCanvas
			//ref={this.saveNode}
			width={width}
			height={height}
			ratio={ratio}
			margin={{ left: isMobileWidth ? 20 : 70, right: 80, top: 10, bottom: 30 }}
			seriesName={pairName || ''}
			mouseMoveEvent={mouseMoveEvent}
			panEvent={panEvent}
			zoomEvent={zoomEvent}
			clamp={clamp}
			zoomAnchor={zoomAnchor}
			type={type}
			data={data}
			xScale={xScale}
			xExtents={xExtents}
			xAccessor={xAccessor}
			displayXAccessor={displayXAccessor}
		>
			<Chart id={1} height={350} yExtents={(d) => [d.high * 1.1, d.low * 0.9]}>
				<XAxis axisAt="bottom" orient="bottom" zoomEnabled={zoomEvent} {...xGrid} />
				<YAxis axisAt="right" orient="right" ticks={5} zoomEnabled={zoomEvent} tickFormat={format('.8f')} {...yGrid} />

				<MouseCoordinateY at="right" orient="right" displayFormat={format('.8f')} />

				<CandlestickSeries
					opacity={1}
					stroke={(d) => (d.close > d.open ? '#7baefc' : '#e83d39')}
					wickStroke={(d) => (d.close > d.open ? '#7baefc' : '#e83d39')}
					fill={(d) => (d.close > d.open ? '#7baefc' : '#e83d39')}
				/>
				<OHLCTooltip origin={[-7, -7]} ohlcFormat={format(isMobileWidth ? '.4f' : '.8f')} />
				<ZoomButtons onReset={handleResetClick} />
			</Chart>
			<Chart id={2} yExtents={(d) => d.volume * 1.5} origin={(w, h) => [0, h - 90]} height={90}>
				<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format('.2s')} zoomEnabled={zoomEvent} />

				<MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat('%Y-%m-%d %I:%M')} />
				<MouseCoordinateY at="left" orient="left" displayFormat={format('.2s')} />
				<XAxis axisAt="bottom" orient="bottom" />

				<BarSeries yAccessor={(d) => d.volume} fill={(d) => (d.close > d.open ? '#7baefc' : '#e83d39')} />
			</Chart>

			<CrossHairCursor />
		</ChartCanvas>
	);
};
