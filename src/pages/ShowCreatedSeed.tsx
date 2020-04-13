import * as React from "react";
import { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrap from "../components/Wrap";
import styled from "styled-components";
import { colors } from "../helpers";
import Button from "../components/Button";
import { updatedSeed } from "../actions";

const ShowCreatedSeed = styled.div`
	p {
		margin-bottom: .5em;
	}
	.seed {
		margin-top: 2em;
		background: ${colors.white};
		border: 1px solid ${colors.darkGrey};
		box-sizing: border-box;
		padding: 1em;
		border-radius: 3px;
		position: relative;
		margin-bottom: 1em;
	}
	.seed__text {
		color: transparent;
		text-shadow: 0 0 5px rgba(0,0,0,0.5);
	}
	.seed__click {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: ${colors.black};
		color: ${colors.white};
		display: flex;
		height: 100%;
		opacity: .7;
		align-self: center;
		text-align: center;
		justify-content: center;
		flex-direction: column;
		cursor: pointer;
	}
	.seed--showed .seed__click {
		display: none;
	}
	.seed--showed .seed__text {
		color: ${colors.black};
		text-shadow: none!important;
	}
`;

export default (): ReactElement => {
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);

	const storage = useSelector((state: any) => {
        return {
			password: state.app.creationWallet.password,
			seed: state.app.creationWallet.seed,
        };
    });

	useEffect(() => {
		dispatch(updatedSeed())
	}, []);

	return (
		<Wrap>
			<ShowCreatedSeed>
				<h1>Secret seed phrase</h1>
				<p>Your secret backup phrase makes it easy to backup and restore your account.</p>
				<p>ATTENTION: Never tell anyone this backup phrase. Anyone with this phrase can steal your DNA forever.</p>
				<p>Please write your seed words below and store them in a secure place. These can be used to restore your wallet.</p>
				<div className={`seed ${show ? 'seed--showed' : ''}`}>
					<div onClick={() => setShow(true)} className="seed__click">
						Click here to show seed phrase
					</div>
					<span className="seed__text">{storage.seed.join(' ')}</span>
				</div>
				<Button disabled={!show} to="confirm-seed" text="Next" />
			</ShowCreatedSeed>
		</Wrap>
	);
};
