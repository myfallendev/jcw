export const toDecimals = (amount, digits) => {
	return Math.floor(amount * Math.pow(10, digits)) / Math.pow(10, digits);
};
