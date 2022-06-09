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
import BottomTabIcon from './BottomTabIcon';

const NavBar = ({ num }) => {
	return (
		<ul className={styles.nav}>
			<BottomTabIcon url={'map'} text={'지도'}>
				{num[0] === 0 ? <MapFill /> : <Map />}
			</BottomTabIcon>
			<BottomTabIcon url={'list'} text={'목록'}>
				{num[1] === 0 ? <ListFill /> : <List />}
			</BottomTabIcon>
			<BottomTabIcon url={'addToilet'} text={'화장실 추가'}>
				{num[2] === 0 ? <AddToiletFill /> : <AddToilet />}
			</BottomTabIcon>
			<BottomTabIcon url={'profile'} text={'내 프로필'}>
				{num[3] === 0 ? <ProfileFill /> : <Profile />}
			</BottomTabIcon>
		</ul>
	);
};

export default NavBar;
