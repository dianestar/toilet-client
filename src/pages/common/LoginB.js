import { useForm, FormProvider } from 'react-hook-form';
import BlueBtn from '../../components/common/BlueBtn';
import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import EmailInput from '../../components/common/EmailInput';
import PasswordInput from '../../components/common/PasswordInput';
import styles from '../../styles/pages/common.module.scss';
import { POST_LOGIN } from '../../core/_axios/login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { profile } from '../../core/_reducers/profileInfo';

const LoginB = () => {
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
			}
		} catch (e) {
			console.log(e.response.status);
		}
	};

	return (
		<Layout>
			<Header type="back" text="로그인" />
			<section className={styles.wrapper}>
				<article>
					<h2 className={styles.title}>로그인</h2>
					<FormProvider {...methods}>
						<form
							className={styles.form}
							onSubmit={methods.handleSubmit(onSubmit)}
						>
							<EmailInput />
							<PasswordInput withCheck={false} text="비밀번호" />
							<BlueBtn text="로그인" />
							<p className={styles.loginBtn}>
								비밀번호를 잊어버렸나요?{' '}
								<span /*onClick={}*/>비밀번호 찾기</span>
							</p>
						</form>
					</FormProvider>
				</article>
			</section>
		</Layout>
	);
};

export default LoginB;
