const initialState = {
    deviceList: [],
    adminList: [],
    AddDeviceAdminFetch: false,
    currentDevice: null,
    devicesStatus: [],
    advancedCommandsGroups: [
        {
            id: 6,
            name: 'Point info',
            description: '',
        },
        {
            id: 7,
            name: 'Currency settings',
            description: '',
        },
        // {
        //     id: 1,
        //     name: 'Keys',
        //     description: '',
        // },
        {
            id: 2,
            name: 'Payments',
            description: '',
        },
        {
            id: 3,
            name: 'Interface',
            description: '',
        },
        {
            id: 4,
            name: 'Dispenser',
            description: '',
        },
        {
            id: 5,
            name: 'Inactivity timers',
            description: '',
        },

    ],
    advancedCommands: [
        // KEYS
        // {
        //     id: 11,
        //     groupId: 1,
        //     value: '', isXmlAttr: true,
        //     attr: 'public_key',
        //     defaultValue: '',
        //     type: 'string',
        //     command: `gateways.jetcrypto_wallet`,
        //     description: 'public_key',
        //     mask: /\w+/
        // },
        // {
        //     id: 12,
        //     groupId: 1,
        //     value: '', isXmlAttr: true,
        //     attr: 'private_key',
        //     defaultValue: '',
        //     type: 'string',
        //     command: `gateways.jetcrypto_wallet`,
        //     description: 'private_key',
        //     mask: /\w+/
        // },
        // PAYMENTS
        {
            id: 21,
            groupId: 2,
            value: false, isXmlAttr: true,
            attr: 'show_fee_rules',
            defaultValue: true,
            type: 'boolean',
            command: `payments`,
            description: 'Display fee calculation rules (max - 12 items)',
            mask: null
        },
        {
            id: 22,
            groupId: 2,
            value: '', isXmlAttr: true,
            attr: 'rates_source',
            type: 'select',
            defaultValue: ['jetcrypto', 'bittrex', 'poloniex', 'cryptocompare'],
            command: `payments`,
            description: 'Rates source for loading crypto currencies rates',
            mask: null
        },
        {
            id: 23,
            groupId: 2,
            value: true, isXmlAttr: false,
            attr: '',
            defaultValue: true,
            type: 'boolean',
            command: `payments.balance_control`,
            description: 'Check balance of the Trovemat owner wallets',
            mask: null
        },
        {
            id: 24,
            groupId: 2,
            value: '', isXmlAttr: false,
            attr: '',
            type: 'number',
            defaultValue: 10,
            command: `payments.limit_min`,
            description: 'Minimum value of purchase or cash withdrawal',
            mask: /^-?\d*\.?\d*$/
        },
        {
            id: 25,
            groupId: 2,
            value: '', isXmlAttr: false,
            attr: '',
            type: 'number',
            defaultValue: 1500,
            command: `payments.limit_max`,
            description: 'Maximum value of purchase or cash withdrawal',
            mask: /^-?\d*\.?\d*$/
        },
        {
            id: 26,
            groupId: 2,
            value: '', isXmlAttr: true,
            attr: 'rates_addendum',
            type: 'number',
            defaultValue: '',
            command: `payments`,
            description: 'Profit percent, that will be added to coins rate without notifying user about that',
            mask: /^-?\d*\.?\d*$/
        },
        {
            id: 27,
            groupId: 2,
            value: false, isXmlAttr: true,
            attr: 'do_not_show_real_balance_as_max_limit',
            defaultValue: false,
            type: 'boolean',
            command: `payments`,
            description: 'Hide owner real balance on money entry screen',
            mask: null
        },
        {
            id: 28,
            groupId: 2,
            value: false, isXmlAttr: true,
            attr: 'check_min_on_first_note',
            defaultValue: false,
            type: 'boolean',
            command: `payments`,
            description: 'Limit first accepted note to min accepted amount',
            mask: null
        },
        {
            id: 29,
            groupId: 2,
            value: true, isXmlAttr: true,
            attr: 'show_fee_amount',
            defaultValue: true,
            type: 'boolean',
            command: `payments`,
            description: 'Display calculated fee amount',
            mask: null
        },
        {
            id: 210,
            groupId: 2,
            value: '', isXmlAttr: true,
            attr: 'get_rates_interval',
            type: 'number',
            defaultValue: 300,
            command: `payments`,
            description: 'Interval in seconds for loading crypto currencies rates',
            mask: /^-?\d*\.?\d*$/
        },

        //INTERFACE
        {
            id: 31,
            groupId: 3,
            value: '', isXmlAttr: true,
            attr: 'lang',
            defaultValue: ['EN', 'DE', 'RU', 'ES', 'GE'],
            type: 'select',
            command: `interface`,
            description: 'Interface language',
            mask: /\w+/
        },
        {
            id: 32,
            groupId: 3,
            value: '', isXmlAttr: true,
            attr: 'default_phone_code',
            defaultValue: ["US", "AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AU", "AT", "AZ", "BY", "BE", "BA", "BG", "CA", "CL", "CN", "HR", "CY", "CZ", "DK", "EE", "ET", "FI", "FR", "GE", "GR", "DE", "HU", "IS", "IE", "IT", "KZ", "LV", "LI", "LT", "LU", "MK", "MT", "MD", "MC", "ME", "NL", "NZ", "NO", "PL", "PT", "RO", "RU", "SM", "RS", "SG", "SK", "SI", "ES", "SE", "CH", "TR", "UA", "GB"],
            type: 'select',
            command: `interface`,
            description: 'Default phone country code',
            mask: null
        },
        {
            id: 33,
            groupId: 3,
            value: true, isXmlAttr: true,
            attr: 'print_paper_wallet',
            defaultValue: true,
            type: 'boolean',
            command: `interface`,
            description: 'Show/hide "Print paper wallet" button on wallet scan screen',
            mask: null
        },
        {
            id: 34,
            groupId: 3,
            value: true, isXmlAttr: true,
            attr: 'vending',
            defaultValue: true,
            type: 'boolean',
            command: `interface.menu`,
            description: 'Enable cash acceptance on main screen',
            mask: null
        },
        {
            id: 35,
            groupId: 3,
            value: true, isXmlAttr: true,
            attr: 'input_wallet_manually',
            defaultValue: true,
            type: 'boolean',
            command: `interface`,
            description: 'Show/hide "Input wallet address manually" button on wallet scan screen',
            mask: null
        },
        //DISPENSER
        {
            id: 41,
            groupId: 4,
            value: '', isXmlAttr: true,
            attr: 'cassette_0',
            defaultValue: '',
            type: 'string',
            command: `peripherals.dispenser`,
            description: 'Note type in upper cassette (e.g. "10 USD")',
            mask: /\w+/
        },
        {
            id: 42,
            groupId: 4,
            value: '', isXmlAttr: true,
            attr: 'default_capacity_0',
            defaultValue: '',
            type: 'string',
            command: `peripherals.dispenser`,
            description: 'Default capacity to set in upper cassette',
            mask: /\w+/
        },
        {
            id: 43,
            groupId: 4,
            value: '', isXmlAttr: true,
            attr: 'cassette_1',
            defaultValue: '',
            type: 'string',
            command: `peripherals.dispenser`,
            description: 'Note type in lower cassette (e.g. "10 USD")',
            mask: /\w+/
        },
        {
            id: 44,
            groupId: 4,
            value: '', isXmlAttr: true,
            attr: 'default_capacity_1',
            defaultValue: '',
            type: 'string',
            command: `peripherals.dispenser`,
            description: 'Default capacity to set in lower cassette',
            mask: /\w+/
        },
        // INACTIVITY TIMERS
        {
            id: 51,
            groupId: 5,
            value: '', isXmlAttr: true,
            attr: 'data_entry',
            type: 'number',
            defaultValue: 120,
            command: `interface.inactivity_timer`,
            description: 'Inactivity timer value for data entry screen',
            mask: /^-?\d*\.?\d*$/
        },
        {
            id: 52,
            groupId: 5,
            value: '', isXmlAttr: true,
            attr: 'message',
            type: 'number',
            defaultValue: 120,
            command: `interface.inactivity_timer`,
            description: 'Inactivity timer value for message',
            mask: /^-?\d*\.?\d*$/
        },
        {
            id: 53,
            groupId: 5,
            value: '', isXmlAttr: true,
            attr: 'money_entry',
            type: 'number',
            defaultValue: 120,
            command: `interface.inactivity_timer`,
            description: 'Inactivity timer value for money entry screen',
            mask: /^-?\d*\.?\d*$/
        },
        {
            id: 54,
            groupId: 5,
            value: '', isXmlAttr: true,
            attr: 'service_menu',
            type: 'number',
            defaultValue: 120,
            command: `interface.inactivity_timer`,
            description: 'Inactivity timer value for service menu',
            mask: /^-?\d*\.?\d*$/
        },
        // POINT INFO
        {
            id: 65,
            groupId: 6,
            value: '', isXmlAttr: false,
            attr: '',
            type: 'string',
            defaultValue: 'Trovemat kiosk',
            command: `parameters.point_name`,
            description: 'Point name',
            mask: /\w+/
        },
        {
            id: 61,
            groupId: 6,
            value: '', isXmlAttr: true,
            attr: 'value',
            type: 'string',
            defaultValue: '',
            command: `point_info.dealer_phone`,
            description: 'Dealer phone',
            mask: /\w+/
        },
        {
            id: 62,
            groupId: 6,
            value: '', isXmlAttr: true,
            attr: 'value',
            type: 'string',
            defaultValue: '',
            command: `point_info.dealer_name`,
            description: 'Dealer name',
            mask: /\w+/
        },
        {
            id: 63,
            groupId: 6,
            value: '', isXmlAttr: true,
            attr: 'value',
            type: 'string',
            defaultValue: '',
            command: `point_info.dealer_address`,
            description: 'Dealer address',
            mask: /\w+/
        },
        {
            id: 64,
            groupId: 6,
            value: '', isXmlAttr: true,
            attr: 'value',
            type: 'string',
            defaultValue: '',
            command: `point_info.point_address`,
            description: 'Point address',
            mask: /\w+/
        },
        // CURRENCY SETTINGS
        {
            id: 71,
            groupId: 7,
            value: '', isXmlAttr: false,
            attr: '',
            defaultValue: ['USD', 'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EEK', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'STD', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'UYI', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'YER', 'ZAR', 'ZMK', 'ZWL'],
            type: 'select',
            command: `payments.currency`,
            description: 'Default currency',
            mask: null
        },
        {
            id: 72,
            groupId: 7,
            value: '', isXmlAttr: false,
            attr: '',
            type: 'number',
            defaultValue: 10,
            command: `payments.limit_min`,
            description: 'Limit min',
            mask: /^-?\d*\.?\d*$/
        },
        {
            id: 73,
            groupId: 7,
            value: '', isXmlAttr: false,
            attr: '',
            type: 'number',
            defaultValue: 1500,
            command: `payments.limit_max`,
            description: 'Limit max',
            mask: /^-?\d*\.?\d*$/
        },
        {
            id: 74,
            groupId: 7,
            value: '', isXmlAttr: true,
            attr: 'percent',
            type: 'number',
            defaultValue: 0,
            command: `payments.fee.part`,
            description: 'Trovemat owner profit, %',
            mask: /^-?\d*\.?\d*$/
        },
        {
            id: 75,
            groupId: 7,
            value: '', isXmlAttr: true,
            attr: 'fix',
            type: 'number',
            defaultValue: 0,
            command: `payments.fee.part`,
            description: 'Trovemat owner profit, fix',
            mask: /^-?\d*\.?\d*$/
        },
    ],
    advancedCommandFetching: false,
    deviceCommandFetching: false,
    deviceListFetching: false,
};

export default function device(state = initialState, action) {
    switch (action.type) {
        case 'SET_DEVICE_LIST':
            return {...state, deviceList: action.payload};
        case 'SET_CURRENT_DEVICE':
            return {...state, currentDevice: action.payload};
        case 'SET_DEVICE_STATUS':
            return {...state, deviceList: action.payload};
        case 'ADD_DEVICE_ADMIN':
            return {...state, adminList: action.value, AddDeviceAdminFetch: false};
        case 'ADD_DEVICE_ADMIN_FETCH':
            return {...state, AddDeviceAdminFetch: action.value};
        case 'RESET_DEVICE_DATA':
            return {...initialState};
        case 'SET_DEVICES_STATUS':
            return {...state, devicesStatus: action.payload};
        case 'SET_ADVANCED_COMMAND_FETCHING':
            return {...state, advancedCommandFetching: action.payload};
        case 'SWAP_GROUP_VISIBILITY':
            return {...state, advancedCommandsGroups: action.payload};
        case 'SET_DEVICE_COMMAND_FETCHING':
            return {...state, deviceCommandFetching: action.payload};
        case 'SET_DEVICE_LIST_FETCHING':
            return {...state, deviceListFetching: action.payload};

        default:
            return state
    }
}
