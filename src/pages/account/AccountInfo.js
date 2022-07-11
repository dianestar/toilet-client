import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import ProfileInfo from '../../components/common/ProfileInfo';
import { useEffect, useState, useRef } from 'react';
import { GET_USERS } from '../../core/_axios/user';
import EditText from '../../components/common/EditText';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { POST_USERS_UPLOAD } from '../../core/_axios/register';
import { imgChange, profile } from '../../core/_reducers/profileInfo';

const AccountInfo = () => {
	const [nickname, setNickname] = useState('');
	const [email, setEail] = useState('');
	const [imgUrl, setImgUrl] = useState('');
	const navigate = useNavigate();

	const user = useSelector((state) => state.profileInfo);
	const dispatch = useDispatch();
	const [modify, setModify] = useState(false);
	const imageInputRef = useRef();
	const [imageFile, setImageFile] = useState(null);
	const [editMode, setEditMode] = useState(false);

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

	const onChangeImage = async (e) => {
		setEditMode(true);
		setImageFile(e.target.files[0]);
		setImgUrl(URL.createObjectURL(e.target.files[0]));

		dispatch(
			profile({
				nickname: user.nickname,
				imgUrl: URL.createObjectURL(e.target.files[0]),
				email: user.email,
			}),
		);

		if (imageFile) {
			const form = new FormData();
			form.append('image', imageFile);
		}
	};

	console.log(user, '비동기?!');

	useEffect(() => {
		getUserInfo();
	}, [getUserInfo]);

	const userInfoList = [
		{
			title: '닉네임',
			contents: nickname,
			isIcon: true,
			path: '/account/edit_nickname',
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
			path: '/account/edit_password',
		},
	];

	return (
		<Layout>
			<section>
				<article>
					<Header type="back" text="계정 정보 관리" />
					<ProfileInfo
						isPhoto={true}
						editImg={() => {
							setModify(!modify);
						}}
						modify={modify}
						imgUrl={imgUrl}
						imageInputRef={imageInputRef}
						onChangeImage={onChangeImage}
						imageFile={imageFile}
					/>
					{userInfoList.map((user) => {
						return (
							<EditText
								key={user.title}
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
