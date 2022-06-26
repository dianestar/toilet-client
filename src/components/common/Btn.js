import React from 'react';
import styles from '../../styles/components/defaultBtn.module.scss';
import classNames from 'classnames';

const Btn = ({ text, color = false }) => {
	return (
		<button
			className={classNames(
				styles.btn,
				`${color ? styles.color : null}`,
			)} /*onClick={onClick}*/
		>
			{text}
		</button>
	);
};

export default Btn;
