import * as React from "react";
import styled from "styled-components";
import { colors } from "../helpers";


const Or = styled.div`
	width: 225px;
	margin: 0px auto;
	padding-top: 0px !important;
	.greyback {
		background: ${colors.white};
		width: 38px;
		display: block;
		margin: auto;
		margin-top: 2px;
    	z-index: 999;
	}
	.description {
		text-align: center;
		padding: 0px 10px;
		position: relative;
    	z-index: 1;
		color: ${colors.darkGrey};
		background: ${colors.white};
	}
	.separator {
		width: 225px;
		border-bottom: 1px solid ${colors.lightGrey};
		margin-top: -34px;
		display: block;
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
