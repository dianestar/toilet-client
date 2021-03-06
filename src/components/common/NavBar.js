import styles from '../../styles/components/navBar.module.scss';
import { ReactComponent as Map } from '../../assets/icons/map.svg';
import { ReactComponent as List } from '../../assets/icons/list.svg';
import { ReactComponent as AddToilet } from '../../assets/icons/addToilet.svg';
import { ReactComponent as MapFill } from '../../assets/icons/mapFill.svg';
import { ReactComponent as ListFill } from '../../assets/icons/listFill.svg';
import { ReactComponent as AddToiletFill } from '../../assets/icons/addToiletFill.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import BottomTabIcon from './BottomTabIcon';
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';

const NavBar = ({ setShowing, showing }) => {
	const token = localStorage.getItem('token');

	const navigate = useNavigate();
	const location = useLocation();

	const logout = () => {
		if (token) {
			localStorage.clear();
			navigate('/');
		}
	};

	const goToAccount = () => {
		navigate('/account/profile');
	};

	return (
		<>
			{showing && (
				<section className={styles.navOutSide}>
					<article className={styles.nav}>
						<div className={styles.profile}>
							<Close
								className={styles.close}
								onClick={() => setShowing(!showing)}
							/>

							<ProfileInfo
								onClick={() => {
									goToAccount();
								}}
							/>
						</div>
						<ul className={styles.iconList}>
							<BottomTabIcon url={'map'} text={'지도'}>
								{location.pathname === '/map' ? <MapFill /> : <Map />}
							</BottomTabIcon>

							<BottomTabIcon url={'list'} text={'목록'}>
								{location.pathname === '/list' ? <ListFill /> : <List />}
							</BottomTabIcon>

							<BottomTabIcon url={'add_Toilet'} text={'화장실 추가'}>
								{location.pathname === '/add_Toilet' ? (
									<AddToiletFill />
								) : (
									<AddToilet />
								)}
							</BottomTabIcon>
						</ul>
						<div
							className={styles.logout}
							onClick={() => {
								logout();
							}}
						>
							<p>로그아웃</p>
						</div>
					</article>
				</section>
			)}
		</>
	);
};

export default NavBar;
