import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../components/Logolight";
import { formatAddress, colors } from "../libs/helpers";
import { lock, toast } from "../actions";
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
	    background-color: rgb(57, 60, 62);
	    position: absolute;
	}
	.address {
		text-align: center;
		background: ${colors.black};
		color: ${colors.white};
		padding: .5em;
		border-radius: 3px;
		display: block;
		text-decoration: none;
		cursor: pointer;
	}
	.address:hover {
		color: ${colors.white};
		background: ${colors.darkBlack};
	}
	.logout {
		cursor: pointer;
		color: ${colors.darkRed};
	}
	.logout:hover {
		text-decoration: underline;
	}
	.toast {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		background: ${colors.darkGreen};
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.toast--success {
		color: #fff;
		background: ${colors.darkGreen};
	}
	.toast--info {
		color: #fff;
		background: ${colors.darkBlue};
	}
	.toast--error {
		color: #fff;
		background: ${colors.darkRed};
	}
`;

export default () => {
	const dispatch = useDispatch();
	const storage = useSelector((state: any) => ({
		address: state.app.currentAddress,
		message: state.app.toast.message,
		type: state.app.toast.type,
		autoclose: state.app.toast.autoclose,
	}));

	useEffect(() => {
		if (storage.autoclose)
			setTimeout(() => {
				dispatch(toast({ type: "", message: "" }))
			}, 5000);
	}, [storage.message]);

	return (
		<Header>
			<div className="darkbg"></div>
			<Logo width={50} />
			<CopyToClipboard text={storage.address}>
				<span className="address">{formatAddress(storage.address, 6)}</span>
			</CopyToClipboard>
			<span className="logout" onClick={() => dispatch(lock())}>
				<i className="fa fa-power-off"/>
				Logout
			</span>
			{storage.message && <div className={`toast toast--${storage.type || "info"}`}>
				{storage.message}
			</div>}
		</Header>
	);
};
