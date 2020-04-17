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
		padding: 2.5em 0;
    	border-radius: 4px;
    	background: ${colors.white};
    	-webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);
    	box-shadow: 0 1px 2px rgba(0,0,0,.2);
	}
	.balance__value {
		font-size: 2.5em;
	}
	.balance__dollar {
		font-size: 1em;
	}
	.menu {
		background: #efefef;
    	border-radius: 6em;
    	overflow: hidden;
		align-items: center;
		display: flex;
		margin: 1.3em 0px;
    	justify-content: space-between;
	}
	.menu__li {
		list-style: none;
		display: flex;
		cursor: pointer;
		flex: 1;
	}
	.menu__li a {
		color: ${colors.black};
		margin: auto;
		padding: .5em;
		background: #efefef;
		text-align: center;
    	width: 100%;
		text-decoration: none;
	}
	.menu__li--active a {
		background: ${colors.white};
    	border-radius: 5em;
    	color: ${colors.darkBlack};
    	border: 1px solid ${colors.lightGrey};
	}
	.menu__li a:hover {
		color: ${colors.darkBlack};
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
