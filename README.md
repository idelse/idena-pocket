# idena-pocket

idena-pocket wallet is available at [https://pocket.idena.dev](https://pocket.idena.dev)

### 🔎 Overview

idena-pocket is based on idena-js library developed by [@idelse](https://github.com/idelse). idena-js is built with typescript. This wallet does not need an active full node. As of date, it is using `rpc.idena.dev` as the reference endpoint since their is no public rpc endpoint available. `rpc.idena.dev` is built and maintained by [@idelse](https://github.com/idelse)

### Will this be open source?

💯. Feel free to improve on Idena-pocket. Forks and PRs are welcome.

### 🔧 How to run

Install dependencies

```
npm install
```

Run

```
npm run dev
```

### 🗺️ How to update translation files post development

Run

```
npm run i18-scanner
```

to extract the translations. They will be appended under the files at

```
public/locales/{{lng}}/translation.json
```

Keys to be translated will have the value `__STRING_NOT_TRANSLATED__.`

### 🌐 Useful Links

-   [idena-js documentation](https://www.idelse.dev/idena-js/quick-start)
-   [idena-rpc documentation](https://github.com/idelse/idena-rpc)
-   [idena-pocket website](https://pocket.idena.dev)
-   [Telegram](https://t.me/idelsesupport)

---

Consider supporting idena-pocket by donating to `0x62449c9b1029db6df55ecf215d0aaa0cea23c66d`
