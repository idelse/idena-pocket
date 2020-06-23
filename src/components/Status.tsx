import * as React from 'react'
import styled from 'styled-components'
import { colors } from '../libs/helpers'
import { useTranslation } from 'react-i18next'

const Status = styled.div`
	.status a {
		text-align: center;
		padding: 0.6em;
		font-weight: bold;
		font-size: 0.8em;
		text-decoration: none;
		border-radius: 4px;
	}
	.status--up a {
		background: #ccff90;
		color: #699a0a;
	}
	.status--down a {
		background: #ffccbc;
		color: ${colors.darkRed};
	}
`

export default (props: any) => {
	const { t } = useTranslation()

	if (props.state === 'up') {
		return (
			<Status>
				<span className='status status--up'>
					<a target='_blank' href='http://status.idena.dev/'>
						{t('RPC node is')} {t('UP')} ({t('latest block')}{' '}
						{props.block})
					</a>
				</span>
			</Status>
		)
	}

	if (props.state === 'down') {
		return (
			<Status>
				<span className='status status--down'>
					<a target='_blank' href='http://status.idena.dev/'>
						{t('RPC node is')} {t('DOWN')}
					</a>
				</span>
			</Status>
		)
	}
}
