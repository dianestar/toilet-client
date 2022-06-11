import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/components/navBar.module.scss';

const BottomTabIcon = ({ url, children, text }) => {
	const location = useLocation();

	return (
		<li>
			<Link to={`/${url}`} className={styles.icon}>
				{console.log(location.pathname === `/${url}`)}
				{children}
				<span
					className={location.pathname === `/${url}` ? styles.active : null}
				>
					{text}
				</span>
			</Link>
		</li>
	);
};

export default BottomTabIcon;
