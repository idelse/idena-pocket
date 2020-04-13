import AES from "crypto-js/aes";
import config from "../config";
import { Idena, LocalKeyStore } from "idena-js";
import { formatDate } from "../helpers";
const HDWallet = require("ethereum-hdwallet");
const bip39 = require("bip39");

const provider = new LocalKeyStore();
const idena = new Idena(provider);

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
		const transactions = await fetch(`https://api.idena.org/api/Address/${address}/Txs?skip=0&limit=30`)
			.then(res => res.json())
			.then(res => res.result)
			.then(txs => (txs || []).filter(tx => tx.type === "SendTx"))
			.then(async txs => {
				for (let i = 0; i < txs.length; i++) {
					const payload = txs[i].size <= 107 ? "0x" : await fetch(config.rpc, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							method: "bcn_transaction",
							id: 2,
							params: [txs[i].hash]
						})
					})
					.then(r => r.json())
					.then((r: any) => {
						return r?.result?.payload || "0x";
					});
					txs[i] = {
						...txs[i],
						payload,
					}
				}
				return txs;
			});
		const balance = await idena.getBalanceByAddress(address).then((r: any) => parseFloat(r.balance));
		const price = await fetch(config.price)
			.then(res => res.json())
			.then((res: any) => res.price);
		return {
			price: price || 0,
			address,
			privateKey,
			transactions: transactions || [],
			balance: balance || 0
		};
	})(),
});

export const LOCK = "LOCK";
export const lock = (): any => ({
	type: LOCK,
});

export const SEND_TX = "SEND_TX";
export const sendTx = (privateKey, { amount, to, payload }): any => ({
	type: SEND_TX,
	result: (async () => {
		const provider = new LocalKeyStore(privateKey);
		const idena = new Idena(provider);
		const operation = await idena.transfer({ amount, to, payload });
		await operation.confirmation();
		return {
			to,
			amount,
			payload,
			timestamp: formatDate(new Date()),
			hash: operation.hash,
		};
	})(),
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
