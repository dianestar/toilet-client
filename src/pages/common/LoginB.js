import React from 'react';
import { IC_Eye } from '../../assets/icons';
import BlueBtn from '../../components/common/BlueBtn';
import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import styles from '../../styles/pages/common.module.scss';

const LoginB = () => {
	return (
		<Layout>
			<Header text="로그인" />
			<section className={styles.wrapper}>
				<article>
					<h2 className={styles.title}>로그인</h2>

					<form className={styles.form}>
						<div className={styles[`form-input-div`]}>
							<input className={styles[`form-input`]} placeholder="이메일" />
						</div>

						<div className={styles[`form-input-div`]}>
							<input className={styles[`form-input`]} placeholder="비밀번호" />
							<IC_Eye />
							{/* <img className={styles[`form-eye`]} src={Eye} alt="eye" /> */}
						</div>

						<BlueBtn text="로그인" />
						<p className={styles.loginBtn}>
							비밀번호를 잊어버렸나요? <span /*onClick={}*/>비밀번호 찾기</span>
						</p>
					</form>
				</article>
			</section>
		</Layout>
	);
};

export default LoginB;
