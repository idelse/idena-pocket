import * as React from "react";
import { ReactElement } from "react";
import Wrap from "../components/Wrap";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateEncryptedSeed } from "../actions";
import { push } from "connected-react-router";
const bip39 = require("bip39");

const ImportMnemonic = styled.div`
	form {
		margin-top: 2em;
	}
	input, textarea {
		margin-bottom: 1em;
	}
`;

export default (): ReactElement => {

	const { register, handleSubmit, errors, watch } = useForm();
	const dispatch = useDispatch();

	const onImportSubmit = ({ seed, password }) => {
		dispatch(updateEncryptedSeed(seed.trim().split(" "), password));
		dispatch(push("/"));
	}

	return (
		<Wrap>
			<ImportMnemonic>
				<h1>Import an account with a seed phrase</h1>
				<h2>Enter your twelve-word secret phrase to restore the wallet.</h2>
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
			</ImportMnemonic>
		</Wrap>
	);
};
