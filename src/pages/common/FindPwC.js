import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import BlueBtn from '../../components/common/BlueBtn';
import PasswordInput from '../../components/common/PasswordInput';
import Snackbar from '../../components/common/Snackbar';
import styles from '../../styles/pages/common.module.scss';
import { PATCH_RESET_PASSWORD } from '../../core/_axios/findpw';

const FindPwC = () => {
	const methods = useForm();
	const navigate = useNavigate();

	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const onSubmit = async () => {
		try {
			const {
				data: {
					data: { id }
				}
			} = await PATCH_RESET_PASSWORD({
				password: methods.watch('pw'),
				checkPassword: methods.watch('pwcheck'),
			});
			if (id) {
				setSuccess(true);
				setTimeout(() => {
					setSuccess(false);
				}, 3000);
				setTimeout(() => {
					navigate("/login");
				}, 3000);
			}
			else {
				setError(true);
				setTimeout(() => {
					setError(false);
				}, 3000);
			}
		} catch (error) { 
			console.log(error);
		}
	};

	return (
		<Layout>
			<Header type="back" text="비밀번호 재설정" />
			<section className={styles.wrapper}>
				<p className={styles.title}>비밀번호 재설정</p>
				<FormProvider {...methods}>
					<form
						className={styles.form}
						onSubmit={methods.handleSubmit(onSubmit)}
					>
						<PasswordInput
							withCheck={true}
							text="비밀번호"
							text2="비밀번호 확인"
						/>
						<BlueBtn text={'비밀번호 재설정'} />
					</form>
				</FormProvider>
			</section>
			{error && <Snackbar key={Date.now()} type="error" text="기존 비밀번호와 같습니다." />}
			{success && <Snackbar key={Date.now()} type="success" text="비밀번호 재설정이 완료되었습니다." />}
		</Layout>
	);
};

export default FindPwC;
