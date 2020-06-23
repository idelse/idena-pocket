import * as React from 'react'
import styled from 'styled-components'
import swal from 'sweetalert'
import { createGlobalStyle } from 'styled-components'
import { colors } from '../libs/helpers'
import { useTranslation } from 'react-i18next'

const GlobalStyle = createGlobalStyle`
	.swal-button {
		border: 0!important;
	}
	.swal-button--confirm {
		background: ${colors.black};
	}
	.swal-button--confirm:hover {
		background: ${colors.darkBlack}!important;
	}
`

const Confirmation = styled.div``

export default (props: any) => {
	const { t } = useTranslation()
	const conftext = t('Confirm')
	const canctext = t('Cancel')

	const text = props.text || t('Are you sure you want to do this?')
	const iconprop = props.icon || 'warning'
	const disabled = !!props.disabled
	const handleClick = async () => {
		if (disabled) return
		const confirmed = await swal(text, {
			icon: iconprop,
			buttons: [canctext, conftext]
		})
		if (confirmed) props.children.props.onClick()
	}
	return (
		<>
			<GlobalStyle />
			<Confirmation>
				{React.cloneElement(props.children, { onClick: handleClick })}
			</Confirmation>
		</>
	)
}
