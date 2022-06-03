import React from 'react';
import styles from '../styles/components/searchBox.module.scss';
import { ReactComponent as Search } from '../assets/icons/search.svg';

const SearchBox = () => {
	return (
		<div className={styles.wrapper}>
			<span className={styles.position}>서울시 어쩌구 2-16</span>
			<Search />
		</div>
	);
};

export default SearchBox;
