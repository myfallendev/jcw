const initialState = {
	accounts: [],
	currentAccount: {},

	accountListOpened: false,
	rightMenuAccountListOpened: true,

	balances: [],
	
	fetching: false,
	errors: [],

	senderAccount: {},
	senderAccountListOpened: false,
	receiverAccount: {},
	receiverAccountListOpened: false,

	ratePair: {},
	fetchingRatePair: false,

	fiatRatePair: {},
	fetchingFiatRatePair: false,

	currencyRates: [],
	fetchingCurrencyRates: false,

	walletEvents: [],
	fetchingWalletEvents: false,

	cryptoAddress: {},
	fetchingCryptoAddress: false,

	fetchingMoonpayUrl: false,
	errorMoonpayUrl: null,

	tradingPairs: [],

	fetchingPaymentRequest: false,
	fetchingWithdrawToWallet: false,

	showConfirmationPopup: false,

	showWithdrawCompletePopup: false,

	paymentDone: false,
	completeWithdrawToWallet: false,
	showZeroAccounts: !localStorage.getItem('show_zero_accounts')
		? true
		: localStorage.getItem('show_zero_accounts') === 'true',

	WithdrawToWalletCodeRequest: false,
	WithdrawToWalletCodeComplete: false,
	WithdrawToWalletCodeValue: '',
	WithdrawToWalletCodeRequestType: 0,
	fetchWithdraw: false,
	showVerificationCodeErrorMsg: false,
	showWithdrawFailedPopup: false,
	showVerificationCodeError500Msg: false,
	operators: [],
	fee: [],
	feeFetching: false,
	autoConversionPairs: null,
	//transferByPhone
	transferByPhoneVerificationType: 0,
	transferByPhoneCodeRequest: false,
	transferByPhoneSuccess: false,
	showTransferByPhoneFailedPopup: false,
};

