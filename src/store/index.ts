import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createHashHistory } from "history";
import rootReducer, { defaultState } from "../reducer";
import middlewares from "../middlewares";
import { routerMiddleware } from "connected-react-router";


export const history = createHashHistory();

// eslint-disable-next-line no-underscore-dangle
const devtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

export const store = (() => {
	const store = createStore(
		combineReducers({
			router: connectRouter(history),
			app: rootReducer(defaultState),
		}),
		compose(
			applyMiddleware(routerMiddleware(history), ...middlewares),
			...(process.env.NODE_ENV === "development" && devtools
				? [devtools()]
				: []),
		),
	);

	if ((module as any).hot) {
		// Enable Webpack hot module replacement for reducers
		(module as any).hot.accept('../reducer', () => {
		  const nextRootReducer = require('../reducer');
		  console.log(nextRootReducer)
		  store.replaceReducer(nextRootReducer);
		});
	  }

	return store;
	
})();
