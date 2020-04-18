import * as React from "react";
import { ReactElement } from "react";
import ThinContainer from "../components/ThinContainer";
import { useSelector } from "react-redux";
import { colors, formatAddress, hexDecode } from "../libs/helpers";
import styled from "styled-components";

const Transactions = styled.div`
	.transactions {
		width: 100%;
		background: ${colors.white};
		border-radius: 5px;
	}
	.transactions li {
		list-style: none;
		border-bottom: 1px solid ${colors.grey};
		text-align: center;
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
	.transactions__li__details {
		padding-top: .5em;
		font-size: .8em;
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
	.transactions__li--green {
		background: ${colors.green};
		-webkit-transition: all .35s ease;
    	-o-transition: all .35s ease;
    	transition: all .35s ease;
	}
	.transactions__li--green a:hover {
		background: ${colors.lightGreen};
	}
	.transactions__li--green .thumbnail img {
		background: ${colors.lightGreen};
	}
	.transactions__li--red {
		background: ${colors.red};
		-webkit-transition: all .35s ease;
    	-o-transition: all .35s ease;
    	transition: all .35s ease;
	}
	.transactions__li--red .thumbnail img {
		background: ${colors.lighterRed};
	}
	.transactions__li--red a:hover {
		background: ${colors.lighterRed};
	}
	.transactions__li--red a:hover span,
	.transactions__li--green a:hover span {
		color: ${colors.black};
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
`;

export default (): ReactElement => {

	const storage = useSelector((state: any) => {
        return {
			currentAddress: state.app.currentAddress,
			transactions: state.app.transactions,
        };
	});

	return (
		<ThinContainer>
		<Transactions>
			{(storage.transactions.length === 0) && <>
				<h1 className="empty">&#128546;</h1>
				<p className="desc">No transactions</p> 
			</>}
			<ul className="transactions">
				{(storage.transactions||[]).map((tx, key) => (
					<li className={tx.from.toLowerCase() === storage.currentAddress.toLowerCase() ? 'transactions__li--red' : 'transactions__li--green'} key={key}>
						<a target="_blank" href={`https://scan.idena.io/tx?tx=${tx.hash}`}>
							<div className="thumbnail">
							{tx.from.toLowerCase() !== storage.currentAddress.toLowerCase() && <img src ={`https://robohash.org/${tx.from.toLowerCase()}`}/>}
							{tx.from.toLowerCase() === storage.currentAddress.toLowerCase() && <img src ={`https://robohash.org/${tx.to.toLowerCase()}`}/>}	
							</div>
							<div className="tx">
							<div className="transactions__li__tx">
								{tx.from.toLowerCase() !== storage.currentAddress.toLowerCase() && <span>{formatAddress(tx.from, 10)}</span>}
								{
									(tx.to.toLowerCase() !== storage.currentAddress.toLowerCase() ||
									(tx.from.toLowerCase() === storage.currentAddress.toLowerCase() && tx.to.toLowerCase() === storage.currentAddress.toLowerCase())) && 
									<span>{formatAddress(tx.to, 10)}</span>
								}
								<span>{tx.amount} DNA <i className={tx.from.toLowerCase() === storage.currentAddress.toLowerCase() ? 'fa fa-arrow-up' : 'fa fa-arrow-down'}/></span>
							</div>
							<span className="transactions__li__details">
								<span>{tx.timestamp.slice(0, 10)}</span>
								{tx.payload === "0x" && <span></span>}
								{tx.payload !== "0x" && <span>{(() => {
									const decoded = hexDecode(tx.payload.slice(2, tx.payload.length-1));
									return decoded.slice(0, 30).concat(decoded.length > 30 ? '...' : '');
								})()}</span>}
							</span>
							</div>
						</a>
					</li>
				))}
			</ul>
		</Transactions>
		</ThinContainer>
	);
}
