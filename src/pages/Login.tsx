import * as React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import Logo from '../components/Logo'
import Button from '../components/Button'
import Confirmation from '../components/Confirmation'
import Wrap from '../components/Wrap'
import Container from '../components/Container'
import Or from '../components/OrSeparator'
import { useSelector, useDispatch } from 'react-redux'
import Input from '../components/Input'
import { useForm } from 'react-hook-form'
import { retrieveEncryptedSeed, unlock } from '../actions'
import { AES, enc } from 'crypto-js'
import { push } from 'connected-react-router'
import { reset } from '../actions'
import config from '../config'
import { useTranslation } from 'react-i18next'

const Login = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	height: 100vh;
	* {
		padding: 0.5em 0;
	}
	.title {
		font-size: 1.7em;
		font-family: 'Inter', sans-serif;
		margin-bottom: 0em;
		font-weight: 400;
	}
	.extrapadding {
		padding-bottom: 2em;
		font-size: 1em;
	}
	.forget {
		text-align: center;
		margin: auto;
		cursor: pointer;
		margin-top: 1em;
	}
	.forget .fa {
		padding-right: 1em;
	}
`

export default () => {
	const { t, i18n } = useTranslation()
	const { register, handleSubmit, errors } = useForm()
	const dispatch = useDispatch()

	const storage = useSelector((state: any) => {
		return {
			encryptedSeed: state.app.encryptedSeed,
			derivationPath:
				state.app.derivationPath || config.oldDerivationPath,
			unlocked: state.app.unlocked
		}
	})

	const resetWallet = () => {
		dispatch(reset())
	}

	useEffect(() => {
		if (storage.unlocked) dispatch(push('/unlocked'))
	}, [storage.unlocked])

	useEffect(() => {
		dispatch(retrieveEncryptedSeed())
	}, [])

	const onLogin = (data: any) => {
		const bytes = AES.decrypt(storage.encryptedSeed, data.password)
		const seed = JSON.parse(bytes.toString(enc.Utf8))
		dispatch(unlock(seed, storage.derivationPath))
	}

	return (
		<Wrap>
			<Login>
				<Logo width={100} />
				<h1 className='title'>{t('idena-pocket')}</h1>
				<p className='description extrapadding'>
					{t('web-wallet for Idena')}
				</p>

				<Container>
					{!storage.encryptedSeed && (
						<Button
							to='import-mnemonic'
							text={t('Import mnemonic')}
							icon='arrow-right'
						/>
					)}
					{!storage.encryptedSeed && <Or />}

					{!storage.encryptedSeed && (
						<Button
							to='create-wallet'
							text={t('Create wallet')}
							icon='arrow-right'
						/>
					)}
					{storage.encryptedSeed && (
						<form onSubmit={handleSubmit(onLogin)}>
							<Input
								name='password'
								ref={register({
									required: true,
									validate: password => {
										try {
											const bytes = AES.decrypt(
												storage.encryptedSeed,
												password
											)
											const seed = JSON.parse(
												bytes.toString(enc.Utf8)
											)
											return seed.length >= 12
										} catch (e) {
											return false
										}
									}
								})}
								label={t('Enter your password')}
								error={
									errors.password
										? t('Wrong password. Please try again.')
										: ''
								}
								type='password'
							/>
							<Button type='submit' text={t('Login')} />
						</form>
					)}
					{storage.encryptedSeed && (
						<Confirmation
							text={t(
								'Are you sure you want to erase your wallet?'
							)}
						>
							<p className='forget' onClick={resetWallet}>
								<i className='fa fa-unlock-alt' />
								{t('Use a different wallet')}
							</p>
						</Confirmation>
					)}
				</Container>
			</Login>
		</Wrap>
	)
}