export default function accounts(state = initialState, action) {
	switch (action.type) {
		case 'REQUEST_ACCOUNTS':
			return { ...state, fetching: true };

		case 'RECEIVE_ACCOUNTS':
			return { ...state, accounts: action.accounts, balances: action.balances, fetching: false };

		case 'REQUEST_CRYPTO_ADDRESS':
			return { ...state, fetchingCryptoAddress: true };
		case 'FAILED_GET_CRYPTO_ADDRESS':
			return { ...state, errors: action.payload.errors, fetchingCryptoAddress: false };
		case 'RECEIVE_CRYPTO_ACCOUNT_ADDRESS':
			return {
				...state,
				cryptoAddress: action.payload.cryptoAddress,
				qrUrl: action.payload.qrUrl,
				fetchingCryptoAddress: false,
			};

		case 'CHANGE_ACCOUNT_LIST_STATUS':
			return { ...state, accountListOpened: action.accountListOpened };

		case 'CHANGE_CURRENT_ACCOUNT':
			return { ...state, currentAccount: action.account };

		case 'RESET_CURRENT_ACCOUNT':
			return { ...state, currentAccount: {} };

		case 'TOGGLE_ACCOUNT_LIST':
			return { ...state, rightMenuAccountListOpened: !state.rightMenuAccountListOpened };

		case 'CHANGE_SENDER_ACCOUNT_LIST_STATUS':
			return { ...state, senderAccountListOpened: action.senderAccountListOpened };

		case 'CHANGE_SENDER_ACCOUNT':
			return { ...state, senderAccount: action.account };

		case 'CHANGE_RECEIVER_ACCOUNT_LIST_STATUS':
			return { ...state, receiverAccountListOpened: action.receiverAccountListOpened };

		case 'CHANGE_RECEIVER_ACCOUNT':
			return { ...state, receiverAccount: action.account };

		case 'RESET_ACCOUNTS':
			return {
				...state,
				receiverAccount: {},
				senderAccount: {},
				senderAccountListOpened: false,
				receiverAccountListOpened: false,
			};

		case 'REQUEST_ACCOUNT_PAYMENT':
			return { ...state, fetchingPaymentRequest: true };

		case 'ACCOUNT_PAYMENT_ERROR':
			return { ...state, fetchingPaymentRequest: false };

		case 'COMPLETE_ACCOUNT_PAYMENT':
			return { ...state, fetchingPaymentRequest: false, showConfirmationPopup: true, paymentDone: true };

		case 'CLOSE_CONFIRMATION_POPUP':
			return { ...state, showConfirmationPopup: false, paymentDone: false };

		case 'REQUEST_CURRENCY_RATES':
			return { ...state, fetchingCurrencyRates: true };

		case 'RECEIVE_CURRENCY_RATES':
			return { ...state, fetchingCurrencyRates: false, currencyRates: action.rates };

		case 'REQUEST_CURRENCY_RATE_PAIR':
			return { ...state, fetchingRatePair: true, ratePairError: null };

		case 'RECEIVE_CURRENCY_RATE_PAIR':
			return {
				...state,
				fetchingRatePair: false,
				ratePair: action.ratePair,
			};

		case 'RECEIVE_CURRENCY_RATE_PAIR_ERROR':
			return { ...state, fetchingRatePair: false, ratePairError: action.result, ratePair: {} };

		case 'REQUEST_WALLET_EVENTS':
			return { ...state, fetchingWalletEvents: true };

		case 'RECEIVE_WALLET_EVENTS':
			return { ...state, fetchingWalletEvents: false, walletEvents: action.events };

		case 'CLOSE_WITHDRAW_TO_WALLET_COMPLETE_POPUP':
			return { ...state, showWithdrawCompletePopup: false, transferByPhoneSuccess: false };

		case 'REQUEST_WITHDRAW_TO_WALLET':
			return { ...state, fetchingWithdrawToWallet: true };

		case 'COMPLETE_WITHDRAW_TO_WALLET':
			return {
				...state,
				fetchingWithdrawToWallet: false,
				showWalletTransfersPopup: false,
				showWithdrawCompletePopup: true,
				withdrawResponse: action.response,
			};

		case 'TOGGLE_ZERO_BALANCES':
			return { ...state, showZeroAccounts: action.val };

		case 'WITHDRAW_TO_WALLET_CODE_REQUEST':
			return {
				...state,
				WithdrawToWalletCodeRequest: true,
				WithdrawToWalletCodeRequestType: action.WithdrawToWalletCodeRequestType,
			};
		case 'WITHDRAW_TO_WALLET_CODE_COMPLETE':
			return { ...state, WithdrawToWalletCodeComplete: true };

		case 'WITHDRAW_TO_WALLET_CODE_TRANSACTION_ID':
			return { ...state, WithdrawToWalletCodeValue: action.withdrawTransactionId };

		case 'WITHDRAW_TO_WALLET_CODE_RESET':
			return {
				...state,
				WithdrawToWalletCodeRequest: false,
				WithdrawToWalletCodeComplete: false,
				WithdrawToWalletCodeValue: '',
			};
		case 'FETCH_WITHDRAW_START': {
			return { ...state, fetchWithdraw: true };
		}
		case 'FETCH_WITHDRAW_COMPLETE': {
			return { ...state, fetchWithdraw: false };
		}
		case 'SHOW_VERIFICATION_CODE_ERROR_MSG': {
			return { ...state, fetching: false, showVerificationCodeErrorMsg: true };
		}
		case 'HIDE_VERIFICATION_CODE_ERROR_MSG': {
			return { ...state, showVerificationCodeErrorMsg: false };
		}
		case 'SHOW_VERIFICATION_CODE_ERROR500_MSG': {
			return { ...state, fetching: false, showVerificationCodeError500Msg: true };
		}
		case 'HIDE_VERIFICATION_CODE_ERROR500_MSG': {
			return { ...state, showVerificationCodeError500Msg: false };
		}
		case 'SHOW_WITHDRAW_FAILED_POPUP': {
			return {
				...state,
				showWithdrawFailedPopup: true,
				fetchingWithdrawToWallet: false,
				showWalletTransfersPopup: false,
				showWithdrawCompletePopup: false,
				withdrawResponse: action.response,
			};
		}
		case 'HIDE_WITHDRAW_FAILED_POPUP': {
			return { ...state, showWithdrawFailedPopup: false };
		}
		case 'REQUEST_OPERATORS': {
			return { ...state, fetching: true };
		}
		case 'SUCCESS_OPERATORS': {
			return { ...state, fetching: false, operators: action.payload };
		}
		case 'GET_FEE': {
			return { ...state, fee: action.payload };
		}

		case 'SET_FEE_FETCHING': {
			return { ...state, feeFetching: action.payload };
		}

		case 'STOP_FETCHING':
			return { ...state, fetching: false };

		case 'RESET_ACCOUNTS_DATA':
			return { ...initialState };

		case 'SET_TRADING_PAIRS': {
			return { ...state, tradingPairs: action.payload };
		}

		case 'GET_AUTOCONVERSION_PAIRS': {
			return { ...state, autoConversionPairs: action.payload };
		}

		case 'REQUEST_FIAT_PAIR_CURRENCY_RATE':
			return {
				...state,
				fetchingFiatRatePair: true,
			};
		case 'RECEIVE_FIAT_PAIR_CURRENCY_RATE':
			return {
				...state,
				fetchingFiatRatePair: false,
				fiatRatePair: action.rate,
			};
		case 'REQUEST_MOONPAY_URL':
			return { ...state, fetchingMoonpayUrl: true };
		case 'FAILED_MOONPAY_URL':
			return { ...state, errorMoonpayUrl: action.data, fetchingMoonpayUrl: false };
		case 'REQUEST_TRANSFER_BY_PHONE':
			return { ...state, fetching: true };
		case 'FAILED_TRANSFER_BY_PHONE':
			return { ...state, fetching: false, errors: action.errors };
		case 'TRANSFER_BY_PHONE_CODE_REQUEST':
			const { transferByPhoneVerificationType } = action;
			return {
				...state,
				fetching: false,
				transferByPhoneCodeRequest: true,
				transferByPhoneVerificationType,
				errors: [],
			};
		case 'TRANSFER_BY_PHONE_CODE_RESET':
			return { ...state, transferByPhoneCodeRequest: false, transferByPhoneSuccess: false };
		case 'REQUEST_TRANSFER_BY_PHONE_COMMIT':
			return { ...state, fetching: true };
		case 'SHOW_TRANSFER_BY_PHONE_FAILED_POPUP':
			return {
				...state,
				showTransferByPhoneFailedPopup: true,
				fetching: false,
				transferByPhoneCodeRequest: false,
				showWalletTransfersPopup: false,
				withdrawResponse: action.response,
			};
		case 'HIDE_TRANSFER_BY_PHONE_FAILED_POPUP': {
			return { ...state, showTransferByPhoneFailedPopup: false };
		}
		case 'SUCCESS_TRANSFER_BY_PHONE_COMMIT': {
			return {
				...state,
				fetching: false,
				showWalletTransfersPopup: false,
				transferByPhoneCodeRequest: false,
				transferByPhoneSuccess: true,
				withdrawResponse: action.response,
			};
		}
		default:
			return state;
	}
}
