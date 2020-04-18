import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "../actions";
import { colors } from "../libs/helpers";

const Toast = styled.div`
	.toast {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		background: ${colors.darkGreen};
		position: fixed;
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
		<Toast>
			{storage.message && <div className={`toast toast--${storage.type || "info"}`}>
				{storage.message}
			</div>}
		</Toast>
	);
};
