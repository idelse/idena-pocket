import * as React from "react";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { colors } from "../libs/helpers";
import Container from "../components/Container";
import { reset, toast } from "../actions";
import CopyToClipboard from "react-copy-to-clipboard";
import Confirmation from "../components/Confirmation";
import Button from "../components/Button";

const Profile = styled.div`
	.forget, .forget > * {
		cursor: pointer;
		color: ${colors.darkRed}
	}
	.fa {
		padding-right: 1em;
	}
	.desc {
		margin-top: 10px;
	    font-size: 0.9em;
	    color: #999;
	}
	.line {
		margin: 1.5em 0;
	    color: #bbb;
	    border: 1px solid ${colors.grey};
	}
	.image {
		margin: 1.5em 0;
		width: 8em;
		height: 8em;
		border-radius: 1em;
		background: ${colors.grey};
		overflow: hidden;
	}
	.image-left{
		float: left;
		display: block;
	}
	.image-right{
		float: right;
		display: block;
	}
	.image img {
		width: 100%;
	}
	.image-qr {
		padding: 6px;
    	box-sizing: border-box;
	}
	@media (max-width: 400px) {
		.image {
		width: 6em;
		height: 6em;
		}
	}

	.desc-center {
		text-align: center;
	}
	.desc--addr {
		padding: 10px;
		overflow-y: auto;
	    border-radius: 4px;
	    color: ${colors.black};
	    background: ${colors.grey};
	}
	.address {
		text-align: center;
	    background: ${colors.darkBlue};
	    color: ${colors.white};
	    padding: .5em;
	    border-radius: 4px;
	    display: block;  
	    height: 1.6em;
	    margin: auto;
	    line-height: 1.6em;
	    margin-top: 1em;
	    width: 200px;
	    text-decoration: none;
	    cursor: pointer;
    	transition: all .35s ease;
    	box-shadow: 0 1px 3px rgba(0,0,0,.2);
	}
	.address:hover {
		color: ${colors.white};
		background: #0c9bd2;
		-webkit-box-shadow: 0 2px 12px rgba(0,0,0,.2);
    	box-shadow: 0 2px 12px rgba(0,0,0,.2);
	}
	.copyButton {
		margin: 2em 0;
	}
	.clearfix {
		clear: both;
	}
	.imgContainer {
		display: block;
		width: 72%;
		margin: auto;
	}
	@media (max-width: 578px) {
		.imgContainer {
		width: 80% !important;
		}
	}
	@media (max-width: 380px) {
		.imgContainer {
		width: 85% !important;
		}
	}
`;

export default (): ReactElement => {

	const dispatch = useDispatch();
	
	const resetWallet = () => {
		dispatch(reset());
	}

	const onAddressCopied = () => {
		dispatch(toast({
			message: "Address copied",
			type: "info",
			autoclose: true,
		}));
	}

	const storage = useSelector((state: any) => {
        return {
			currentAddress: state.app.currentAddress,
			transactions: state.app.transactions,
			copied: false,
        };
	});

	return (
		<Profile>
			<Container>
				<div className="imgContainer">
					<div className="image image-left">
					<img src={`https://robohash.org/${storage.currentAddress.toLowerCase()}`}/>
					</div>
					<div className="image image-right">
					<img className="image-qr" src={`https://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=${storage.currentAddress.toLowerCase()}&chld=H|0`}/>
					</div>
					<div className="clearfix"></div>
				</div>
				<p className="desc desc-center">Your Full Address</p>
				<p className="desc desc-center desc--addr">{storage.currentAddress.toLowerCase()}</p>
				
				<div className="copyButton">
					<CopyToClipboard text={storage.currentAddress}>
						<Button onClick={onAddressCopied} icon="copy" theme="blue" text="Copy address" />
					</CopyToClipboard>
				</div>
				
				<div className="line"></div>
				<Confirmation text="Are you sure you want to erase your wallet?">
					<p className="forget" onClick={resetWallet}>
						<i className="fa fa-undo"/>
						Reset wallet
					</p>
				</Confirmation>
				<p className="desc">Clear browser storage and use another wallet</p>
			</Container>
		</Profile>
	);
}
