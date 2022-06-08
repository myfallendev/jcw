//Если у кошелька нет паттерна адреса, ставим null;
const walletMasks = [
	{ currencyId: 2001, isoName: 'BTC', pattern: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/ },
	{ currencyId: 2002, isoName: 'ETH', pattern: /^(0x)?([0-9A-Fa-f]{40})$/ },
	{ currencyId: 2003, isoName: 'LTC', pattern: /^[3LM][a-zA-Z0-9]{26,33}$/ },
	{ currencyId: 2005, isoName: 'XMR', pattern: null },
	{ currencyId: 2006, isoName: 'DASH', pattern: /^X[a-km-zA-HJ-NP-Z1-9]{33}$/ },
	{
		currencyId: 2007,
		isoName: 'XRP',
		pattern: /^r[rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz]{27,35}$/,
	},
	{
		currencyId: 2008,
		isoName: 'BCH',
		pattern: /^([13][a-km-zA-HJ-NP-Z1-9]{25,34})|^((q|p)[a-z0-9]{41})|^((Q|P)[A-Z0-9]{41})$/,
	},

	{ currencyId: 2009, isoName: 'ZEC', pattern: /^(t1[a-km-zA-HJ-NP-Z1-9]{33})|(zc[a-km-zA-HJ-NP-Z1-9]{93})$/ },
	{ currencyId: 2010, isoName: 'ETC', pattern: /^(0x)?([0-9A-Fa-f]{40})$/ },
	{ currencyId: 2011, isoName: 'XEM', pattern: /^N[A-Z2-7]{39}$/ },
	{
		currencyId: 2012,
		isoName: 'DOGE',
		pattern: /^r[rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz]{27,35}$/,
	},
	{ currencyId: 2016, isoName: 'USDC', pattern: /^(0x)?([0-9A-Fa-f]{40})$/ },
	{ currencyId: 2013, isoName: 'USDT', pattern: /^(0x)?([0-9A-Fa-f]{40})$/ },
	{ currencyId: 2023, isoName: 'BXN', pattern: /^(0x)?([0-9A-Fa-f]{40})$/ },
];

export default walletMasks;
