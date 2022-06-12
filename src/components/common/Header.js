import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Back } from '../../assets/icons/back.svg';
import styles from '../../styles/components/header.module.scss';

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
	);
};

export default Header;
