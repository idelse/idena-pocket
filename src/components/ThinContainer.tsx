import * as React from "react";
import styled from "styled-components";
import { colors } from "../libs/helpers";


const ThinContainer = styled.div`
	margin: 0 auto;
	box-sizing: border-box;
	background: ${colors.white};
	border-radius: 4px;
	-webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
    @media (min-width: 300px) {
	    width: 100%;
	    padding: 0.5em !important;
	}
    @media (min-width: 576px) {
	    width: 100%;
	    padding: 0.5em !important;
	}
    @media (min-width: 768px) {
	    width: 120%;
    	margin-left: -10%;
    	margin-right: -10%;
	    padding: 1em !important;
	}
    @media (min-width: 992px) {
	    width: 120%;
    	margin-left: -10%;
    	margin-right: -10%;
	    padding: 1em !important;
	 }
`;

export default (props) => {
	return (
		<ThinContainer>
			{props.children}
		</ThinContainer>
	);
};
