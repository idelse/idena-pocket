import * as React from "react";
import styled from "styled-components";
import swal from 'sweetalert';
import { createGlobalStyle } from 'styled-components';
import { colors } from "../libs/helpers";

const GlobalStyle = createGlobalStyle`
	.swal-button {
		border: 0!important;
	}
	.swal-button--confirm {
		background: ${colors.black};
	}
	.swal-button--confirm:hover {
		background: ${colors.darkBlack}!important;
	}
`;

const Confirmation = styled.div`
`;

export default (props: any) => {
	const text = props.text || "Are you sure you want to do this?";
	const disabled = !!props.disabled;
	const handleClick = async () => {
		if (disabled) return;
		const confirmed = await swal(text, {
			buttons: ["Cancel", "Confirm"],
		});
		if (confirmed) props.children.props.onClick();
	}
	return (
		<>
			<GlobalStyle />
			<Confirmation>
				{ React.cloneElement( props.children, { onClick: handleClick } ) }
			</Confirmation>
		</>
	);
};
