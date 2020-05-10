import * as React from "react";
import { ReactElement, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Wrap from "../components/Wrap";
import Container from "../components/Container";
import Progress from "../components/Progress";
import styled from "styled-components";
import { colors } from "../libs/helpers";
import Button from "../components/Button";
import { push } from "connected-react-router";
import { updateEncryptedSeed } from "../actions";
import { shuffle } from "../libs/helpers";
import config from "../config";
import { useTranslation } from 'react-i18next';

const ConfirmSeed = styled.div`
	.shuffled-seed {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 1em;
	}
	.shuffled-seed__li {
		background: #dfdfdf;
		color: ${colors.darkBlack};
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
		background: ${colors.grey};
		border: 1px solid ${colors.lightGrey};
		border-radius: 3px;
		flex-wrap: wrap;
		margin-top: 1em;
		margin-bottom: 1em;
		padding: 0.4em;
		box-sizing: border-box;
		min-height: 100px;
		align-items:flex-start;
		align-content:flex-start;
	}
	.fa-times {
	    color: ${colors.lightGrey};
	    padding-left: 0.5em;
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
	.textcontain {
	margin: auto;
	text-align: center;
    margin-bottom: 2em;
	}
	.textcontain p, p {
	color: ${colors.darkGrey};
	text-align: center;
	}
	.extramargin {
	margin-bottom: 2em;
	}
	@media (min-width: 300px) {
		width: 100%;
		margin-top: 3em;
	}
	@media (min-width: 576px) {
		width: 90%;
	    margin-top: 4em;
	}
	@media (min-width: 768px) {
		width: 85%;
	    margin-top: 6em;
	}
	.tickmark {
	margin: auto;
    text-align: center;
    color: ${colors.green};
	}
	.tickmark .fa {
	color: ${colors.darkGreen};
	}
`;

export default (): ReactElement => {
	const { t, i18n } = useTranslation();

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
		setShuffledSeed(shuffledSeed.filter((_, k) => k !== key));
	}

	const onOrderedWordClick = (word, key) => () => {
		setSortedSeed(sortedSeed.filter((_, k) => k !== key));
		setShuffledSeed([ ...shuffledSeed, word ]);
	}

	const onNextButtonClick = () => {
		dispatch(updateEncryptedSeed(sortedSeed, config.derivationPath, storage.password));
		dispatch(push("/"));
	}

	return (
		<Wrap>
			<ConfirmSeed>
				{!sorted && <Progress wide="66"/>}
				{sorted && <h1 className="tickmark">
    			<i className="fa fa-check"></i></h1>}

				<div className="textcontain">
				<h3>{t('Confirm you secret seed')}</h3>
				<p className="extramargin">{t('Please re-enter your seed words and passphrase in full from the previous step. This is to confirm that you have correctly recorded these down.')}</p>
				</div>
				
				<Container>
				<ul className="ordered-seed">
					{sortedSeed.map((word, key) => <li onClick={onOrderedWordClick(word, key)} className={`shuffled-ordered__li`} key={key}>{word} <i className="fa fa-times"></i></li>)}
				</ul>
				<ul className="shuffled-seed">
					{shuffledSeed.map((word, key) => <li onClick={onShuffledWordClick(word, key)} className={`shuffled-seed__li`} key={key}>{word}</li>)}
				</ul>
				<Button disabled={!sorted} onClick={onNextButtonClick} text={t('Next')} icon="arrow-right"/>
				</Container>
			</ConfirmSeed>
		</Wrap>
	);
};
