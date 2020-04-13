import * as React from "react";
import styled from "styled-components";
import { colors } from "../helpers";

const Input = styled.span`
	input {
		background: #fff;
		width: 100%;
		border: 1px solid ${colors.darkGrey};
		border-radius: 3px;
		padding: .5em;
		box-sizing: border-box;
		font-size: 1.2em;
		resize: none;
		margin: 0!important;
		resize: none;
	}
	textarea {
		background: #fff;
		width: 100%;
		border: 1px solid ${colors.darkGrey};
		border-radius: 3px;
		padding: .5em;
		box-sizing: border-box;
		font-size: 1.5em;
		height: 100px;
		resize: none;
		margin: 0!important;
	}
	.label, .label--error, input {
		display: block;
	}
	.label {
		margin-bottom: .5em;
	}
	.label--error {
		color: red;
		margin-bottom: 2em;
		padding-top: .2em;
		font-size: .85em;
	}
`;

export default React.forwardRef(function(props:any, ref) {
	const { label, error, type, ...rest } = props;
	if (type === "textarea") {
		return (
			<Input>
				{label && <span className="label">{label}</span>}
				<textarea {...rest} ref={ref}>{props.text}</textarea>
				<span className="label--error">{error}</span>
			</Input>
		);
	}
	return (
		<Input>
			{label && <span className="label">{label}</span>}
			<input type={type || "text"} {...rest} ref={ref} />
			<span className="label--error">{error}</span>
		</Input>
	);
});
