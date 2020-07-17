import AES from 'crypto-js/aes'
import { formatDate } from '../libs/helpers'
import api from '../libs/api'
import config from '../config'
import { ProviderHDWallet, ProviderLedger } from 'idena-js'
import IdenaProvider from 'idena-js/dist/providers/IdenaProvider'
const bip39 = require('bip39')

let idena: IdenaProvider = null

export const UPDATE_CREATION_WALLET_PASSWORD = 'UPDATE_CREATION_WALLET_PASSWORD'
export const updateCreationWalletPassword = (password: string) => ({
	type: UPDATE_CREATION_WALLET_PASSWORD,
	result: password
})

export const UPDATE_SEED = 'UPDATE_SEED'
export const updatedSeed = () => ({
	type: UPDATE_SEED,
	result: (async () => {
		const mnemonic = await bip39.generateMnemonic()
		return mnemonic.split(' ')
	})()
})

export const UPDATE_ENCRYPTED_SEED = 'UPDATE_ENCRYPTED_SEED'
export const updateEncryptedSeed = (seed, derivationPath, password) => ({
	type: UPDATE_ENCRYPTED_SEED,
	result: (async () => {
		const encryptedSeed = AES.encrypt(
			JSON.stringify(seed),
			password
		).toString()
		localStorage.setItem('encrypted_seed', encryptedSeed)
		localStorage.setItem('derivation_path', derivationPath)
		localStorage.setItem('derivation_index', config.defaultIndexAddress)
		localStorage.setItem(
			'generated_addresses',
			config.defaultGeneratedAddress
		)
		return {
			encryptedSeed,
			derivation: `${derivationPath}/${config.defaultIndexAddress}`
		}
	})()
})

export const RETRIEVE_ENCRYPTED_SEED = 'RETRIEVE_ENCRYPTED_SEED'
export const retrieveEncryptedSeed = () => ({
	type: RETRIEVE_ENCRYPTED_SEED,
	result: (async () => {
		return {
			encryptedSeed: localStorage.getItem('encrypted_seed'),
			derivationPath:
				localStorage.getItem('derivation_path') ||
				config.oldDerivationPath,
			currentAddressIndex:
				localStorage.getItem('derivation_index') ||
				config.defaultIndexAddress,
			generatedAddresses:
				localStorage.getItem('generated_addresses') ||
				config.defaultGeneratedAddress
		}
	})()
})

export const UNLOCK = 'UNLOCK'
export const unlock = (seed, derivationPath, derivationIndex = 0): any => ({
	type: UNLOCK,
	result: (async () => {
		idena = new ProviderHDWallet(seed.join(' '), derivationPath)
		const currentAddress = await idena.getAddressByIndex(derivationIndex)
		const addresses = await Promise.all(
			Array(20)
				.fill(1)
				.map((_, index) => idena.getAddressByIndex(index))
		)
		return {
			idena,
			currentAddress,
			currentAddressIndex: derivationIndex,
			addresses
		}
	})()
})

export const LOCK = 'LOCK'
export const lock = (): any => ({
	type: LOCK,
	result: idena.close()
})

export const SEND_TX = 'SEND_TX'
export const sendTx = ({ amount, to, payload }, currentAddressIndex): any => ({
	type: SEND_TX,
	request: {
		to,
		amount,
		payload,
		timestamp: formatDate(new Date())
	},
	result: api.sendTransaction(
		idena,
		{ amount, to, payload },
		currentAddressIndex
	)
})

export const TOAST = 'TOAST'
export const toast = (options): any => ({
	type: TOAST,
	toast: {
		message: options.message || '',
		type: options.type || 'info',
		autoclose: options.autoclose || false
	}
})

export const RESET = 'RESET'
export const reset = () => {
	localStorage.removeItem('encrypted_seed')
	localStorage.removeItem('derivation_path')
	localStorage.removeItem('derivation_index')
	localStorage.removeItem('generated_addresses')
	return {
		type: RESET
	}
}

export const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
export const getTransactions = (address, showToast = false): any => ({
	type: GET_TRANSACTIONS,
	showToast,
	result: (async () => {
		const transactions = await api.getTransactions(address)
		return {
			...transactions,
			showToast
		}
	})()
})

export const GET_BALANCE = 'GET_BALANCE'
export const getBalance = (address, noToast = false): any => ({
	type: GET_BALANCE,
	result: (async () => {
		const balance = await api.getBalance(address)
		return { balance, noToast }
	})()
})

export const GET_PRICE = 'GET_PRICE'
export const getPrice = (): any => ({
	type: GET_PRICE,
	result: (async () => {
		const price = await api.getPrice()
		return { price }
	})()
})

export const CONNECT_LEDGER = 'CONNECT_LEDGER'
export const connectLedger = (): any => ({
	type: CONNECT_LEDGER,
	result: (async () => {
		idena = new ProviderLedger()
		const address = await idena.getAddressByIndex(0)
		return { idena, address }
	})()
})

export const NODE_STATUS = 'NODE_STATUS'
export const getNodeStatus = (): any => ({
	type: NODE_STATUS,
	result: (async () => {
		return api.getStatus()
	})()
})

export const CHANGE_ADDRESS = 'CHANGE_ADDRESS'
export const changeAddress = (indexAddress: number): any => ({
	type: CHANGE_ADDRESS,
	result: (async () => {
		const currentAddress = await idena.getAddressByIndex(indexAddress)
		const transactions = await api
			.getTransactions(currentAddress)
			.then(result => result.transactions)
		const balance = await api.getBalance(currentAddress)
		return {
			currentAddressIndex: indexAddress,
			currentAddress,
			transactions,
			balance
		}
	})()
})
