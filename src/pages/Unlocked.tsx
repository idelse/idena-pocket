import * as React from 'react'
import { ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Wrap from '../components/Wrap'
import Header from '../components/Header'
import styled from 'styled-components'
import { push } from 'connected-react-router'
import { colors, formatNumber, useInterval } from '../libs/helpers'
import { Link } from 'react-router-dom'
import {
	getTransactions,
	getBalance,
	getPrice,
	getNodeStatus
} from '../actions'
import config from '../config'
import { useTranslation } from 'react-i18next'

const Unlocked = styled.div`
	.balance {
		text-align: center;
		display: flex;
		flex-direction: column;
		padding: 2.5em 0;
		border-radius: 4px;
		background: rgb(41, 44, 46);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}
	.balance__value {
		font-size: 1.2em;
		color: ${colors.white};
		font-weight: 500;
		margin: 0 auto 0.5em auto;
		width: 70%;
		word-break: break-all;
	}
	.balance__value__refresh {
		color: ${colors.lightGrey};
		margin-left: 0.5em;
		cursor: pointer;
	}
	.balance__dollar {
		font-size: 1em;
		color: ${colors.darkGrey};
	}
	.menu {
		background: #efefef;
		border-radius: 6em;
		overflow: hidden;
		align-items: center;
		display: flex;
		margin: 1.3em 0px;
		justify-content: space-between;
	}
	.menu__li {
		font-size: 0.9em;
		list-style: none;
		display: flex;
		cursor: pointer;
		flex: 1;
	}
	.menu__li a {
		color: ${colors.black};
		margin: auto;
		padding: 0.5em;
		background: #efefef;
		text-align: center;
		width: 100%;
		text-decoration: none;
	}
	.menu__li--active a {
		background: ${colors.white};
		border-radius: 5em;
		color: ${colors.darkBlack};
		border: 1px solid ${colors.lightGrey};
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}
	.menu__li a:hover {
		color: ${colors.darkBlack};
	}
	.donate {
		text-align: center;
		line-height: 2em;
		padding: 1em 0 4em 0;
		font-size: 0.8em;
		color: ${colors.darkGrey};
	}
	.donate strong {
		font-weight: 400;
		background: ${colors.lightestGrey};
		border-radius: 4px;
		padding: 4px;
	}
`

export default (props): ReactElement => {
	const { t, i18n } = useTranslation()

	const dispatch = useDispatch()

	const storage = useSelector((state: any) => {
		return {
			provider: state.provider,
			pathname: state.router.location.pathname,
			unlocked: state.app.unlocked,
			currentAddress: state.app.currentAddress,
			transactions: state.app.transactions,
			balance: state.app.balance,
			price: state.app.price,
			derivationPath: state.derivationPath
		}
	})

	const refreshAccountState = (showToast = true) => {
		dispatch(getPrice())
		dispatch(getBalance(storage.currentAddress, showToast))
		dispatch(getTransactions(storage.currentAddress, showToast))
		dispatch(getNodeStatus())
	}

	useEffect(() => {
		dispatch(getNodeStatus())
		dispatch(getPrice())
		dispatch(getBalance(storage.currentAddress, false))
		dispatch(getTransactions(storage.currentAddress, false))
		if (!storage.unlocked) dispatch(push('/'))
	}, [storage.unlocked])

	useInterval(() => {
		refreshAccountState(false)
	}, 90000)

	return (
		<Wrap>
			<Header />
			<Unlocked>
				<div className='balance'>
					<span className='balance__value'>
						{formatNumber(storage.balance)} iDNA
						<i
							onClick={() => refreshAccountState()}
							className='balance__value__refresh fa fa-refresh'
						/>
					</span>
					<span className='balance__dollar'>
						${formatNumber(storage.balance * storage.price, 2)}
					</span>
				</div>
				<ul className='menu'>
					{config.menu.map(({ path, name }, key) => (
						<li
							key={key}
							className={`menu__li ${
								storage.pathname === path
									? 'menu__li--active'
									: ''
							}`}
						>
							<Link to={path}>{t(name)}</Link>
						</li>
					))}
				</ul>
				{props.children}
				<p className='donate'>
					{t('Consider supporting idena-pocket by donating to')}{' '}
					<strong>{config.donationAddress}</strong>
				</p>
			</Unlocked>
		</Wrap>
	)
}
