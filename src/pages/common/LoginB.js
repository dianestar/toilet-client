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
import { useState } from 'react';
import Snackbar from '../../components/common/Snackbar';

const LoginB = () => {
	const methods = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [duplicated, setDuplicated] = useState(false);

	const onSubmit = async () => {
		const form = {
			email: methods.watch('email'),
			password: methods.watch('pw'),
		};
		try {
			const {
				data: { success, data },
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
			if (e.response.status === 401) {
				setDuplicated(true);
			}
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
							<EmailInput setError={setDuplicated} />
							<PasswordInput
								withCheck={false}
								text="비밀번호"
								setError={setDuplicated}
							/>
							<BlueBtn text="로그인" />
							<p className={styles.loginBtn}>
								비밀번호를 잊어버렸나요?{' '}
								<span /*onClick={}*/>비밀번호 찾기</span>
							</p>
						</form>
					</FormProvider>
				</article>
			</section>

			{duplicated && (
				<Snackbar key={Date.now()} text="이메일과 비밀번호를 확인해주세요." />
			)}
		</Layout>
	);
};

export default LoginB;
