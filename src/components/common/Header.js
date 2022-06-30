import React, { useState } from 'react';
import { ReactComponent as Back } from '../../assets/icons/back.svg';
import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg';
import styles from '../../styles/components/header.module.scss';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const Header = ({ type, text }) => {
	const [showing, setShowing] = useState(false);
	const navigate = useNavigate();
	return (
		<>
			<section className={styles.header}>
				{type === 'back' ? (
					<Back onClick={() => navigate(-1)} className={styles.pointer} />
				) : (
					<Hamburger
						className={styles.pointer}
						onClick={() => {
							setShowing(!showing);
						}}
					/>
				)}
				<span className={styles[`header-title`]}>{text}</span>
			</section>
			{showing && <NavBar setShowing={setShowing} showing={showing} />}
		</>
	);
};

export default Header;
