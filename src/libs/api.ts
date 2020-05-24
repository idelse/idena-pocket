import { Idena, ProviderLocalKeyStore } from 'idena-js'
import config from '../config'
import { formatDate } from './helpers'

const provider = new ProviderLocalKeyStore()
const idena = new Idena(provider)

const getTransactions = async address => {
	const transactions = await fetch(
		`https://api.idena.org/api/Address/${address}/Txs?skip=0&limit=30`
	)
		.then(res => res.json())
		.then(res => res.result)
		.then(txs => (txs || []).filter(tx => tx.type === 'SendTx'))
		.then(async txs => {
			for (let i = 0; i < txs.length; i++) {
				const payload =
					txs[i].size <= 107
						? '0x'
						: await fetch(config.rpc, {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({
									method: 'bcn_transaction',
									id: 2,
									params: [txs[i].hash]
								})
						  })
								.then(r => r.json())
								.then((r: any) => r?.result?.payload || '0x')
								.catch(() => '0x')
				txs[i] = {
					...txs[i],
					payload
				}
			}
			return txs
		})
		.catch(() => [])
	return {
		address,
		transactions: transactions || []
	}
}

const getBalance = async address =>
	idena
		.getBalanceByAddress(address)
		.then((r: any) => parseFloat(r.balance))
		.catch(error => {
			console.error({ error })
			return 0
		})

const getPrice = async () =>
	fetch(config.price)
		.then(res => res.json())
		.then((res: any) => res.price)
		.catch(() => 0)

const sendTransaction = async (idena, { amount, to, payload }) => {
	try {
		const operation = await idena.transfer({ amount, to, payload })
		await operation.confirmation()
		return {
			to,
			amount,
			payload,
			timestamp: formatDate(new Date()),
			hash: operation.hash
		}
	} catch (e) {
		console.error('>', e)
		throw e
	}
}

export default {
	getTransactions,
	sendTransaction,
	getBalance,
	getPrice
}
