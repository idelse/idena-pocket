import * as React from "react";
import styled from "styled-components";
import { colors } from "../helpers";
import { Link } from "react-router-dom";

const Button = styled.span`
	.btn {
		background: ${colors.darkBlack};
		border-radius: 3px;
		padding: .85em;
		display: block;
		text-align: center;
		width: 200px;
		color: ${colors.white};
		text-decoration: none;
		font-weight: normal;
		font-size: 1.1em;
	}
	.btn:hover {
		background: ${colors.black};
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
