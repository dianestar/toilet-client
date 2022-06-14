import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import ProfileInfo from '../../components/common/ProfileInfo';
import { useEffect, useState } from 'react';
import { GET_USERS } from '../../core/_axios/user';
import EditText from '../../components/common/EditText';
import { useNavigate } from 'react-router';

const AccountInfo = () => {
	const [nickname, setNickname] = useState('');
	const [email, setEail] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const navigate = useNavigate();

	const getUserInfo = async () => {
		const res = await GET_USERS();
		try {
			if (res) {
				const data = res.data.data;
				setNickname(data.nickname);
				setEail(data.email);
				setImgUrl(data.imgUrl);
			}
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		getUserInfo();
	}, [getUserInfo]);

	const userInfoList = [
		{
			title: '닉네임',
			contents: nickname,
			isIcon: true,
			path: '/account/EditNickname',
		},
		{
			title: '이메일',
			contents: email,
			isIcon: false,
		},
		{
			title: '비밀번호',
			isIcon: true,
			isPassword: true,
			path: '/account/EditPassword',
		},
	];

	return (
		<Layout>
			<section>
				<article>
					<Header />

					<ProfileInfo
						isPhoto={true}
						editImg={() => {
							navigate('/');
						}}
					/>
					{userInfoList.map((user) => {
						return (
							<EditText
								title={user.title}
								contents={user.contents}
								isIcon={user.isIcon}
								isPassword={user.isPassword}
								path={user.path}
							/>
						);
					})}
				</article>
			</section>
		</Layout>
	);
};

export default AccountInfo;
