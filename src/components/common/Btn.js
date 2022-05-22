import React from 'react';
import styles from '../../styles/components/defaultBtn.module.scss';

const Btn = ({ text }) => {
	return <button className={styles.btn} /*onClick={onClick}*/>{text}</button>;
};

export default Btn;
