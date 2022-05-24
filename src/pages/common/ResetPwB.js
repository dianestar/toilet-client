import React from "react";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import styles from "../../styles/pages/common.module.scss";

const ResetPwB = () => {
    const email = "toilet@gmail.com";

    return (
        <Layout>
            <Header text="비밀번호 찾기" />
            <section className={styles.wrapper}>
                <p className={styles.title}>이메일 전송 완료</p>
                <p className={styles.desc}>
                    <span className={styles.email}>{email}</span> 으로 이메일을 전송했습니다.
                    <br/>
                    이메일의 비밀번호 재설정 링크를 통해 비밀번호를 
                    <br/>
                    재설정해주세요.
                </p>
            </section>
        </Layout>
    );
}

export default ResetPwB;