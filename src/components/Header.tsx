import * as React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Logo from '../components/Logo'
import { colors } from '../libs/helpers'
import { useTranslation } from 'react-i18next'
import MenuProfile from './MenuProfile'

const Header = styled.div`
	display: flex;
	padding: 1em 0;
	justify-content: space-between;
	align-content: center;
	align-items: center;
	.fa {
		padding-right: 10px;
		color: ${colors.darkRed};
	}
	.darkbg {
		width: 100%;
		z-index: -10;
		height: 28em;
		top: 0;
		left: 0;
		background-color: ${colors.medBlack};
		position: absolute;
	}
	.logout {
		cursor: pointer;
		color: ${colors.darkRed};
	}
	.logout:hover,
	.logout:hover * {
		color: ${colors.white};
	}
`

export default () => {
	const dispatch = useDispatch()
	const { t, i18n } = useTranslation()
	const storage = useSelector((state: any) => ({
		idena: state.app.idena,
		address: state.app.currentAddress
	}))

	return (
		<Header>
			<div className='darkbg'></div>
			<Logo theme='light' width={50} />
			<MenuProfile />
		</Header>
	)
}
