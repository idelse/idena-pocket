import * as React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Wrap from "../components/Wrap";
import { useSelector, useDispatch } from "react-redux";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { retrieveEncryptedSeed, unlock } from "../actions";
import { shuffle, colors } from "../helpers";
import { AES, enc } from "crypto-js";
import { push } from "connected-react-router";

const Login = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	height: 80vh;
	* {
		padding: .5em 0;
	}
	.greyback {
		background: ${colors.grey};
		width: 38px;
    	display: block;
    	z-index: 999;
	}
	.description {
		text-align: center;
		padding: 0px 10px;
		color: ${colors.darkGrey};
		background: ${colors.grey};
	}
	.title {
		font-size: 1.7em;
		font-family: 'Inter',sans-serif;
		margin-bottom: 0em;
		font-weight: 400;
	}
	.separator {
		width: 225px;
		border-bottom: 1px solid ${colors.darkGrey};
		margin-top: -34px;
	    margin-bottom: 10px;
	}
	.extrapadding {
		padding-bottom: 2em;
		font-size: 1em;
	}
`;

export default () => {

	const { register, handleSubmit, errors } = useForm();
	const dispatch = useDispatch();

	const placeholder = shuffle([
		"follow the white rabbit",
		"the matrix has you",
		"digital pimp at work",
		"he is the one",
		"dodge this",
		"I know kung fu",
	])[0];

	const storage = useSelector((state: any) => {
        return {
			encryptedSeed: state.app.encryptedSeed,
			unlocked: state.app.unlocked,
        };
	});

	useEffect(() => {
		if (storage.unlocked)
			dispatch(push("/unlocked"))
	}, [storage.unlocked]);

	useEffect(() => {
		dispatch(retrieveEncryptedSeed());
	}, []);

	const onLogin = (data: any) => {
		const bytes =  AES.decrypt(storage.encryptedSeed, data.password);
		const seed = JSON.parse(bytes.toString(enc.Utf8));
		dispatch(unlock(seed));
	}
	
	return (
		<Wrap>
			<Login>
				<Logo width={100} />
				<h1 className="title">Idena-pocket</h1>
				<p className="description extrapadding">Web-wallet for Idena</p>

				{!storage.encryptedSeed && <Button to="import-mnemonic" text="Import mnemonic" />}
				{!storage.encryptedSeed && <span className="greyback"><p className="description">Or</p></span><span className="separator"></span>}

				{!storage.encryptedSeed && <Button to="create-wallet" text="Create wallet" />}
				{storage.encryptedSeed && <form onSubmit={handleSubmit(onLogin)}>
					<Input
						name="password"
						ref={register({
							required: true,
							validate: password => {
								try {
									const bytes =  AES.decrypt(storage.encryptedSeed, password);
									const seed = JSON.parse(bytes.toString(enc.Utf8));
									return seed.length === 12;
								} catch(e) {
									return false;
								}
							},
						})}
						placeholder={placeholder}
						label="Password"
						error={errors.password ? "Wrong password" : ""}
						type="password" />
					<Button type="submit" text="Login" />
				</form>}
			</Login>
		</Wrap>
	);
};
