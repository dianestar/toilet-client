import React, { useState, useRef } from 'react';
import styles from '../styles/components/searchBox.module.scss';
import { ReactComponent as Hamburger } from '../assets/icons/hamburger.svg';
import { ReactComponent as Search } from '../assets/icons/search.svg';
import NavBar from './common/NavBar';

const SearchBox = ({keyword, searchMode, noResult, candidates, setSearchMode, doSearch, confirmSearch}) => {
	const inputRef = useRef();
	const [showing, setShowing] = useState(false);

	const [timer, setTimer] = useState(null);
	const debouncedChange = (e) => {
		if (timer) { clearTimeout(timer); }
		setTimer(setTimeout(() => {
			if (e.target.value === "") { setSearchMode(false); }
			else { doSearch(e.target.value); }
		}, 500));
	}

	return (
		<>
			<div className={styles.wrapper}>
				<Hamburger
					className={styles.icon}
					onClick={() => {
						setShowing(!showing);
					}}
				/>
				{searchMode
				?
				<input placeholder="검색할 주소를 입력하세요" autoFocus ref={inputRef} onChange={debouncedChange} />
				:
				<span className={styles.position} onClick={() => setSearchMode(true)}>{keyword}</span>
				}
				<Search className={styles.icon}/>
			</div>
			{searchMode &&
			<section id="dropdown" className={styles.dropdown}>
				{noResult && <p className={styles[`no-result`]}>검색 결과가 존재하지 않습니다</p>}
				{candidates.map((v, i) => (
					<article key={i} className={styles.candidates} onClick={() => confirmSearch(v.address_name)}>
						<p className={styles.place}>{v.place_name}</p>
						<p className={styles.address}>{v.road_address_name}</p>
						<hr />
					</article>
				))}
				<article id="pages" className={styles.pages}>
				</article>
			</section>
			}
			{showing && <NavBar setShowing={setShowing} showing={showing} />}
		</>
	);
};

export default SearchBox;
