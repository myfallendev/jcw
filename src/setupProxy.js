const { createProxyMiddleware } = require('http-proxy-middleware');

const handleResponse = (response) => {
	Object.keys(response.headers).forEach((key) => {
		if (key === 'set-cookie' && response.headers[key]) {
			for (let i = 0; i < response.headers[key].length; i++) {
				response.headers[key][i] = response.headers[key][i]
					.replace('.jetcrypto.com;', 'localhost:3000')
					.replace(/httponly;?/i, '')
					.replace(/secure;?/i, '');
			}
		}
	});
};

module.exports = function (app) {
	app.use(
		['/api/signalr'],
		createProxyMiddleware({
			target: 'https://beta.jetcrypto.com/',
			ws: true,
			secure: false,
			changeOrigin: true,
			onProxyRes: handleResponse,
		})
	);
	app.use(
		['/api', '/qr', '/avatar'],
		createProxyMiddleware({
			target: 'https://beta.jetcrypto.com/',
			//target: 'http://10.49.2.54:2001/',
			secure: false,
			changeOrigin: true,
			onProxyRes: handleResponse,
		})
	);
};
