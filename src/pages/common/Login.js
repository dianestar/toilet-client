import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import BlueBtn from '../../components/common/BlueBtn';
import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import styles from '../../styles/pages/login.module.scss';
import { KAKAO_LOGIN, POST_LOGIN } from '../../core/_axios/login';
import { profile } from '../../core/_reducers/profileInfo';
import EmailInput from '../../components/common/EmailInput';
import PasswordInput from '../../components/common/PasswordInput';
import { useEffect } from 'react';

const Login = () => {
	const methods = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = async () => {
		const form = {
			email: methods.watch('email'),
			password: methods.watch('pw'),
		};
		try {
			const {
				data: { success, data, message },
			} = await POST_LOGIN(form);

			if (success) {
				localStorage.setItem('token', data.token);
				navigate('/map');

				dispatch(
					profile({
						nickname: data.nickname,
						imgUrl: data.imgUrl,
						email: data.email,
					}),
				);
			} else {
				alert(message);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const snsLogin = async () => {
		let params = new URL(window.location.href).searchParams;
		let code = params.get('code');

		try {
			const {
				data: { success, token, email, nickname, imgUrl, message },
			} = await KAKAO_LOGIN(code);

			if (success) {
				localStorage.getItem('token', token);

				dispatch(
					profile({
						nickname: nickname,
						imgUrl: imgUrl,
						email: email,
					}),
				);

				setTimeout(() => {
					navigate('/map');
				}, 3000);
			}
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 409)
				window.location.assign('http://localhost:3000/');
		}
	};

	// {"success":true,
	// "data":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpldG9tQGtha2FvLmNvbSIsInN1YiI6ImE4ZTE0ZjhjLWI0MzgtNGU5My1iNzM3LWU5YjE2MGZhY2ZhMiIsImlhdCI6MTY1NzcxOTk5MSwiZXhwIjoxNjU3ODA2MzkxfQ.X90j5xOuU7sFokHTEkMEXdzGPWj43MgmThl4TEL5cJE",
	// "id":"a8e14f8c-b438-4e93-b737-e9b160facfa2",
	// "email":"jetom@kakao.com",
	// "nickname":"SHR",
	// "imgUrl":"http://k.kakaocdn.net/dn/cfLFtc/btrGQbGYemt/aZ7bd963GL2mK5W22qrkik/img_640x640.jpg"}}

	return (
		<Layout>
			<Header type="none" text="로그인" />
			<section className={styles.loginSection}>
				<div className={styles.logo}>
					<img
						src="./images/KakaoTalk_Photo_2022-07-12-17-55-23.jpeg"
						alt="logo"
					/>
				</div>
				<div className={styles.login}>
					<FormProvider {...methods}>
						<form
							className={styles.form}
							onSubmit={methods.handleSubmit(onSubmit)}
						>
							<EmailInput />
							<PasswordInput withCheck={false} text="비밀번호" />
							<div className={styles.signIn}>
								<BlueBtn text="로그인" />
							</div>
						</form>
					</FormProvider>
					<p className={styles.info}>
						<span
							onClick={() => {
								navigate('/register_account');
							}}
						>
							회원가입
						</span>{' '}
						|{' '}
						<span
							onClick={() => {
								navigate('/findpwA');
							}}
						>
							비밀번호 찾기
						</span>
					</p>

					<div className={styles.line}>
						<p>or</p>
					</div>

					<a
						href={`${process.env.REACT_APP_API_URL}auth/kakao`}
						className={styles.snsLogin}
					>
						<button className={styles.kakao}>
							<img src="./images/kakaoLogo.png" className={styles.kakaoLogo} />
							<p>카카오톡으로 로그인</p>
						</button>
					</a>
				</div>
			</section>
		</Layout>
	);
};

export default Login;
