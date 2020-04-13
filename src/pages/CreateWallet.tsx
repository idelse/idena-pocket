import * as React from "react";
import { ReactElement } from "react";
import Wrap from "../components/Wrap";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { updateCreationWalletPassword } from "../actions";

const CreateWallet = styled.div`
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
	
	const onCreationWalletPassword = (data: any) => {
		dispatch(updateCreationWalletPassword(data.password));
		dispatch(push("/show-created-seed"));
	}

	return (
		<Wrap>
			<CreateWallet>
				<h1>Create password</h1>
				<h2>Enter your browser encryption data password.</h2>
				<form onSubmit={handleSubmit(onCreationWalletPassword)}>
					<Input
						name="password"
						ref={register({
							required: true,
							minLength: 8,
						})}
						label="Password (min 8 characters)"
						error={errors.password ? "Password min length is 8 characters" : ""}
						type="password" />
					<Input
						name="password2"
						ref={register({
							validate: password2 => watch('password') === password2
						  })}
						label="Confirm password"
						error={errors.password2 ? "Password must match" : ""}
						type="password" />
					<Button type="submit" text="Create" />
				</form>
			</CreateWallet>
		</Wrap>
	);
};
