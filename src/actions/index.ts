import AES from 'crypto-js/aes'
import { formatDate } from '../libs/helpers'
import api from '../libs/api'
import config from '../config'
import {Idena, ProviderLocalKeyStore, ProviderLedger } from "idena-js";
const HDWallet = require('ethereum-hdwallet')
const bip39 = require('bip39')

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
		return {
			encryptedSeed,
			derivationPath
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
				config.oldDerivationPath
		}
	})()
})

export const UNLOCK = 'UNLOCK'
export const unlock = (seed, derivationPath): any => ({
	type: UNLOCK,
	result: (async () => {
		const hdwallet = HDWallet.fromMnemonic(seed.join(' '))
		const address = `0x${hdwallet
			.derive(derivationPath)
			.getAddress()
			.toString('hex')}`
		const privateKey = hdwallet
			.derive(derivationPath)
			.getPrivateKey()
			.toString('hex')
		const provider = new ProviderLocalKeyStore(privateKey)
		const idena = new Idena(provider)
		return {
			address,
			idena
		}
	})()
})

export const LOCK = 'LOCK'
export const lock = (idena): any => ({
	type: LOCK,
	result: idena.close()
})


export const SEND_TX = 'SEND_TX'
export const sendTx = (idena, { amount, to, payload }): any => ({
	type: SEND_TX,
	request: {
		to,
		amount,
		payload,
		timestamp: formatDate(new Date())
	},
	result: api.sendTransaction(idena, { amount, to, payload })
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
		const provider = new ProviderLedger()
		const address = await provider.getAddress()
		const idena = new Idena(provider)
		return { idena, address }
	})()
})
