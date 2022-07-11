import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Back } from '../../assets/icons/back.svg';
import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg';
import styles from '../../styles/components/header.module.scss';
import NavBar from './NavBar';

const Header = ({ type, text }) => {
	const navigate = useNavigate();
	const [showing, setShowing] = useState(false);
	
	return (
		<>
			<section className={`${styles.header} ${type === "none" ? styles.hasNone : styles.hasIcon}`}>
				{type === "back" && <Back className={styles.icon} onClick={() => {navigate(-1);}} />}
				{type === "hamburger" && <Hamburger className={styles.icon} onClick={() => {setShowing(!showing);}} />}
				<span className={styles[`header-title`]}>{text}</span>
			</section>
			{showing && <NavBar setShowing={setShowing} showing={showing} />}
		</>
	);
};

export default Header;
