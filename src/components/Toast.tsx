import * as React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from '../actions'
import { colors } from '../libs/helpers'

const Toast = styled.div`
	.toast {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		background: ${colors.darkGreen};
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.toast--success {
		color: #fff;
		background: ${colors.darkGreen};
	}
	.toast--info {
		color: #fff;
		background: ${colors.darkBlue};
	}
	.toast--error {
		color: #fff;
		background: ${colors.darkRed};
	}

	.toast p {
		color: #fff;
	}
	.toast p .fa {
		color: #fff;
	}
`

let timeouts = []

export default () => {
	const dispatch = useDispatch()
	const storage = useSelector((state: any) => ({
		address: state.app.currentAddress,
		message: state.app.toast.message,
		type: state.app.toast.type,
		autoclose: state.app.toast.autoclose
	}))

	useEffect(() => {
		timeouts.forEach(t => clearTimeout(t))
		if (storage.autoclose)
			timeouts = [
				...timeouts,
				setTimeout(() => {
					dispatch(toast({ type: '', message: '' }))
				}, 5000)
			]
	}, [storage.message])

	return (
		<Toast>
			{storage.message && (
				<div className={`toast toast--${storage.type || 'info'}`}>
					{storage.type == 'info' && <p>{storage.message}</p>}
					{storage.type == 'error' && (
						<p>
							<i className='fa fa-ban'></i>
							{storage.message}
						</p>
					)}
					{storage.type == 'success' && (
						<p>
							<i className='fa fa-check'></i>
							{storage.message}
						</p>
					)}
				</div>
			)}
		</Toast>
	)
}
