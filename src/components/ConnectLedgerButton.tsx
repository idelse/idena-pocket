import * as React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Button from "./Button";
import Confirmation from "./Confirmation";
import {useDispatch } from "react-redux";
import { connectLedger } from '../actions'
import swal from "sweetalert";

const ConnectLedgerButton = styled.div`
`

export default () => {
	const { t } = useTranslation()
	const dispatch = useDispatch()
	return (
		<ConnectLedgerButton>
			<Confirmation
				text={t('ledger_connect_confirmation')}
			>
				<Button
					onClick={async () => {
						dispatch(connectLedger())
					}}
					text={t('Connect Ledger')}
					icon='arrow-right'
				/>
			</Confirmation>
		</ConnectLedgerButton>
	)
}
