import * as React from "react";
import { ReactElement } from "react";
import Wrap from "../components/Wrap";
import Container from "../components/Container";
import Progress from "../components/Progress";
import styled from "styled-components";
import Button from "../components/Button";
import { colors } from "../libs/helpers";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { updateCreationWalletPassword } from "../actions";
import { useTranslation } from 'react-i18next';

const CreateWallet = styled.div`
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
	const { t, i18n } = useTranslation();

	const { register, handleSubmit, errors, watch } = useForm();
	const dispatch = useDispatch();
	
	const onCreationWalletPassword = (data: any) => {
		dispatch(updateCreationWalletPassword(data.password));
		dispatch(push("/show-created-seed"));
	}

	return (
		<Wrap>
			<CreateWallet>
				<Progress wide="33"/>
			    <div className="textcontain">
				<h3>{t('Create password')}</h3>
				<p>{t('Enter your browser encryption data password.')}</p>
				</div>
				<Container>
				<form onSubmit={handleSubmit(onCreationWalletPassword)}>
					<Input
						name="password"
						ref={register({
							required: true,
							minLength: 8,
						})}
						label={t('Password (min 8 characters)')}
						error={errors.password ? t('Password min length is 8 characters') : ""}
						type="password" />
					<Input
						name="password2"
						ref={register({
							validate: password2 => watch('password') === password2
						  })}
						label="Confirm password"
						error={errors.password2 ? t('Password must match') : ""}
						type="password" />
					<Button type="submit" text={t('Create')} />
				</form>
				</Container>
			</CreateWallet>
		</Wrap>
	);
};
