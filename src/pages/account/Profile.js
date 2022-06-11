import React, { useEffect, useState } from 'react';
import Layout from '../../components/common/Layout';
import styles from '../../styles/pages/profile.module.scss';
import Header from '../../components/common/Header';
import { GET_USERS } from '../../core/_axios/user';
import MenuList from '../../components/common/MenuList';

const Profile = () => {
	const [nickname, setNickname] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [email, setEmail] = useState('');

	const getUsers = async () => {
		const res = await GET_USERS();
		const data = res.data.data;
		setNickname(data.nickname);
		setImageUrl(data.imgUrl);
		setEmail(data.email);
	};

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	const menuList = [
		{ text: '계정 정보 관리', url: 'account/account_info' },
		{ text: '리뷰 관리', url: '' },
		{ text: '개인정보 이용', url: '' },
		{ text: '오픈소스 라이선스', url: '' },
	];
	return (
		<Layout>
			<section>
				<article>
					<Header />
					<div className={styles.profile}>
						<img src={imageUrl} alt="profile" />
						<h2>{nickname}</h2>
						<p>{email}</p>
					</div>
					{menuList.map((menu) => {
						return <MenuList text={menu.text} url={menu.url} />;
					})}
				</article>
			</section>
		</Layout>
	);
};

export default Profile;
