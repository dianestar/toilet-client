import React, { useState } from 'react';
import { ReactComponent as Back } from '../../assets/icons/back.svg';
import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg';
import styles from '../../styles/components/header.module.scss';
import NavBar from './NavBar';

const Header = ({ type, text }) => {
	const [showing, setShowing] = useState(false);
	return (
		<>
			<section className={styles.header}>
				{type === 'back' ? (
					<Back />
				) : (
					<Hamburger
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
