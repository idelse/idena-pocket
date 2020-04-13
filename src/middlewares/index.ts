import { Middleware } from "redux";

const asyncAction: Middleware = () => (next) => (action: any) => {
	if (action.result && action.result.then !== undefined && action.result.catch !== undefined) {
		action.result
			.then((result: any) => {
				next({
					type: action.type,
					result,
				});
			})
			.catch((error: any) => {
				next({
					type: `${action.type}_CATCH`,
					result: error,
				});
			});
		const { type, result, ...rest } = action;
		return next({ type: `${action.type}_REQUESTED`, ...rest });
	}
	return next(action);
};

const reactRouterProps: Middleware = () => (next) => (action: any) => next(action);

export default [
	asyncAction,
	reactRouterProps,
];
