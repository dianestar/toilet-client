import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import ProfileInfo from '../../components/common/ProfileInfo';
import { useEffect, useState, useRef } from 'react';
import EditText from '../../components/common/EditText';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { POST_USERS_UPLOAD } from '../../core/_axios/register';
import { profile } from '../../core/_reducers/profileInfo';
import { GET_USERS } from '../../core/_axios/user';
import Snackbar from '../../components/common/Snackbar';

const AccountInfo = () => {
	const navigate = useNavigate();

	const user = useSelector((state) => state.profileInfo);
	const dispatch = useDispatch();
	const [modify, setModify] = useState(false);
	const imageInputRef = useRef();
	const [imageFile, setImageFile] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [success, setSuccess] = useState(false);

	const onChangeImage = async (e) => {
		setEditMode(true);
		setImageFile(e.target.files[0]);

		dispatch(
			profile({
				nickname: user.nickname,
				imgUrl: URL.createObjectURL(e.target.files[0]),
				email: user.email,
			}),
		);
	};

	const onCancelImage = async () => {
		setEditMode(false);
		setImageFile(null);

		const res = await GET_USERS();
		const defaultImg = res.data.data.imgUrl;

		dispatch(
			profile({
				nickname: user.nickname,
				imgUrl: defaultImg,
				email: user.email,
			}),
		);

		imageInputRef.current.value = '';
	};

	const onConfirmImage = async () => {
		const form = new FormData();
		form.append('image', imageFile);

		try {
			await POST_USERS_UPLOAD(form);
			setEditMode(false);
			setSuccess(true);
			setTimeout(() => {
				setSuccess(false);
			}, 3000);
		} catch (error) {
			console.log(error);
		}
	};

	const userInfoList = [
		{
			title: '닉네임',
			contents: user.nickname,
			isIcon: true,
			path: '/account/edit_nickname',
		},
		{
			title: '이메일',
			contents: user.email,
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
						imageInputRef={imageInputRef}
						onChangeImage={onChangeImage}
						imageFile={imageFile}
						onCancelImage={onCancelImage}
						setEditMode={setEditMode}
						editMode={editMode}
						onConfirmImage={onConfirmImage}
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
			{success && (
				<Snackbar
					key={Date.now()}
					type="success"
					text="변경이 완료되었습니다."
				/>
			)}
		</Layout>
	);
};

export default AccountInfo;
