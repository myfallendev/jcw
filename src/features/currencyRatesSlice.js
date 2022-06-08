import { createSlice } from '@reduxjs/toolkit';
import { currencyRatesForFiatCurrency } from 'api/currencyRate';

const initialState = {
	rates: [],
	fetching: false,
	errors: [],
};

const currencyRatesSlice = createSlice({
	name: 'CURRENCY_RATES',
	initialState,
	reducers: {
		currencyRatesForFiatCurrencyStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		currencyRatesForFiatCurrencyFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		currencyRatesForFiatCurrencySuccess: (state, action) => {
			state.fetching = false;
			state.rates = action.payload;
		},
	},
});

export default currencyRatesSlice.reducer;

export const {
	currencyRatesForFiatCurrencyStart,
	currencyRatesForFiatCurrencyFailed,
	currencyRatesForFiatCurrencySuccess,
} = currencyRatesSlice.actions;

export const fetchCurrencyRatesForFiatCurrency = (currencyId) => async (dispatch) => {
	try {
		dispatch(currencyRatesForFiatCurrencyStart());
		const { data } = await currencyRatesForFiatCurrency(currencyId);
		if (data.errorCode) {
			return dispatch(currencyRatesForFiatCurrencyFailed(data.errors));
		}
		dispatch(currencyRatesForFiatCurrencySuccess(data));
	} catch (err) {
		console.error(err);
	}
};
