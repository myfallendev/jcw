import { createSlice } from '@reduxjs/toolkit';
import { getWalletEvents } from 'api/userAccount';
import { getFiatOrders } from 'api/fiatWithdraw';
const initialState = {
	events: [],
	fiatOrders: [],
	fetching: false,
	errors: [],
};

const walletEventsSlice = createSlice({
	name: 'WALLET_EVENTS',
	initialState,
	reducers: {
		getWalletEventsStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getWalletEventsFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getWalletEventsSuccess: (state, action) => {
			state.fetching = false;
			state.events = action.payload;
		},
		getFiatOrdersStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getFiatOrdersFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getFiatOrdersSuccess: (state, action) => {
			state.fetching = false;
			state.fiatOrders = action.payload;
		},
	},
});

export const {
	getWalletEventsStart,
	getWalletEventsFailed,
	getWalletEventsSuccess,
	getFiatOrdersStart,
	getFiatOrdersFailed,
	getFiatOrdersSuccess,
} = walletEventsSlice.actions;
export default walletEventsSlice.reducer;

export const fetchWalletEvents = () => async (dispatch) => {
	try {
		dispatch(getWalletEventsStart());
		const { data } = await getWalletEvents();
		if (data.errorCode) {
			return dispatch(getWalletEventsFailed(data.errors));
		}
		dispatch(getWalletEventsSuccess(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchFiatOrders = (page = 1, items = 100) => async (dispatch) => {
	try {
		dispatch(getFiatOrdersStart());
		const { data } = await getFiatOrders(page, items);
		data.errorCode ? dispatch(getFiatOrdersFailed(data.errors)) : dispatch(getFiatOrdersSuccess(data.response));
	} catch (err) {
		console.error(err);
	}
};
