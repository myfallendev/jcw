const createFiatCodesDictionary = (fiatArr, dictArr) => {
	return fiatArr.map((name) => {
		return dictArr.find((currency) => currency.isoName === name);
	});
};
export default createFiatCodesDictionary;
