import * as React from 'react'
import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { colors, formatAddress, hexDecode, formatNumber } from '../libs/helpers'
import styled from 'styled-components'
import Container from '../components/Container'
import { useTranslation } from 'react-i18next'

const Transactions = styled.div`
	.transactions {
		background: ${colors.white};
	}
	.transactions li {
		list-style: none;
		border-bottom: 1px solid ${colors.grey};
		text-align: center;
		font-size: .9em;
	}
	.transactions li a {
		display: flex;
		flex-direction: initial;
		padding: 0.6em;
		text-decoration: none;
		display: flex;
		justify-content: space-around;
	}
	.transactions li a > * {
		width: 100%;
	}
	.transactions li a .fa {
		float: right;
		margin-left: 0.5em;
	}
	.transactions__li__details {
		padding-top: .5em;
		font-size: .7em;
		text-align: left;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.transactions__li__details span:last-child {
		color: ${colors.darkGrey};
	}
	.transactions__li__tx {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.transactions__li--received {
		background: ${colors.green};
		-webkit-transition: all .35s ease;
    	-o-transition: all .35s ease;
    	transition: all .35s ease;
	}
	.transactions__li--received a:hover {
		background: ${colors.lightGreen};
	}
	.transactions__li--received .thumbnail img {
		background: ${colors.lightGreen};
	}
	.transactions__li--sent {
		background: ${colors.red};
		-webkit-transition: all .35s ease;
    	-o-transition: all .35s ease;
    	transition: all .35s ease;
	}
	.transactions__li--sent .thumbnail img {
		background: ${colors.lighterRed};
	}
	.transactions__li--sent a:hover {
		background: ${colors.lighterRed};
	}
	.transactions__li--sent a:hover span,
	.transactions__li--received a:hover span {
		color: ${colors.black};
	}
	.transactions__li--pending {
		background: ${colors.grey};
	}
	.transactions__li--pending .thumbnail img {
		background: ${colors.darkGrey};
	}
	.transactions__li--pending a:hover {
		background: ${colors.darkGrey};
	}
	.transactions__li--pending a:hover span,
		color: ${colors.darkGrey};
	}
	.desc {
	margin: auto;
	text-align: center;
	margin-bottom: 2em;
	}
	.empty {
	margin: auto;
	margin-top: 1em;
	text-align: center;
	}
	.empty fa {
		color: ${colors.red};
	}

	.thumbnail {
		width: 9% !important;
    	height: inherit;
    	float: left;
    	padding-right: 15px;
    	display: block;
	}
	.thumbnail img {
		width: 90%;
		margin-top: 2px;
		border-radius: 4em;
	}
	.tx {
		width: 89% !important;
		float: right;
		display: block;
	}
	.transactions__li__amount {
		font-weight: 600;
		font-size: 0.8em;
	}
	.transactions__li__amount .transactions__li__currency {
		font-weight: inherit;
	}
	@media (max-width: 991px) {
		.thumbnail {
		display: none;
		width: 0% !important;
		float: none;
		}
		.tx {
		width: 100% !important;
		display: block;
		float: none;
		}
		.transactions li a {
		flex-direction: column;
		padding: 1em;
		}
	}
`

export default (): ReactElement => {
	const { t, i18n } = useTranslation()

	const storage = useSelector((state: any) => {
		return {
			currentAddress: state.app.currentAddress,
			transactions: state.app.transactions
		}
	})

	return (
		<Container paddingHalving={2}>
			<Transactions>
				{storage.transactions.length === 0 && (
					<>
						<h1 className='empty'>&#128546;</h1>
						<p className='desc'>{t('No transactions')}</p>
					</>
				)}
				<ul className='transactions'>
					{(storage.transactions || []).map((tx, key) => (
						<li
							className={`
							${
								tx.from.toLowerCase() ===
								storage.currentAddress.toLowerCase()
									? 'transactions__li--sent'
									: 'transactions__li--received'
							}
							${tx.pending ? 'transactions__li--pending' : ''}
						`}
							key={key}
						>
							<a
								target={tx.pending ? '_self' : '_blank'}
								href={
									tx.pending
										? '#/unlocked/transactions'
										: `https://scan.idena.io/transaction/${tx.hash}`
								}
							>
								<div className='thumbnail'>
									{tx.from.toLowerCase() !==
										storage.currentAddress.toLowerCase() && (
										<img
											src={`https://robohash.org/${tx.from.toLowerCase()}`}
										/>
									)}
									{tx.from.toLowerCase() ===
										storage.currentAddress.toLowerCase() && (
										<img
											src={`https://robohash.org/${tx.to.toLowerCase()}`}
										/>
									)}
								</div>
								<div className='tx'>
									<div className='transactions__li__tx'>
										{tx.from.toLowerCase() !==
											storage.currentAddress.toLowerCase() && (
											<span>
												{formatAddress(tx.from, 6)}
											</span>
										)}
										{(tx.to.toLowerCase() !==
											storage.currentAddress.toLowerCase() ||
											(tx.from.toLowerCase() ===
												storage.currentAddress.toLowerCase() &&
												tx.to.toLowerCase() ===
													storage.currentAddress.toLowerCase())) && (
											<span>
												{formatAddress(tx.to, 6)}
											</span>
										)}
										<span className='transactions__li__amount'>
											{formatNumber(tx.amount)}{' '}
											<span className='transactions__li__currency'>
												IDNA
											</span>{' '}
											<i
												className={
													tx.from.toLowerCase() ===
													storage.currentAddress.toLowerCase()
														? 'fa fa-arrow-up'
														: 'fa fa-arrow-down'
												}
											/>
										</span>
									</div>
									<span className='transactions__li__details'>
										<span>
											{tx.pending
												? 'Pending...'
												: tx.timestamp.slice(0, 10)}
										</span>
										{tx.payload === '0x' && <span></span>}
										{tx.payload !== '0x' && (
											<span>
												{(() => {
													const decoded = hexDecode(
														tx.payload.slice(
															2,
															tx.payload.length
														)
													)
													return decoded
														.slice(0, 30)
														.concat(
															decoded.length > 30
																? '...'
																: ''
														)
												})()}
											</span>
										)}
									</span>
								</div>
							</a>
						</li>
					))}
				</ul>
			</Transactions>
		</Container>
	)
}
