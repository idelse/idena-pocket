import * as React from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../libs/helpers'
import { Link } from 'react-router-dom'

const Button: any = styled.span`
	display: flex;
	justify-content: ${(props: any) => props.align};
	.fa {
		color: ${colors.white};
		float: right;
		padding: 3px 0px;
		margin-left: 1em;
	}
	.btn {
		display: flex;
		justify-content: center;
		background: ${(props: any) => props.theme[0]};
		border-radius: 4px;
		padding: 0.65em 2.5em;
		box-sizing: border-box;
		cursor: pointer;
		text-align: center;
		color: ${colors.white};
		text-decoration: none;
		font-weight: normal;
		font-size: 1.1em;
		transition: all 0.35s ease;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
		@media (min-width: 300px) {
			width: 100%;
		}
		@media (min-width: 768px) {
			width: 320px;
		}
	}
	.btn:hover {
		background: ${(props: any) => props.theme[1]};
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
	}
	.btn:focus {
		background: ${colors.black};
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
	}
	.btn--disabled,
	.btn--disabled:hover {
		background: ${colors.darkGrey};
	}
`

export default (props: {
	onClick?: any
	align?: string
	theme?: string
	type?: string
	to?: string
	disabled?: boolean
	text: string
	icon?: string
}) => {
	const { disabled, text, to, type, ...rest } = props
	const theme = {
		blue: [colors.darkBlue, '#0c9bd2']
	}[props.theme] || [colors.black, colors.darkBlack]
	const align =
		{
			left: 'flex-start',
			right: 'flex-end'
		}[props.align] || 'center'
	if (props.disabled) {
		return (
			<Button align={align} theme={theme}>
				<div className='btn btn--disabled' {...removeEventListener}>
					{text}
					{<i className={`fa fa-${props.icon}`} />}
				</div>
			</Button>
		)
	}
	if (to) {
		return (
			<Button align={align} theme={theme}>
				<Link className='btn' to={to} {...rest}>
					{text}
					{<i className={`fa fa-${props.icon}`} />}
				</Link>
			</Button>
		)
	}
	if (type === 'submit') {
		return (
			<Button align={align} theme={theme}>
				<input className='btn' type='submit' {...rest} value={text} />
			</Button>
		)
	}
	return (
		<Button align={align} theme={theme}>
			<div className='btn' {...rest}>
				{text}
				{<i className={`fa fa-${props.icon}`} />}
			</div>
		</Button>
	)
}
