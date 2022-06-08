const isDevServer = window.location.hostname.includes('beta') || process.env.NODE_ENV === 'development';
export default isDevServer;
