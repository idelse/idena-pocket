import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from "react-router-dom";
import { store, history } from "./store";
import Login from "./pages/Login";
import { createGlobalStyle } from 'styled-components';
import { colors } from "./helpers";
import ImportMnemonic from "./pages/ImportMnemonic";
import CreateWallet from "./pages/CreateWallet";
import ShowCreatedSeed from "./pages/ShowCreatedSeed";
import ConfirmSeed from "./pages/ConfirmSeed";
import Unlocked from "./pages/Unlocked";
import Transations from "./pages/Transations";
import Settings from "./pages/Settings";
import SendTx from "./pages/SendTx";

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		font-weight: normal;
		color: ${colors.black};
	}
	input:focus, textarea:focus, select:focus{
        outline: none;
    }
	body {
		font-family: 'Inter', sans-serif;
		letter-spacing: -.01em;
		background: ${colors.grey};
	}
	h1, h2, h3, h4, h5, h6 {
		margin-top: 1em;
		padding-bottom: .25em;
	}
`;

ReactDOM.render(
	<Provider store={store}>
		<GlobalStyle />
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route path="/import-mnemonic" component={ImportMnemonic} />
				<Route path="/create-wallet" component={CreateWallet} />
				<Route path="/show-created-seed" component={ShowCreatedSeed} />
				<Route path="/confirm-seed" component={ConfirmSeed} />
				<Route path="/unlocked">
					<Unlocked>
						<Route path="/">
							<Redirect to="/unlocked/send" />
						</Route>
						<Route path="/unlocked/send" component={SendTx} />
						<Route path="/unlocked/transactions" component={Transations} />
						<Route path="/unlocked/settings" component={Settings} />
					</Unlocked>
				</Route>
			</Switch>
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root"),
);
