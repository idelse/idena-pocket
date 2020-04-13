import * as React from "react";
import { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrap from "../components/Wrap";
import Header from "../components/Header";
import styled from "styled-components";
import { push } from "connected-react-router";
import { colors, formatNumber } from "../helpers";
import { Link } from "react-router-dom";

const Unlocked = styled.div`
	.balance {
		width: 100%;
		text-align: center;
		font-weight: bold;
		padding: 1em 0;
		display: flex;
		flex-direction: column;
		border-bottom: 1px dotted ${colors.darkGrey};
	}
	.balance__value {
		font-size: 2.5em;
	}
	.balance__dollar {
		font-size: 1em;
	}
	.menu {
		display: flex;
		height: 100px;
		align-items: center;
	}
	.menu__li {
		list-style: none;
	}
	.menu__li a {
		color: ${colors.white};
		margin-right: 1em;
		padding: .5em;
		background: ${colors.black};
		border-radius: 3px;
		text-decoration: none;
	}
	.menu__li--active a, .menu__li a:hover {
		background: ${colors.darkBlack};
	}
	.footer {
		width: 100%;
		text-align: center;
		padding: 4em 0;
		font-family: 'Courier New', Courier, monospace;
		color: ${colors.darkGrey};
		font-size: .8em;
	}
`;

export default (props): ReactElement => {

	const dispatch = useDispatch();

	const storage = useSelector((state: any) => {
        return {
			pathname: state.router.location.pathname,
			unlocked: state.app.unlocked,
			currentAddress: state.app.currentAddress,
			transactions: state.app.transactions,
			balance: state.app.balance,
			price: state.app.price,
        };
	});
	
	useEffect(() => {
		if (!storage.unlocked)
			dispatch(push("/"));
	}, [storage.unlocked]);

	return (
		<Wrap>
			<Header />
			<Unlocked>
				<div className="balance">
					<span className="balance__value">{formatNumber(storage.balance)} DNA</span>
					<span className="balance__dollar">${formatNumber(storage.balance*storage.price)}</span>
				</div>
				<ul className="menu">
					<li className={`menu__li ${storage.pathname === '/unlocked/send' ? 'menu__li--active' : ''}`}>
						<Link to="/unlocked/send">Send</Link>
					</li>
					<li className={`menu__li ${storage.pathname === '/unlocked/transactions' ? 'menu__li--active' : ''}`}>
						<Link to="/unlocked/transactions">Transactions</Link>
					</li>
					<li className={`menu__li ${storage.pathname === '/unlocked/settings' ? 'menu__li--active' : ''}`}>
						<Link to="/unlocked/settings">Settings</Link>
					</li>
				</ul>
				{props.children}
				<p className="footer">spero che ritorni presto l'era del cinghiale bianco ♪</p>
			</Unlocked>
		</Wrap>
	);
};
