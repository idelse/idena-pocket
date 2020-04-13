import * as React from "react";
import { ReactElement, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrap from "../components/Wrap";
import styled from "styled-components";
import { colors } from "../helpers";
import Button from "../components/Button";
import { push } from "connected-react-router";
import { updateEncryptedSeed } from "../actions";
import { shuffle } from "../helpers";

const ConfirmSeed = styled.div`
	.shuffled-seed {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 1em;
	}
	.shuffled-seed__li {
		background: ${colors.darkGrey};
		color: ${colors.black};
		padding: .5em 1em;
		margin: .2em;
		border-radius: 3px;
		list-style: none;
		cursor: pointer;
	}
	.shuffled-seed li:hover, .shuffled-seed__li--activate  {
		background: ${colors.black};
		color: ${colors.white};
	}
	.ordered-seed {
		display: flex;
		background: #fff;
		border: 1px solid ${colors.darkGrey};
		border-radius: 3px;
		flex-wrap: wrap;
		margin-top: 1em;
		margin-bottom: 1em;
		padding: 1em;
		box-sizing: border-box;
		min-height: 100px;
		align-items:flex-start;
		align-content:flex-start;
	}
	.shuffled-ordered__li {
		align-self:stretch;
		height: auto;
		background: ${colors.black};
		color: ${colors.white};
		padding: .5em 1em;
		margin: .2em;
		border-radius: 3px;
		list-style: none;
		cursor: pointer;
		list-style: none;
	}
`;

export default (): ReactElement => {

	const dispatch = useDispatch();

	const storage = useSelector((state: any) => {
        return {
			password: state.app.creationWallet.password,
			seed: state.app.creationWallet.seed,
        };
    });

	const [sortedSeed, setSortedSeed] = useState([]);
	const [shuffledSeed, setShuffledSeed] = useState([]);
	
	const [sorted, setSorted] = useState(false);
	
	useEffect(() => {
		setShuffledSeed(shuffle(storage.seed));
	}, []);

	useEffect(() => {
		setSorted(JSON.stringify(sortedSeed) === JSON.stringify(storage.seed));
	}, [sortedSeed]);

	const onShuffledWordClick = (word, key) => () => {
		setSortedSeed([ ...sortedSeed, word ]);
		setShuffledSeed(shuffledSeed.filter((w, key) => w !== word && w !== key));
	}

	const onOrderedWordClick = (word, key) => () => {
		setSortedSeed(sortedSeed.filter((w, k) => w !== word && k !== key));
		setShuffledSeed([ ...shuffledSeed, word ]);
	}

	const onNextButtonClick = () => {
		dispatch(updateEncryptedSeed(sortedSeed, storage.password));
		dispatch(push("/"));
	}

	return (
		<Wrap>
			<ConfirmSeed>
				<h1>Confirm you secret seed</h1>
				<p>Please re-enter your seed words and passphrase in full from the previous step. This is to confirm that you have correctly recorded these down.</p>
				<ul className="ordered-seed">
					{sortedSeed.map((word, key) => <li onClick={onOrderedWordClick(word, key)} className={`shuffled-ordered__li`} key={key}>{word}</li>)}
				</ul>
				<ul className="shuffled-seed">
					{shuffledSeed.map((word, key) => <li onClick={onShuffledWordClick(word, key)} className={`shuffled-seed__li`} key={key}>{word}</li>)}
				</ul>
				<Button disabled={!sorted} onClick={onNextButtonClick} text="Next" />
			</ConfirmSeed>
		</Wrap>
	);
};
