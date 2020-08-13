import * as React from 'react'
import { ReactElement } from 'react'
import Wrap from '../components/Wrap'
import Container from '../components/Container'
import styled from 'styled-components'
import Button from '../components/Button'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import { colors } from '../libs/helpers'
import { useDispatch } from 'react-redux'
import { updateEncryptedSeed } from '../actions'
import { push } from 'connected-react-router'
import { useTranslation } from 'react-i18next'
import config from '../config'

const bip39 = require('bip39')

const ImportMnemonic = styled.div`
	form {
		margin-top: 1.2em;
	}
	input,
	textarea {
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
`

export default (): ReactElement => {
	const { t, i18n } = useTranslation()

	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			seed: '',
			derivationPath: config.derivationPath,
			password: ''
		}
	})
	const dispatch = useDispatch()

	const onImportSubmit = ({ seed, derivationPath, password }) => {
		dispatch(
			updateEncryptedSeed(
				seed.trim().split(' '),
				derivationPath,
				password
			)
		)
		dispatch(push('/'))
	}

	return (
		<Wrap>
			<ImportMnemonic>
				<div className='textcontain'>
					<h3>{t('Import an account with a seed phrase')}</h3>
					<p>
						{t('Enter your secret phrase to restore the wallet.')}
					</p>
				</div>
				<Container>
					<form onSubmit={handleSubmit(onImportSubmit)}>
						<Input
							type='textarea'
							name='seed'
							ref={register({
								validate: seed => bip39.validateMnemonic(seed)
							})}
							error={
								errors.seed
									? t(
											'Please, insert valid bip39 seed phrase'
									  )
									: ''
							}
							label={t('Seed phrase')}
						/>
						<Input
							type='text'
							name='derivationPath'
							ref={register()}
							label={t("Old users could use m/44'/60'/0'/0")}
						/>
						<Input
							name='password'
							label={t('Password local browser encryption')}
							type='password'
							ref={register({
								required: true,
								minLength: 8
							})}
							error={
								errors.password
									? t('Password min length is 8 characters')
									: ''
							}
						/>
						<Button type='submit' text={t('Import')} />
					</form>
				</Container>
			</ImportMnemonic>
		</Wrap>
	)
}
