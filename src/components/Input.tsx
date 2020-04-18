import * as React from "react";
import styled from "styled-components";
import { colors } from "../libs/helpers";

const Input = styled.span`
	input {
		background: ${colors.grey};
		width: 100%;
		border: 1px solid ${colors.lightGrey};
    	border-radius: 4px;
		padding: .75em;
		box-sizing: border-box;
		font-size: 1em;
		resize: none;
		margin: 0!important;
		resize: none;
		-webkit-transition: all .35s ease;
    	-o-transition: all .35s ease;
    	transition: all .35s ease;
	}
	input:focus, input:active {
		background: ${colors.grey};
		border: 1px solid ${colors.black};
	}
	input::placeholder {
		color: ${colors.darkGrey};
		font-size: 0.94em;
	}
	textarea::placeholder {
		color: ${colors.darkGrey};
	}
	input[type="password"] {
		letter-spacing: 0.3em;
	}
	textarea {
		background: ${colors.grey};
		width: 100%;
		border: 1px solid ${colors.lightGrey};
		border-radius: 4px;
		padding: .75em;
		box-sizing: border-box;
		font-size: 1em;
		height: 100px;
		resize: none;
		margin: 0!important;
		-webkit-transition: all .35s ease;
    	-o-transition: all .35s ease;
    	transition: all .35s ease;
	}
	textarea:focus, textarea:active {
		background: ${colors.grey};
		border: 1px solid ${colors.black};
	}
	.label, .label--error, input {
		display: block;
	}
	.label {
		margin-bottom: .5em;
		color: ${colors.darkGrey};
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
