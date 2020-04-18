export default {
	env: "common",
	derivationPath: `m/44'/60'/0'/0/0`,
	rpc: "https://rpc.idena.dev",
	price: "https://price.idena-price.workers.dev/",
	menu: [
		{
			path: "/unlocked/send",
			name: "Send",
		},
		{
			path: "/unlocked/transactions",
			name: "Transactions",
		},
		{
			path: "/unlocked/settings",
			name: "Settings",
		}
	],
	donationAddress: "0x62449c9b1029db6df55ecf215d0aaa0cea23c66d"
};
