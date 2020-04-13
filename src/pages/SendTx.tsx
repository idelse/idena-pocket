import * as React from "react";
import { ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatAmount, validateInputAddresses, hexEncode } from "../helpers";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Input from "../components/Input";
import { sendTx } from "../actions";

const SendTx = styled.div`

`;

export default (): ReactElement => {

	const dispatch = useDispatch();

	const storage = useSelector((state: any) => {
        return {
			privateKey: state.app.privateKey,
			balance: state.app.balance,
			currentAddress: state.app.currentAddress,
			transactions: state.app.transactions,
			sending: state.app.sending,
        };
	});

	const { register, handleSubmit, errors } = useForm();
	
	const onTransactionSent = (data) => {
		const to = data.destination;
		const amount = formatAmount(data.amount);
		const payload = data.message !== "" ? "0x"+hexEncode(data.message) : "0x";
		dispatch(sendTx(storage.privateKey, { amount, to, payload }));
	}

	return (
		<SendTx>
			<form onSubmit={handleSubmit(onTransactionSent)}>
				<Input
					name="destination"
					label="Destination address *"
					type="text"
					ref={register({
						validate: destination => validateInputAddresses(destination),
					})}
					error={errors.destination ? "Insert valid destination address" : ""} />
				<Input
					name="amount"
					label="Amount *"
					type="text"
					ref={register({
						validate: amount => {
							amount = formatAmount(amount);
							const fee = 0.0000001;
							return amount > 0 && amount < storage.balance-fee;
						},
					})}
					error={errors.amount ? `Insert valid amount.` : ""} />
				<Input
					name="message"
					label="Attach custom message to your transaction (e.g. receipt id)"
					type="textarea"
					ref={register()}
					error={errors.message ? "Insert valid message" : ""} />
				<Button disabled={storage.sending} type="submit" text="Send" />
			</form>
		</SendTx>
	);
}
