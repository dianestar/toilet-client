import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import BlueBtn from '../../components/common/BlueBtn';
import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import styles from '../../styles/pages/login.module.scss';
import { POST_LOGIN, REDIRECT_KAKAO } from '../../core/_axios/login';
import { profile } from '../../core/_reducers/profileInfo';
import EmailInput from '../../components/common/EmailInput';
import PasswordInput from '../../components/common/PasswordInput';
import { getCookie } from '../../untils/cookie';
import { useEffect } from 'react';

const Login = () => {
	const methods = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const KAKAO_LOGIN = `${process.env.REACT_APP_API_URL}auth/kakao`;

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

	const kakaoLogin = () => {
		window.location.href = KAKAO_LOGIN;
	};

	useEffect(() => {
		getCookie('user');
	}, []);

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

					<div className={styles.snsLogin}>
						<button className={styles.kakao} onClick={kakaoLogin}>
							<img src="./images/kakaoLogo.png" className={styles.kakaoLogo} />

							<p>카카오톡으로 로그인</p>
						</button>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Login;
