import styles from '../../styles/components/navBar.module.scss';
import { ReactComponent as Map } from '../../assets/icons/map.svg';
import { ReactComponent as List } from '../../assets/icons/list.svg';
import { ReactComponent as AddToilet } from '../../assets/icons/addToilet.svg';
import { ReactComponent as Profile } from '../../assets/icons/profile.svg';
import { ReactComponent as MapFill } from '../../assets/icons/mapFill.svg';
import { ReactComponent as ListFill } from '../../assets/icons/listFill.svg';
import { ReactComponent as AddToiletFill } from '../../assets/icons/addToiletFill.svg';
import { ReactComponent as ProfileFill } from '../../assets/icons/profileFill.svg';
import { useState } from 'react';
import classNames from 'classnames';
import BottomTabIcon from './BottomTabIcon';

const NavBar = () => {
	const [clickBtn, setClickBtn] = useState(0);
	const onClick = (i) => {
		setClickBtn(i);
	};
	const num = [0, 1, 2, 3];
	return (
		<ul className={styles.nav}>
			<BottomTabIcon
				onClick={(i) => {
					onClick(i);
				}}
				url={'map'}
				text={'지도'}
				num={num}
				className={num[0] === clickBtn ? styles.active : null}
			>
				{num[0] === clickBtn ? <MapFill /> : <Map />}
			</BottomTabIcon>
			<BottomTabIcon
				onClick={(i) => {
					onClick(i);
				}}
				url={'list'}
				text={'목록'}
				className={num[1] === clickBtn ? styles.active : null}
			>
				{num[1] === clickBtn ? <ListFill /> : <List />}
			</BottomTabIcon>
			<BottomTabIcon
				onClick={(i) => {
					onClick(i);
				}}
				url={'addToilet'}
				text={'화장실 추가'}
				className={num[2] === clickBtn ? styles.active : null}
			>
				{num[2] === clickBtn ? <AddToiletFill /> : <AddToilet />}
			</BottomTabIcon>
			<BottomTabIcon
				onClick={(i) => {
					onClick(i);
				}}
				url={'profile'}
				text={'내 프로필'}
				className={num[3] === clickBtn ? styles.active : null}
			>
				{num[3] === clickBtn ? <ProfileFill /> : <Profile />}
			</BottomTabIcon>
		</ul>
	);
};

export default NavBar;
