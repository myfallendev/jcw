import staticCurrencyCodes from '../utils/staticCurrencyCodes';

const initialState = {
	currency_codes: staticCurrencyCodes,
	currencyCodesFromApi: false,
};

export default function currencies(state = initialState, action) {
	switch (action.type) {
		case 'REQUEST_CURRENCY_CODES':
			return { ...state };

		case 'RECEIVE_CURRENCY_CODES':
			return {
				...state,
				currency_codes: action.currency_codes,
				currencyCodesFromApi: action.currencyCodesFromApi,
			};

		default:
			return state;
	}
}
