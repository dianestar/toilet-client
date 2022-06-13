import React from 'react';
import { ReactComponent as Back } from '../../assets/icons/back.svg';
import { ReactComponent as Hamburger } from "../../assets/icons/hamburger.svg";
import styles from '../../styles/components/header.module.scss';

const Header = ({ type, text }) => {
	return (
		<section className={styles.header}>
			{type == "back" 
			?
			<Back />
			:
			<Hamburger />
			}
			<span className={styles[`header-title`]}>{text}</span>
		</section>
	);
};

export default Header;
