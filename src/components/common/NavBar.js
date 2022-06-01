import styles from '../../styles/components/navBar.module.scss';
import { ReactComponent as Map } from '../../assets/icons/map.svg';
import { ReactComponent as List } from '../../assets/icons/list.svg';
import { ReactComponent as AddToilet } from '../../assets/icons/addToilet.svg';
import { ReactComponent as Profile } from '../../assets/icons/profile.svg';
import { ReactComponent as MapFill } from '../../assets/icons/mapFill.svg';
import { ReactComponent as AddToiletFill } from '../../assets/icons/addToiletFill.svg';
import { useState } from 'react';

const NavBar = () => {
	const [clickBtn, setClickBtn] = useState(0);
	const onClick = (i) => {
		setClickBtn(i);
	};

	//  <Map /> 지도
	// <List /> 목록
	// <AddToilet /> 화장실 추가
	// <Profile /> 내 프로필

	return (
		<section className={styles.nav}>
			<article></article>
		</section>
	);
};

export default NavBar;
