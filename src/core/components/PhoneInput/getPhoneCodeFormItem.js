export const getPhoneCodeFormItem = (item) => {
	let codes = item.countryCallingCodes;
	let codesCount = codes.length;
	let phoneCode;

	if (codesCount > 1) {
		switch (item.alpha2) {
			case 'DO':
				phoneCode = '+18';
				break;
			case 'KZ':
				phoneCode = '+7';
				break;
			case 'PR':
				phoneCode = '+1';
				break;
			case 'RU':
				phoneCode = '+7';
				break;
			case 'VA':
				phoneCode = '+3';
				break;
			default:
				phoneCode = codes[0];
		}
	} else {
		phoneCode = codes[0];
	}

	return phoneCode;
};
