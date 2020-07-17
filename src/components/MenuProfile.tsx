import * as React from 'react'
import styled from 'styled-components'
import { colors, useOnClickOutside, formatAddress } from '../libs/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useRef, useState } from 'react'
import { changeAddress, lock } from '../actions'

const Container = styled.div`
	.wrap {
		position: relative;
	}
	.robohash {
		background: rgb(41, 44, 46);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		width: 40px;
		height: 40px;
		padding: 5px;
		border-radius: 50%;
		border: 2px solid ${colors.black};
		cursor: pointer;
	}
	.robohash:hover {
		background: ${colors.black};
	}
	.robohash > img {
		height: 40px;
	}
	.menu {
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		border-radius: 0.5em;
		background: rgb(0, 0, 0, 0.95);
		position: absolute;
		top: 60px;
		right: 0;
		list-style-type: none;
	}
	.menu li:first-child {
		border-radius: 0.5em 0.5em 0 0;
	}
	.menu li:last-child {
		border-radius: 0 0 0.5em 0.5em;
	}
	.menu li {
		padding: 0 .5em 0 1em;
		min-height: 60px;
		align-items: center;
		justify-content: space-between;
		display: flex;
		width: 200px;
		cursor: pointer;
	}
	.menu li:hover {
		background: ${colors.grey};
	}
	.menu-li--current {
		color: ${colors.white};
	}
	li:hover .menu-li--current {
		color: ${colors.black};
	}
	.robohash--menu {
		width: 40px;
		height: 40px;
		padding: 5px;
		border-radius: 50%;
		cursor: pointer;
	}
	.robohash--menu > img {
		height: 40px;
	}
`

function MenuProfile () {
	const dispatch = useDispatch()
	const { t, i18n } = useTranslation()
	const storage = useSelector((state: any) => ({
		numberOfShowedAddresses: state.app.numberOfShowedAddresses,
		idena: state.app.idena,
		currentAddress: state.app.currentAddress,
		currentAddressIndex: state.app.currentAddressIndex,
		addresses: state.app.addresses,
	}))
	const ref = useRef()
	const [menuIsOpen, toggleMenu] = useState(false)
	useOnClickOutside(ref, () => toggleMenu(false))

	return (
		<Container>
			<div ref={ref} className='wrap'>
				<div
					onClick={() => toggleMenu(!menuIsOpen)}
					className='robohash'
				>
					<img
						src={`https://robohash.org/${storage.currentAddress.toLowerCase()}`}
					/>
				</div>
				{menuIsOpen && (
					<ul className='menu'>
						{storage.addresses.slice(0, storage.numberOfShowedAddresses).map((address, index) => <li onClick={() => {
							dispatch(changeAddress(index))
							toggleMenu(!menuIsOpen)
						}} key={index}>
							<span className={`address ${index === storage.currentAddressIndex ? 'menu-li--current' : ''}`}>Account {index+1}</span>
							<div className='robohash--menu'>
								<img
									src={`https://robohash.org/${address.toLowerCase()}`}
								/>
							</div>
						</li>)}

						<li onClick={() => dispatch(lock())}>
							<span className='logout' >{t('Logout')}</span>
						</li>

					</ul>
				)}
			</div>
		</Container>
	)
}

export default MenuProfile
