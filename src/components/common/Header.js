import React from 'react';
import { ReactComponent as Back } from '../../assets/icons/back.svg';
import styles from '../../styles/components/header.module.scss';

const Header = ({ text }) => {
	return (
		<section className={styles.header}>
			<Back />
			<span className={styles[`header-title`]}>{text}</span>
		</section>
	);
};

export default Header;
