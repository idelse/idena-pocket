import {
	UPDATE_CREATION_WALLET_PASSWORD,
	UPDATE_SEED,
	UPDATE_ENCRYPTED_SEED,
	UNLOCK,
	LOCK,
	TOAST,
	SEND_TX,
	RESET,
	REFRESH,
	RETRIEVE_ENCRYPTED_SEED
} from "../actions";

export const defaultState: any = {
	encryptedSeed: "",
	currentAddress: "",
	privateKey: "",
	unlocked: false,
	balance: 0,
	transactions: [],
	price: 0,
	sending: false,
	toast: {
		message: "",
		type: "",
		autoclose: false,
	},
	creationWallet: {
		password: "",
		seed: [],
	},
};

export default (defaultState: any) => {
	return (state: any = defaultState, action: any): any => {
		switch (action.type) {
			case UPDATE_CREATION_WALLET_PASSWORD:
				return {
					...state,
					creationWallet: {
						...state.creationWallet,
						password: action.result,
					}
				};
			case UPDATE_SEED:
				return {
					...state,
					creationWallet: {
						...state.creationWallet,
						seed: action.result,
					}
				};
			case UPDATE_ENCRYPTED_SEED:
			case RETRIEVE_ENCRYPTED_SEED:
				return {
					...state,
					encryptedSeed: action.result.encryptedSeed,
					derivationPath: action.result.derivationPath,
				}
			case UNLOCK+'_REQUESTED':
				return {
					...state,
					toast: {
						type: "info",
						message: "Unlocking account",
						autoclose: false,
					}
				}
			case UNLOCK:
				return {
					...state,
					price: action.result.price,
					balance: action.result.balance,
					transactions: action.result.transactions,
					currentAddress: action.result.address,
					privateKey: action.result.privateKey,
					unlocked: true,
					toast: {}
				}
			case REFRESH+'_REQUESTED':
				return {
					...state,
					toast: action.showToast
						? {
							type: "info",
							message: "Refreshing",
							autoclose: true,
						}
						: state.toast,
				}
			case REFRESH:
				return {
					...state,
					price: action.result.price,
					balance: action.result.balance,
					transactions: (() => {
						const previousTransactions = state.transactions;
						const nextTransactions = action.result.transactions;
						const newTrasactions = nextTransactions.filter(currentNewTransaction => {
							const isNew = !previousTransactions
								.some(previousCurrentTransaction => previousCurrentTransaction.hash === currentNewTransaction.hash);
							return isNew;
						});
						return [
							...newTrasactions,
							...previousTransactions,
						].sort((a, b) => b.timestamp - a.timestamp);
					})(),
					currentAddress: action.result.address,
				}
			case SEND_TX+'_REQUESTED':
				return {
					...state,
					sending: true,
					transactions: [
						{
							from: state.currentAddress,
							...action.request,
							pending: true,
						},
						...state.transactions,
					],
					toast: {
						type: "info",
						message: "Sending transaction",
					}
				}
			case SEND_TX:
				return {
					...state,
					sending: false,
					balance: (action.result.to || "").toLowerCase() === state.currentAddress.toLowerCase() ? state.balance : state.balance-action.result.amount,
					transactions: [
						{
							from: state.currentAddress,
							...action.result,
						},
						...state.transactions.filter(tx => tx.pending !== true),
					],
					toast: {
						type: "success",
						message: `Transaction confirmed.`,
						autoclose: true,
					}
				}
			case SEND_TX+'_CATCH':
				return {
					...state,
					sending: false,
					transactions: state.transactions.filter(tx => tx.pending === false),
					toast: {
						type: "error",
						message: "Transaction failed",
						autoclose: true,
					}
				}
			case LOCK:
				return {
					...state,
					unlocked: false,
				}
			case TOAST:
				return {
					...state,
					toast: action.toast,
				}
			case RESET:
				return defaultState;
			default:
				return state;
		}
	};
};
