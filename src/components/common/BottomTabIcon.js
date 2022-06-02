import { Link } from 'react-router-dom';
import styles from '../../styles/components/navBar.module.scss';

const BottomTabIcon = ({ url, children, text, className }) => {
	return (
		<li>
			<Link to={`/${url}`} className={styles.icon}>
				{children}
				<span className={className}>{text}</span>
			</Link>
		</li>
	);
};

export default BottomTabIcon;
