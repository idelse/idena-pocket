import * as React from 'react'
import styled from 'styled-components'
import { colors, useOnClickOutside } from '../libs/helpers'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useRef, useState } from 'react'

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
		border-radius: 0.5em;
		background: rgb(0, 0, 0, 0.95);
		position: absolute;
		top: 60px;
		right: 0;
		width: 300px;
		list-style-type: none;
	}
`

function MenuProfile () {
	const dispatch = useDispatch()
	const { t, i18n } = useTranslation()
	const storage = useSelector((state: any) => ({
		idena: state.app.idena,
		address: state.app.currentAddress
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
						src={`https://robohash.org/${storage.address.toLowerCase()}`}
					/>
				</div>
				{menuIsOpen && (
					<ul className='menu'>
						<li>
							<a href='#'>Link 1</a>
						</li>
						<li>
							<a href='#'>Link 2</a>
						</li>
						<li>
							<a href='#'>Link 3</a>
						</li>
						<li>
							<a href='#'>Link 4</a>
						</li>
					</ul>
				)}
			</div>
		</Container>
	)
}

export default MenuProfile
