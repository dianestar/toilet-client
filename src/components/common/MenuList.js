import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/menuList.module.scss';
import { ReactComponent as Next } from '../../assets/icons/next.svg';

const MenuList = ({ text, url }) => {
	return (
		<Link className={styles.menu} to={`/${url}`}>
			<p className={styles.text}>{text}</p>
			<Next />
		</Link>
	);
};

export default MenuList;
