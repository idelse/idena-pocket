import * as React from "react";
import styled from "styled-components";
import { colors } from "../helpers";
import { Link } from "react-router-dom";

const Button = styled.span`
	.btn {
		background: ${colors.black};
		border-radius: 8px;
		padding: .85em;
		display: block;
		text-align: center;
		width: 200px;
		color: ${colors.white};
		text-decoration: none;
		font-weight: normal;
		font-size: 1.1em;
		-webkit-transition: all .35s ease;
    	-o-transition: all .35s ease;
    	transition: all .35s ease;
    	-webkit-box-shadow: 0 1px 3px rgba(0,0,0,.2);
    	box-shadow: 0 1px 3px rgba(0,0,0,.2);
	}
	.btn:hover {
		background: ${colors.darkBlack};
    	-webkit-box-shadow: 0 2px 12px rgba(0,0,0,.2);
    	box-shadow: 0 2px 12px rgba(0,0,0,.2);
	}
	.btn:focus {
		background: ${colors.black};
    	-webkit-box-shadow: 0 2px 12px rgba(0,0,0,.2);
    	box-shadow: 0 2px 12px rgba(0,0,0,.2);
	}
	.btn--disabled, .btn--disabled:hover {
		background: ${colors.darkGrey};
	}
`;

export default (props: { onClick?: any, type?: string, to?: string, disabled?: boolean, text: string }) => {
	const { disabled, text, to, type, ...rest } = props;
	if (props.disabled) {
		return (
			<Button>
				<div className="btn btn--disabled" {...removeEventListener}>{text}</div>
			</Button>
		);
	}
	if (to) {
		return (
			<Button>
				<Link className="btn" to={to} {...rest}>{text}</Link>
			</Button>
		);
	}
	if (type === "submit") {
		return (
			<Button>
				<input className="btn" type="submit" {...rest} value={text} />
			</Button>
		);
	}
	return (
		<Button>
			<div className="btn" {...rest}>{text}</div>
		</Button>
	);
};
