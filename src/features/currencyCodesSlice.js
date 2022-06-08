import { createSlice } from '@reduxjs/toolkit';
import { getCurrencyCodes } from 'api/currencyCode';
import staticCurrencyCodes from '../utils/staticCurrencyCodes';

const initialState = {
	codes: staticCurrencyCodes,
	codesFromApi: false,
	fetching: false,
	errors: [],
};

const currencyCodesSlice = createSlice({
	name: 'CURRENCY_CODES',
	initialState,
	reducers: {
		getCurrencyCodesStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getCurrencyCodesFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getCurrencyCodesSuccess: (state, action) => {
			state.fetching = false;
			state.codes = action.payload;
			state.codesFromApi = true;
		},
	},
});

export const { getCurrencyCodesStart, getCurrencyCodesFailed, getCurrencyCodesSuccess } = currencyCodesSlice.actions;

export default currencyCodesSlice.reducer;

export const fetchCurrencyCodes = () => async (dispatch) => {
	try {
		dispatch(getCurrencyCodesStart());
		const { data } = await getCurrencyCodes();
		if (data.errorCode) {
			return dispatch(getCurrencyCodesFailed(data.errors));
		}
		dispatch(getCurrencyCodesSuccess(data));
	} catch (err) {
		console.error(err);
	}
};
