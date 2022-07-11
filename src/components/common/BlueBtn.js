import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/components/bluebtn.module.scss';

const BlueBtn = ({ text, active = true, onClick }) => {
	return (
		<button
			className={`${styles.btn} ${active ? styles.enabled : styles.disabled}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default BlueBtn;
