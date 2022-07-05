import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import styles from '../../styles/pages/common.module.scss';
import classNames from 'classnames';
import PasswordInput from '../../components/common/PasswordInput';
import { useForm, FormProvider } from 'react-hook-form';
import { PATCH_MODIFY_PASSWORD } from '../../core/_axios/user';
import BlueBtn from '../../components/common/BlueBtn';
import Snackbar from '../../components/common/Snackbar';
import { useNavigate } from 'react-router';

const EditPassword = () => {
	const methods = useForm();
	const navigate = useNavigate();

	const [duplicated, setDuplicated] = useState(false);
	const [registered, setRegistered] = useState(false);

	const onSubmit = async () => {
		try {
			const {
				data: { success },
			} = await PATCH_MODIFY_PASSWORD({
				existPassword: methods.watch('exist'),
				password: methods.watch('pw'),
				checkPassword: methods.watch('pwcheck'),
			});

			if (success) {
				setRegistered(true);
				setTimeout(() => {
					setRegistered(false);
				}, 3000);
			}
		} catch (e) {
			console.log(e);
			if (e.response.status === 409) {
				setDuplicated(true);
				setTimeout(() => {
					setDuplicated(false);
				}, 3000);
			}
		}
	};

	return (
		<Layout>
			<Header type="back" text="개인 정보 관리" />
			<section className={styles.wrapper}>
				<h2 className={classNames(styles.title, styles.mb20)}>
					비밀번호 재설정
				</h2>

				<FormProvider {...methods}>
					<form
						className={styles.form}
						onSubmit={methods.handleSubmit(onSubmit)}
					>
						<PasswordInput
							withCheck={true}
							text="새 비밀번호"
							text2="새 비밀번호 확인"
							exist
						/>
						<BlueBtn text="확인" />
					</form>
				</FormProvider>
			</section>
			{duplicated && (
				<Snackbar
					key={Date.now()}
					type="error"
					text="이미 사용중인 닉네임 입니다."
				/>
			)}
			{registered && (
				<Snackbar
					key={Date.now()}
					type="success"
					text="비밀번호 수정이 완료되었습니다."
				/>
			)}
		</Layout>
	);
};

export default EditPassword;
