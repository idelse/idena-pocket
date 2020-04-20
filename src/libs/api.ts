import { Idena, LocalKeyStore } from "idena-js";
import config from "../config";
import { formatDate } from "./helpers";

const provider = new LocalKeyStore();
const idena = new Idena(provider);

const retrieveAccountState = async (address) => {
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
			transactions: transactions || [],
			balance: balance || 0
		};
}

const sendTransaction = async (privateKey, { amount, to, payload }) => {
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
}

export default {
	retrieveAccountState,
	sendTransaction
}
