import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import BlueBtn from '../../components/common/BlueBtn';
import styles from '../../styles/pages/common.module.scss';
import { ReactComponent as ProfileImage } from '../../assets/icons/profileImage.svg';
import { ReactComponent as OpenPhoto } from '../../assets/icons/openPhoto.svg';

const RegisterB = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = () => {};
	return (
		<Layout>
			<Header text="회원가입" />
			<section className={styles.wrapper}>
				<p className={styles.title}>프로필 정보</p>
				<article className={styles[`photo-div`]}>
					<ProfileImage className={styles.profile} />
					<OpenPhoto className={styles.open} />
				</article>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles[`form-input-div`]}>
						<input
							className={styles[`form-input`]}
							placeholder="닉네임"
							{...register('email', { required: true })}
						/>
						{errors.email && <span>NICKNAME error message</span>}
					</div>
				</form>
				<BlueBtn text="회원가입" />
			</section>
		</Layout>
	);
};

export default RegisterB;
