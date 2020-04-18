import * as React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../components/Logo";
import { formatAddress, colors } from "../libs/helpers";
import { lock } from "../actions";
import CopyToClipboard from "react-copy-to-clipboard";

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	min-height: 10vh;
	align-content: center;
	align-items: center;
	.fa {
		padding-right: 10px;
		color: ${colors.darkRed};
	}
	.darkbg {
		width: 100%;
	    z-index: -13;
	    height: 56vh;
	    left: 0;
	    background-color: ${colors.medBlack};
	    position: absolute;
	}
	.logout {
		cursor: pointer;
		color: ${colors.darkRed};
	}
	.logout:hover {
		text-decoration: underline;
	}
`;

export default () => {
	const dispatch = useDispatch();
	const storage = useSelector((state: any) => ({
		address: state.app.currentAddress,
	}));

	return (
		<Header>
			<div className="darkbg"></div>
			<Logo theme="light" width={50} />
			<span className="logout" onClick={() => dispatch(lock())}>
				<i className="fa fa-power-off"/>
				Logout
			</span>
		</Header>
	);
};
