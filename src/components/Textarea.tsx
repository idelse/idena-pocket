import * as React from "react";
import styled from "styled-components";
import { colors } from "../libs/helpers";

const Textarea = styled.span`
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
	}
	.label, textarea {
		display: block;
	}
	.label {
		margin-bottom: .5em;
	}
`;

export default React.forwardRef(function(props: any, ref) {
	const { children, label, ...rest } = props;
	return (
		<Textarea>
			{label && <span className="label">{label}</span>}
			<textarea type="text" {...rest} ref={ref}>{children}</textarea>
		</Textarea>
	);
});
