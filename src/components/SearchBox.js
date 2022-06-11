import React, { useState } from 'react';
import styles from '../styles/components/searchBox.module.scss';
import { ReactComponent as Hamburger } from '../assets/icons/hamburger.svg';
import { ReactComponent as Search } from '../assets/icons/search.svg';
import NavBar from './common/NavBar';

const SearchBox = () => {
	const [showing, setShowing] = useState(false);
	return (
		<>
			<div className={styles.wrapper}>
				<Hamburger
					className={styles.icon}
					onClick={() => {
						setShowing(!showing);
					}}
				/>
				<span className={styles.position}>서울시 어쩌구 2-16</span>
				<Search className={styles.icon} />
			</div>
			{showing && <NavBar setShowing={setShowing} showing={showing} />}
		</>
	);
};

export default SearchBox;
