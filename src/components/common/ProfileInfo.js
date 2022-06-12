import React, { useEffect, useState } from 'react';
import { GET_USERS } from '../../core/_axios/user';
import styles from '../../styles/components/ProfileInfo.module.scss';

const ProfileInfo = ({ onClick }) => {
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

	return (
		<div className={styles.profile}>
			<img src={imageUrl} alt="profile" onClick={onClick} />
			<h2>{nickname}</h2>
			<p>{email}</p>
		</div>
	);
};

export default ProfileInfo;
