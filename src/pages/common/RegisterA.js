import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import BlueBtn from '../../components/common/BlueBtn';
// import Eye from '../../assets/icons/Eye.svg';
import styles from '../../styles/pages/common.module.scss';

const RegisterA = () => {
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
				<p className={styles.title}>계정 정보</p>
				<p className={styles.desc}>
					로그인 시 사용할 이메일과 비밀번호를 입력하세요.
				</p>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles[`form-input-div`]}>
						<input
							className={styles[`form-input`]}
							placeholder="이메일"
							{...register('email', { required: true })}
						/>
						{errors.email && <span>EMAIL error message</span>}
					</div>
					<div className={styles[`form-input-div`]}>
						<input
							className={styles[`form-input`]}
							placeholder="비밀번호"
							{...register('pw', { required: true })}
						/>
						{/* <img className={styles[`form-eye`]} src={Eye} alt="eye" /> */}
						{errors.pw && <span>PW error message</span>}
					</div>
					<div className={styles[`form-input-div`]}>
						<input
							className={styles[`form-input`]}
							placeholder="비밀번호 확인"
							{...register('pwcheck', { required: true })}
						/>
						{/* <img className={styles[`form-eye`]} src={Eye} alt="eye" /> */}
						{errors.pwcheck && <span>PWCHECK errror message</span>}
					</div>
					<BlueBtn text="다음" />
				</form>
			</section>
		</Layout>
	);
};

export default RegisterA;
