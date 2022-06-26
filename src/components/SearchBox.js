import React, { useState, useRef } from 'react';
import styles from '../styles/components/searchBox.module.scss';
import { ReactComponent as Hamburger } from '../assets/icons/hamburger.svg';
import { ReactComponent as Search } from '../assets/icons/search.svg';
import NavBar from './common/NavBar';

const SearchBox = ({keyword, setKeyword, searchMode, setSearchMode, doSearch}) => {
	const inputRef = useRef();

	const [showing, setShowing] = useState(false);
	
	
	const onSubmit = () => {
		console.log(inputRef.current.value);
		// setKeyword(inputRef.current.value);
		doSearch(inputRef.current.value);
		// setSearchMode(false);
	}

	const onKeyPress = (e) => {
		if (e.key === "Enter") {
			onSubmit();
		}
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
				<input placeholder="검색할 주소를 입력하세요" autoFocus ref={inputRef} onKeyPress={onKeyPress}/>
				:
				<span className={styles.position} onClick={() => setSearchMode(true)}>{keyword}</span>
				}
				<Search className={styles.icon} onClick={onSubmit}/>
			</div>
			{showing && <NavBar setShowing={setShowing} showing={showing} />}
		</>
	);
};

export default SearchBox;
