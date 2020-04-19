import * as React from "react";
import styled from "styled-components";

const Wrap = styled.div`
	width: 100%;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	padding: 0 1em;
	box-sizing: border-box;
	height: 100vh;
`;

export default (props) => {
	return (
		<Wrap>
			{props.children}
		</Wrap>
	);
};
