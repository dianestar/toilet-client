import React from 'react';
import styles from '../styles/components/searchBox.module.scss';
import { ReactComponent as Hamburger } from "../assets/icons/hamburger.svg";
import { ReactComponent as Search } from '../assets/icons/search.svg';

const SearchBox = () => {
	return (
		<div className={styles.wrapper}>
			<Hamburger className={styles.icon} />
			<span className={styles.position}>서울시 어쩌구 2-16</span>
			<Search className={styles.icon}/>
		</div>
	);
};

export default SearchBox;
