import * as React from "react";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { reset } from "../actions";

const Settings = styled.div`
	.forget {
		text-decoration: underline;
		cursor: pointer;
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
			<p className="forget" onClick={resetWallet}>Reset wallet</p>
		</Settings>
	);
}
