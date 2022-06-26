<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
>>>>>>> 027be5dbf86c7db4a4e6feb787bf1cd76afc114e
import { ReactComponent as Back } from '../../assets/icons/back.svg';
import { ReactComponent as Hamburger } from '../../assets/icons/hamburger.svg';
import styles from '../../styles/components/header.module.scss';
import NavBar from './NavBar';

<<<<<<< HEAD
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
=======
const Header = ({ text }) => {
	const navigate = useNavigate();
	return (
		<section className={styles.header}>
			<Back
				onClick={() => {
					navigate(-1);
				}}
			/>
			<span className={styles[`header-title`]}>{text}</span>
		</section>
>>>>>>> 027be5dbf86c7db4a4e6feb787bf1cd76afc114e
	);
};

export default Header;
