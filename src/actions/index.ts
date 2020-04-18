import AES from "crypto-js/aes";
import { formatDate } from "../libs/helpers";
import api from "../libs/api";
import config from "../config";
const HDWallet = require("ethereum-hdwallet");
const bip39 = require("bip39");

export const UPDATE_CREATION_WALLET_PASSWORD = "UPDATE_CREATION_WALLET_PASSWORD";
export const updateCreationWalletPassword = (password: string) => ({
	type: UPDATE_CREATION_WALLET_PASSWORD,
	result: password,
});

export const UPDATE_SEED = "UPDATE_SEED";
export const updatedSeed = () => ({
	type: UPDATE_SEED,
	result: (async () => {
		const mnemonic = await bip39.generateMnemonic();
		return mnemonic.split(" ");
	})(),
});

export const UPDATE_ENCRYPTED_SEED = "UPDATE_ENCRYPTED_SEED";
export const updateEncryptedSeed = (seed, password) => ({
	type: UPDATE_ENCRYPTED_SEED,
	result: (async () => {
		const encryptedSeed = AES.encrypt(JSON.stringify(seed), password).toString();
		localStorage.setItem('encrypted_seed', encryptedSeed);
		return encryptedSeed;
	})(),
});

export const RETRIEVE_ENCRYPTED_SEED = "RETRIEVE_ENCRYPTED_SEED";
export const retrieveEncryptedSeed = () => ({
	type: UPDATE_ENCRYPTED_SEED,
	result: (async () => {
		return localStorage.getItem('encrypted_seed');
	})(),
});

export const UNLOCK = "UNLOCK";
export const unlock = (seed): any => ({
	type: UNLOCK,
	result: (async () => {
		const hdwallet = HDWallet.fromMnemonic(seed.join(' '));
		const address = `0x${hdwallet.derive(config.derivationPath).getAddress().toString('hex')}`;
		const privateKey = hdwallet.derive(config.derivationPath).getPrivateKey().toString('hex');
		const retrievedAccountState = await api.retrieveAccountState(address);
		return {
			...retrievedAccountState,
			privateKey
		}
	})(),
});

export const LOCK = "LOCK";
export const lock = (): any => ({
	type: LOCK,
});

export const SEND_TX = "SEND_TX";
export const sendTx = (privateKey, { amount, to, payload }): any => ({
	type: SEND_TX,
	request: {
		to,
		amount,
		payload,
		timestamp: formatDate(new Date()),
	},
	result: api.sendTransaction(privateKey, { amount, to, payload }),
});

export const TOAST = "TOAST";
export const toast = ({ message, type }): any => ({
	type: TOAST,
	toast: { message, type },
});

export const RESET = "RESET";
export const reset = () => {
	localStorage.removeItem('encrypted_seed');
	return {
		type: RESET,
	};
};

export const REFRESH = "REFRESH";
export const refresh = (address, showToast = false): any => ({
	type: REFRESH,
	showToast,
	result: (async () => {
		const refreshedAccountState = await api.retrieveAccountState(address);
		return {
			...refreshedAccountState,
			showToast,
		};
	})(),
});
