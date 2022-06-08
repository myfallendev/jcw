import { createSlice } from '@reduxjs/toolkit';
import { getAccounts, getCryptoAddress, getAutoConversionPairs, setAutoConversionPair } from 'api/userAccount';
import { getOperators } from 'api/operators';

const initialState = {
	accounts: [],
	operators: [],

	fetchingCryptoAddress: false,
	cryptoAddress: '',
	qrUrl: null,

	showZeroBalances: !localStorage.getItem('show_zero_accounts')
		? true
		: localStorage.getItem('show_zero_accounts') === 'true',

	autoConversionPairs: null,

	fetching: false,
	errors: [],
};

const accountsSlice = createSlice({
	name: 'NEW_ACCOUNTS',
	initialState,
	reducers: {
		getAccountsStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getAccountsFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getAccountsSuccess: (state, action) => {
			state.fetching = false;
			state.accounts = action.payload;
		},
		getOperatorsStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getOperatorsFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getOperatorsSuccess: (state, action) => {
			state.fetching = false;
			state.operators = action.payload;
		},
		getCryptoAddressStart: (state) => {
			state.fetchingCryptoAddress = true;
			state.errors = [];
		},
		getCryptoAddressFailed: (state, action) => {
			state.fetchingCryptoAddress = false;
			state.errors = action.payload;
		},
		getCryptoAddressSuccess: (state, action) => {
			state.fetchingCryptoAddress = false;
			state.cryptoAddress = action.payload.cryptoAddress;
			state.qrUrl = action.payload.qrUrl;
		},
		toggleZeroBalances: (state) => {
			localStorage.setItem('show_zero_accounts', (!state.showZeroBalances).toString());
			state.showZeroBalances = !state.showZeroBalances;
		},
		getAutoConversionPairsStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		getAutoConversionPairsFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		getAutoConversionPairsSuccess: (state, action) => {
			state.fetching = false;
			state.autoConversionPairs = action.payload;
		},
		setAutoConversionPairStart: (state) => {
			state.fetching = true;
			state.errors = [];
		},
		setAutoConversionPairFailed: (state, action) => {
			state.fetching = false;
			state.errors = action.payload;
		},
		setAutoConversionPairSuccess: (state) => {
			state.fetching = false;
		},
	},
});

export default accountsSlice.reducer;
export const {
	getAccountsStart,
	getAccountsFailed,
	getAccountsSuccess,
	getOperatorsStart,
	getOperatorsFailed,
	getOperatorsSuccess,
	getCryptoAddressStart,
	getCryptoAddressFailed,
	getCryptoAddressSuccess,
	toggleZeroBalances,
	getAutoConversionPairsStart,
	getAutoConversionPairsFailed,
	getAutoConversionPairsSuccess,
	setAutoConversionPairStart,
	setAutoConversionPairFailed,
	setAutoConversionPairSuccess,
} = accountsSlice.actions;

export const fetchGetOperators = () => async (dispatch) => {
	try {
		dispatch(getOperatorsStart());
		const { data } = await getOperators();
		if (data.errorCode) {
			return dispatch(getOperatorsFailed(data.errors));
		}
		dispatch(getOperatorsSuccess(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetAccounts = () => async (dispatch) => {
	try {
		dispatch(getAccountsStart());
		const { data } = await getAccounts();
		if (data.errorCode) {
			return dispatch(getAccountsFailed(data.errors));
		}
		dispatch(getAccountsSuccess(data));
		dispatch(fetchGetOperators());
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetCryptoAddress = (accId) => async (dispatch) => {
	try {
		dispatch(getCryptoAddressStart());
		const { data } = await getCryptoAddress(accId);
		if (data.errorCode) {
			return dispatch(getCryptoAddressFailed(data.errors));
		}
		dispatch(getCryptoAddressSuccess(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchGetAutoConversionPairs = () => async (dispatch) => {
	try {
		dispatch(getAutoConversionPairsStart());
		const { data } = await getAutoConversionPairs();
		if (data.errorCode) {
			return dispatch(getAutoConversionPairsFailed(data.errors));
		}
		dispatch(getAutoConversionPairsSuccess(data));
	} catch (err) {
		console.error(err);
	}
};

export const fetchSetAutoConversionPair = (from, to, enabled) => async (dispatch) => {
	try {
		dispatch(setAutoConversionPairStart());
		const { data } = await setAutoConversionPair(from, to, enabled);
		if (data.errorCode) {
			return dispatch(setAutoConversionPairFailed(data.errors));
		}
		dispatch(setAutoConversionPairSuccess());
		dispatch(fetchGetAutoConversionPairs());
	} catch (err) {
		console.error(err);
	}
};
