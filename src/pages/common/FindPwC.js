import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import BlueBtn from '../../components/common/BlueBtn';
import PasswordInput from '../../components/common/PasswordInput';
import styles from '../../styles/pages/common.module.scss';
import { PATCH_RESET_PASSWORD } from '../../core/_axios/findpw';

const FindPwC = () => {
	const methods = useForm();

	const navigate = useNavigate();

	const onSubmit = async () => {
		const res = await PATCH_RESET_PASSWORD({
			password: methods.watch('pw'),
			checkPassword: methods.watch('pwcheck'),
		});
		if (res.data.success) {
			alert('비밀번호 재설정이 완료되었습니다');
			navigate('/login');
		}
	};

	return (
		<Layout>
			<Header text="비밀번호 재설정" />
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
		</Layout>
	);
};

export default FindPwC;
