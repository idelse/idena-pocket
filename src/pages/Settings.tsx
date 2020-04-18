import * as React from "react";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { colors, formatAddress } from "../libs/helpers";
import Container from "../components/Container";
import { reset } from "../actions";

const Settings = styled.div`
	.forget {
		text-decoration: underline;
		cursor: pointer;
	}
	.fa {
	padding-right: 1em;
	}
	.desc {
	margin-top: 10px;
    font-size: 0.9em;
    color: #999;
	}
	.line {
	margin: 1.5em 0;
    color: #bbb;
    border: 1px solid ${colors.grey};
	}
	.image {
	margin: 1.5em auto;
	width: 8em;
	height: 8em;
	border-radius: 1em;
	background: ${colors.grey};
	overflow: hidden;
	}
	.image img {
	width: 100%;
	}
	.center {
	text-align: center;
	}
	.addr {
	padding: 10px;
    border-radius: 4px;
    color: #444;
    background: #f5f6f7;
	}
`;

export default (): ReactElement => {

	const dispatch = useDispatch();
	
	const resetWallet = () => {
		dispatch(reset());
	}

	const exportSeed = () => {
		dispatch(reset());
	}

	const storage = useSelector((state: any) => {
        return {
			currentAddress: state.app.currentAddress,
			transactions: state.app.transactions,
        };
	});

	return (
		<Settings>
			<Container>
			<div className="image">
			<img src={`https://robohash.org/${storage.currentAddress.toLowerCase()}`}/>
			</div>
			<p className="desc center">Your Full Address</p>
			<p className="desc center addr">{storage.currentAddress.toLowerCase()}</p>
			<div className="line"></div>
			<p className="forget" onClick={resetWallet}>
			<i className="fa fa-undo"/>
			Reset wallet
			</p>
			<p className="desc">Clear browser storage and use another wallet</p>
			</Container>
		</Settings>
	);
}
