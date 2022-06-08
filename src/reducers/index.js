import { combineReducers } from 'redux';

//import user from './user';
import accounts from './accounts';
import account_events from './accountevents';
//import currencies from './currencies';
//import userSettings from './userSettings';
//import balances from './balances';
//import payments from './payments';
//import support from './support';
//import exchange from './exchange';
import language from './language';
//import changePin from './changePin';

import globalReducer from 'core/globalSlice';
import simplexFormReducer from 'features/Home/components/SimplexForm/simplexSlice';
import withdrawFormReducer from 'features/Home/components/WithdrawForm/withdrawSlice';
import moonpayFormReducer from 'features/Home/components/MoonpayForm/moonpayFormSlice';
import phoneInputReducer from 'core/components/PhoneInput/phoneInputSlice';
import userSettingsReducer from 'features/PersonalPage/userSettingsSlice';
import currencyRatesReducer from 'features/currencyRatesSlice';
import currencyCodesReducer from 'features/currencyCodesSlice';
import walletEventsReducer from 'features/Home/walletEventsSlice';
import accountsReducer from 'features/accountsSlice';
import feesReducer from 'features/feesSlice';
import tradingReducer from 'features/Exchange/tradingSlice';
import changePinReducer from 'features/PersonalPage/screens/MySecurity/changePinSlice';
import googleAuthReducer from 'features/PersonalPage/screens/MySecurity/googleAuthSlice';
import faqReducer from 'features/FAQ/faqSlice';

export default combineReducers({
	//user,
	accounts,
	account_events,
	//currencies,
	//userSettings,
	//balances,
	//payments,
	//support,
	//exchange,
	language,
	global: globalReducer,
	changePin: changePinReducer,
	simplex: simplexFormReducer,
	withdraw: withdrawFormReducer,
	moonpay: moonpayFormReducer,
	phoneInput: phoneInputReducer,
	newUserSettings: userSettingsReducer,
	currencyRates: currencyRatesReducer,
	currencyCodes: currencyCodesReducer,
	walletEvents: walletEventsReducer,
	newAccounts: accountsReducer,
	fees: feesReducer,
	trading: tradingReducer,
	googleAuth: googleAuthReducer,
	faq: faqReducer,
});
