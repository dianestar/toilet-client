import styles from '../../styles/components/navBar.module.scss';
import { ReactComponent as Map } from '../../assets/icons/map.svg';
import { ReactComponent as List } from '../../assets/icons/list.svg';
import { ReactComponent as AddToilet } from '../../assets/icons/addToilet.svg';
import { ReactComponent as MapFill } from '../../assets/icons/mapFill.svg';
import { ReactComponent as ListFill } from '../../assets/icons/listFill.svg';
import { ReactComponent as AddToiletFill } from '../../assets/icons/addToiletFill.svg';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import BottomTabIcon from './BottomTabIcon';

const NavBar = ({ num }) => {
	return (
		<section className={styles.navOutSide}>
			<article className={styles.nav}>
				<div className={styles.profile}>
					<Close className={styles.close} />
					<img src="/images/KakaoTalk_Photo_2022-04-18-22-19-10 003.jpeg" />
					<h2>jetom</h2>
					<p>jetom@jetom.com</p>
				</div>
				<ul className={styles.iconList}>
					<BottomTabIcon url={'map'} text={'지도'}>
						{num[0] === 0 ? <MapFill /> : <Map />}
					</BottomTabIcon>

					<BottomTabIcon url={'list'} text={'목록'}>
						{num[1] === 0 ? <ListFill /> : <List />}
					</BottomTabIcon>

					<BottomTabIcon url={'addToilet'} text={'화장실 추가'}>
						{num[2] === 0 ? <AddToiletFill /> : <AddToilet />}
					</BottomTabIcon>
				</ul>
				<div
					className={styles.logout}
					onClick={() => {
						console.log('test');
					}}
				>
					<p>로그아웃</p>
				</div>
			</article>
		</section>
	);
};

export default NavBar;
