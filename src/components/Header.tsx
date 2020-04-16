import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../components/Logo";
import { formatAddress, colors } from "../helpers";
import { lock, toast } from "../actions";
import CopyToClipboard from "react-copy-to-clipboard";

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	height: 100px;
	align-content: center;
	align-items: center;
	border-bottom: 1px dotted ${colors.darkGrey};
	.address {
		align-items: center;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.address__copy {
		background: ${colors.black};
		color: ${colors.white};
		padding: .5em;
		border-radius: 3px;
		display: inline-flex;
		text-decoration: none;
		cursor: pointer;
	}
	.address__copy:hover {
		color: ${colors.white};
		background: ${colors.darkBlack};
	}
	.address__full {
		padding-top: .5em;
		font-size: .8em;
	}
	.logout {
		cursor: pointer;
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
			<Logo width={50} />
			<div className="address">
				<CopyToClipboard text={storage.address}>
					<span className="address__copy">{formatAddress(storage.address, 6)}</span>
				</CopyToClipboard>
				<span className="address__full">{storage.address}</span>
			</div>
			<span className="logout" onClick={() => dispatch(lock())}>Logout</span>
			{storage.message && <div className={`toast toast--${storage.type || "info"}`}>
				{storage.message}
			</div>}
		</Header>
	);
};
