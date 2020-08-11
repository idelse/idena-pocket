import {
	UPDATE_CREATION_WALLET_PASSWORD,
	UPDATE_SEED,
	UPDATE_ENCRYPTED_SEED,
	UNLOCK,
	LOCK,
	TOAST,
	SEND_TX,
	RESET,
	GET_TRANSACTIONS,
	RETRIEVE_ENCRYPTED_SEED,
	GET_BALANCE,
	GET_PRICE,
	CONNECT_LEDGER,
	NODE_STATUS,
	CHANGE_ADDRESS
} from '../actions'
import { formatNumber } from '../libs/helpers'

export const defaultState: any = {
	idena: null,
	addresses: [],
	currentAddress: '',
	currentAddressIndex: 0,
	numberOfShowedAddresses: 5,
	encryptedSeed: '',
	unlocked: false,
	balance: 0,
	transactions: [],
	price: 0,
	sending: false,
	nodeStatus: {
		latestBlock: 0,
		synced: true
	},
	toast: {
		message: '',
		type: '',
		autoclose: false
	},
	creationWallet: {
		password: '',
		seed: []
	}
}

export default (defaultState: any) => {
	return (state: any = defaultState, action: any): any => {
		switch (action.type) {
			case UPDATE_CREATION_WALLET_PASSWORD:
				return {
					...state,
					creationWallet: {
						...state.creationWallet,
						password: action.result
					}
				}
			case UPDATE_SEED:
				return {
					...state,
					creationWallet: {
						...state.creationWallet,
						seed: action.result
					}
				}
			case UPDATE_ENCRYPTED_SEED:
			case RETRIEVE_ENCRYPTED_SEED:
				return {
					...state,
					encryptedSeed: action.result.encryptedSeed,
					derivationPath: action.result.derivationPath,
					currentAddressIndex: action.result.currentAddressIndex
				}
			case UNLOCK + '_REQUESTED':
				return {
					...state,
					toast: {
						type: 'info',
						message: 'Unlocking account',
						autoclose: false
					}
				}
			case UNLOCK:
				return {
					...state,
					currentAddressIndex: action.result.currentAddressIndex,
					currentAddress: action.result.currentAddress,
					addresses: action.result.addresses,
					idena: action.result.idena,
					unlocked: true,
					toast: {}
				}
			case CONNECT_LEDGER:
				return {
					...state,
					currentAddressIndex: 0,
					currentAddress: action.result.address,
					idena: action.result.idena,
					addresses: [action.result.address],
					unlocked: true,
					toast: {}
				}
			case GET_TRANSACTIONS + '_REQUESTED':
				return {
					...state,
					toast: action.showToast
						? {
								type: 'info',
								message: 'Refreshing',
								autoclose: true
						  }
						: state.toast
				}
			case GET_TRANSACTIONS:
				return {
					...state,
					transactions: (() => {
						const previousTransactions = state.transactions
						const nextTransactions = action.result.transactions.map(
							tx => ({ ...tx, pending: false })
						)
						const newTrasactions = nextTransactions.filter(
							currentNewTransaction => {
								const isNew = !previousTransactions.some(
									previousCurrentTransaction =>
										previousCurrentTransaction.hash ===
										currentNewTransaction.hash
								)
								return isNew
							}
						)
						return [
							...newTrasactions,
							...previousTransactions
						].sort((a, b) => b.timestamp - a.timestamp)
					})(),
					currentAddress: action.result.address
				}
			case GET_BALANCE:
				return {
					...state,
					balance: action.result.balance,
					toast:
						action.result.noToast &&
						action.result.balance > state.balance
							? {
									type: 'info',
									message: `You received ${formatNumber(
										action.result.balance - state.balance
									)} iDNA`,
									autoclose: true
							  }
							: state.toast
				}
			case GET_PRICE:
				return {
					...state,
					price: action.result.price
				}
			case NODE_STATUS:
				return {
					...state,
					nodeStatus: action.result
				}
			case SEND_TX + '_REQUESTED':
				return {
					...state,
					sending: true,
					transactions: [
						{
							from: state.currentAddress,
							...action.request,
							pending: true
						},
						...state.transactions
					],
					toast: {
						type: 'info',
						message: 'Sending transaction'
					}
				}
			case SEND_TX:
				return {
					...state,
					sending: false,
					balance:
						(action.result.to || '').toLowerCase() ===
						state.currentAddress.toLowerCase()
							? state.balance
							: state.balance - action.result.amount,
					transactions: [
						{
							from: state.currentAddress,
							...action.result
						},
						...state.transactions.filter(tx => tx.pending !== true)
					],
					toast: {
						type: 'success',
						message: `Transaction confirmed.`,
						autoclose: true
					}
				}
			case SEND_TX + '_CATCH':
				return {
					...state,
					sending: false,
					transactions: state.transactions.filter(
						tx => tx.pending === false
					),
					toast: {
						type: 'error',
						message: 'Transaction failed',
						autoclose: true
					}
				}
			case LOCK:
				return {
					...defaultState
				}
			case TOAST:
				return {
					...state,
					toast: action.toast
				}
			case RESET:
				return defaultState
			case CHANGE_ADDRESS + '_REQUESTED':
				return {
					...state,
					sending: false,
					toast: {
						type: 'info',
						message: 'Loading new address',
						autoclose: false
					}
				}
			case CHANGE_ADDRESS:
				return {
					...state,
					currentAddressIndex: action.result.currentAddressIndex,
					currentAddress: action.result.currentAddress,
					transactions: action.result.transactions,
					balance: action.result.balance,
					toast: {}
				}
			default:
				return state
		}
	}
}
