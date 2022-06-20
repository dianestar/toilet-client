import { useNavigate } from 'react-router-dom';
import BlueBtn from '../../components/common/BlueBtn';
import Btn from '../../components/common/Btn';
import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import styles from '../../styles/pages/login.module.scss';

const Login = () => {
	const navigate = useNavigate();

	const goToLogin = () => {
		navigate('/login');
	};

	return (
		<Layout>
			<Header type="back" text="로그인" />
			<section className={styles.loginSection}>
				<div className={styles.logo}></div>
				<Btn text="카카오톡으로 시작하기" color={true} />
				<BlueBtn text="이메일로 시작하기" />
				<p
					className={styles.loginBtn}
					onClick={() => {
						goToLogin();
					}}
				>
					이미 계정이 있으세요? <span>로그인</span>
				</p>
			</section>
		</Layout>
	);
};

export default Login;
