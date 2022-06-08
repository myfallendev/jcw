import { createSlice } from '@reduxjs/toolkit';
import { getCfIp } from 'api/user';
import { countries } from 'country-data';
import { findNumbers as findPhoneNumbers } from 'libphonenumber-js';
import { getPhoneCodeFormItem } from './getPhoneCodeFormItem';

const getFilteredCountries = (countries, value) => {
	if (value.length === 0) return countries;

	let text = value.toLowerCase().replace(/[^a-zA-Z\s]/gi, '');
	let phoneNumber = value.replace(/[^0-9]/gi, '');

	if (!(text.length || phoneNumber.length)) return countries;

	return countries.filter((item) => {
		if (text.length > 0) return 0 === item.name.toLowerCase().search(text);

		return item.countryCallingCodes.some((subItem) => 1 === subItem.search(phoneNumber));
	});
};

const defaultCountry = countries['AT'];

const initialState = {
	selectedCountry: defaultCountry || {},
	allCountries: countries.all.slice(1).filter((item) => item.countryCallingCodes.length > 0),
	filteredCountries: countries.all.slice(1).filter((item) => item.countryCallingCodes.length > 0),
	showCountriesSelect: false,
	phoneInput: '',
	phoneIsValid: false,
};

const phoneInputSlice = createSlice({
	name: 'phoneInput',
	initialState,
	reducers: {
		cfIpFailed: (state) => {
			state.selectedCountry = defaultCountry;
		},
		cfIpSuccess: (state, action) => {
			const fCountry = state.allCountries.find((item) => item.alpha2 === action.payload);
			state.selectedCountry = fCountry;
			state.selectedCountry.phoneCode = getPhoneCodeFormItem(fCountry);
			state.selectedCountry.phone = '';
		},
		updateCountry: (state, action) => {
			const arr = findPhoneNumbers('+' + action.payload, state.selectedCountry.countryCode);
			if (!arr.length || !arr[0].country || arr[0].country === state.selectedCountry.countryCode) return;
			const countryItems = state.allCountries.filter((item) => item.alpha2 === arr[0].country);
			if (!countryItems.length) return;
			const item = countryItems[0];
			const phoneCode = getPhoneCodeFormItem(item);
			state.selectedCountry = item;
			state.selectedCountry.phoneCode = phoneCode;
			state.selectedCountry.phone = arr[0].phone;
		},
		setFilteredCountries: (state, action) => {
			state.filteredCountries = getFilteredCountries(state.allCountries, action.payload);
		},
		resetFilteredCountries: (state) => {
			state.filteredCountries = initialState.allCountries;
		},
		setCountry: (state, action) => {
			const fCountry = state.allCountries.find((item) => item.alpha2 === action.payload.alpha2);
			state.selectedCountry = fCountry;
			state.selectedCountry.phoneCode = getPhoneCodeFormItem(fCountry);
			state.selectedCountry.phone = '';
		},
		setShowCountriesSelect: (state, action) => {
			state.showCountriesSelect = action.payload;
		},
		setPhone: (state, action) => {
			state.phoneInput = action.payload;
		},
		setPhoneIsValid: (state, action) => {
			state.phoneIsValid = action.payload;
		},
		setCountryFromProps: (state, action) => {
			const fCountry = state.allCountries.find((item) => item.name === action.payload);
			state.selectedCountry = fCountry;
			state.selectedCountry.phoneCode = getPhoneCodeFormItem(fCountry);
			state.selectedCountry.phone = '';
		},
	},
});

export const {
	cfIpFailed,
	cfIpSuccess,
	setCountry,
	updateCountry,
	setFilteredCountries,
	resetFilteredCountries,
	setShowCountriesSelect,
	setPhone,
	setPhoneIsValid,
	setCountryFromProps,
} = phoneInputSlice.actions;

export default phoneInputSlice.reducer;

export const fetchCfIp = () => async (dispatch) => {
	try {
		const { data } = await getCfIp();
		dispatch(cfIpSuccess(data));
	} catch (err) {
		dispatch(cfIpFailed());
	}
};
