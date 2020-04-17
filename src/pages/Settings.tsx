import * as React from "react";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
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
`;

export default (): ReactElement => {

	const dispatch = useDispatch();
	
	const resetWallet = () => {
		dispatch(reset());
	}

	const exportSeed = () => {
		dispatch(reset());
	}

	return (
		<Settings>
			<Container>
			<p className="forget" onClick={resetWallet}>
			<i className="fa fa-undo"/>
			Reset wallet
			</p>
			</Container>
		</Settings>
	);
}
