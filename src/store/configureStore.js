//import { createStore, applyMiddleware } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
//import thunk from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
//import * as actionCreators from '../actions/AccountActions';

// const composeEnhancers =
// 	process.env.NODE_ENV === 'development'
// 		? composeWithDevTools({ actionCreators, trace: true, traceLimit: 25 })
// 		: composeWithDevTools({});

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		immutableCheck: { warnAfter: 75 },
		serializableCheck: { warnAfter: 75 }
	}),
});

if (module.hot) {
	module.hot.accept('../reducers', () => {
		const nextRootReducer = require('../reducers');
		store.replaceReducer(nextRootReducer);
	});
}

export default store;
