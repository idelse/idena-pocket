import * as React from 'react'
import { ReactElement, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrap from '../components/Wrap'
import Container from '../components/Container'
import Progress from '../components/Progress'
import styled from 'styled-components'
import { colors } from '../libs/helpers'
import Button from '../components/Button'
import { updatedSeed } from '../actions'
import { useTranslation } from 'react-i18next'

const ShowCreatedSeed = styled.div`
	p {
		margin-bottom: 0.5em;
	}
	.seed {
		background: ${colors.grey};
		border: 1px solid ${colors.lightGrey};
		box-sizing: border-box;
		padding: 1em;
		height: 15vh;
		border-radius: 3px;
		position: relative;
		word-wrap: break-word;
		margin-bottom: 1em;
	}
	.seed__text {
		color: transparent;
		text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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
		opacity: 0.7;
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
		text-shadow: none !important;
	}
	.textcontain {
		margin: auto;
		text-align: center;
		margin-bottom: 2em;
	}
	.textcontain p,
	p {
		color: ${colors.darkGrey};
		text-align: center;
	}
	.extramargin {
		margin-bottom: 2em;
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

	const dispatch = useDispatch()

	const [show, setShow] = useState(false)

	const storage = useSelector((state: any) => {
		return {
			password: state.app.creationWallet.password,
			seed: state.app.creationWallet.seed
		}
	})

	useEffect(() => {
		dispatch(updatedSeed())
	}, [])

	return (
		<Wrap>
			<ShowCreatedSeed>
				<Progress wide='66' />
				<div className='textcontain'>
					<h3>{t('Secret seed phrase')}</h3>
					<p className='extramargin'>
						{t(
							'Your secret backup phrase makes it easy to backup and restore your account.'
						)}
					</p>
				</div>
				<p>
					<strong>{t('ATTENTION:')}</strong>{' '}
					{t(
						'Never tell anyone this backup phrase. Anyone with this phrase can steal your iDNA forever.'
					)}
				</p>
				<p className='extramargin'>
					{t(
						'Please write your seed words below and store them in a secure place. These can be used to restore your wallet.'
					)}
				</p>
				<Container>
					<div className={`seed ${show ? 'seed--showed' : ''}`}>
						<div
							onClick={() => setShow(true)}
							className='seed__click'
						>
							{t('Click here to show seed phrase')}
						</div>
						<span className='seed__text'>
							{storage.seed.join('  ')}
						</span>
					</div>
					<Button
						disabled={!show}
						to='confirm-seed'
						text={t('Next')}
						icon='arrow-right'
					/>
				</Container>
			</ShowCreatedSeed>
		</Wrap>
	)
}
