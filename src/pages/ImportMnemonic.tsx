import * as React from "react";
import { ReactElement } from "react";
import Wrap from "../components/Wrap";
import Container from "../components/Container";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { colors } from "../libs/helpers";
import { useDispatch } from "react-redux";
import { updateEncryptedSeed } from "../actions";
import { push } from "connected-react-router";
const bip39 = require("bip39");

const ImportMnemonic = styled.div`
	form {
		margin-top: 1.2em;
	}
	input, textarea {
		margin-bottom: 1em;
	}
	.textcontain {
	margin: auto;
	text-align: center;
    margin-bottom: 2em;
	}
	.textcontain p {
	color: ${colors.darkGrey};
	}
	@media (min-width: 300px) {
		width: 100%;
		margin-top: 3em;
	}
	@media (min-width: 576px) {
		width: 90%;
	    margin-top: 4em;
	}
	@media (min-width: 768px) {
		width: 85%;
	    margin-top: 6em;
	}
`;

export default (): ReactElement => {

	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			seed: "",
			derivationPath: "m/44'/515'/0'/0/0",
			password: "",
		}
	  });
	const dispatch = useDispatch();

	const onImportSubmit = ({ seed, derivationPath, password }) => {
		dispatch(updateEncryptedSeed(seed.trim().split(" "), derivationPath, password));
		dispatch(push("/"));
	}

	return (
		<Wrap>
			<ImportMnemonic>
				<div className="textcontain">
				<h3>Import an account with a seed phrase</h3>
				<p>Enter your secret phrase to restore the wallet.</p>
				</div>
				<Container>
				<form onSubmit={handleSubmit(onImportSubmit)}>
					<Input
						type="textarea"
						name="seed"
						ref={register({
							validate: seed => bip39.validateMnemonic(seed),
						})}
						error={errors.seed ? "Please, insert valid bip39 seed phrase" : ""}
						label="Seed phrase" />
					<Input
						type="text"
						name="derivationPath"
						ref={register()}
						label="Old users could use m/44'/60'/0'/0/0" />
					<Input
						name="password"
						label="Password local browser encryption"
						type="password"
						ref={register({
							required: true,
							minLength: 8,
						})}
						error={errors.password ? "Password min length is 8 characters" : ""} />
					<Button type="submit" text="Import" />
				</form>
				</Container>
			</ImportMnemonic>
		</Wrap>
	);
};
