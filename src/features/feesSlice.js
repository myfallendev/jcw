import { createSlice } from '@reduxjs/toolkit';
import { getFees } from 'api/fee';

const initialState = {
	fees: [],

	fetching: false,
	errors: [],
};

const feeSlice = createSlice({
	name: 'FEE',
	initialState,
	reducers: {
		getFeesStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getFeesFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getFeesSuccess: (state, action) => {
			state.fetching = false;
			state.fees = action.payload;
		},
	},
});

export default feeSlice.reducer;

export const { getFeesStart, getFeesFailed, getFeesSuccess } = feeSlice.actions;

export const fetchGetFees = () => async (dispatch, getState) => {
	try {
		dispatch(getFeesStart());
		const state = getState();
		let currencyIds = [];
		state.newAccounts.operators.forEach((item) => {
			if (item.currencyId !== null) currencyIds.push(item.currencyId);
		});
		const { data } = await getFees(currencyIds);
		if (data.errorCode) {
			return dispatch(getFeesFailed(data.errors));
		}
		dispatch(getFeesSuccess(data));
	} catch (err) {
		console.error(err);
	}
};
