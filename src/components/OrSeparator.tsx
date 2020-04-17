import * as React from "react";
import styled from "styled-components";
import { colors } from "../helpers";


const Or = styled.div`
	width: 225px;
	padding-top: 0px !important;
	.greyback {
		background: ${colors.grey};
		width: 38px;
		display: block;
		margin: auto;
    	z-index: 999;
	}
	.description {
		text-align: center;
		padding: 0px 10px;
		color: ${colors.darkGrey};
		background: ${colors.grey};
	}
	.separator {
		width: 225px;
		border-bottom: 1px solid ${colors.darkGrey};
		margin-top: -34px;
		display: block;
		z-index: -1;
    	position: relative;
	    margin-bottom: 10px;
	}
`;

export default (props) => {
	return (
		<Or>
			<span className="greyback"><p className="description">Or</p></span><span className="separator"></span>
		</Or>
	);
};
