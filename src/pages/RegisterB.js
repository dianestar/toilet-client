import React from "react";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import BlueBtn from "../components/common/BlueBtn";
import styles from "../styles/pages/registerB.module.scss";
import profileImage from "../assets/icons/Profile-Image.svg";
import openPhoto from "../assets/icons/Open-Photo.svg";

const RegisterB = () => {
    return (
        <Layout>
            <Header text="회원가입"/>
            <p className={styles.title}>프로필 정보</p>
            <section className={styles.content}>
                <article className={styles[`photo-div`]}>
                    <img className={styles.profile} src={profileImage} alt="profile"/>
                    <img className={styles.open} src={openPhoto} alt="open"/> 
                </article>
                <input className={styles.input} placeholder="닉네임" />
                <BlueBtn text="회원가입" />
            </section>
        </Layout>
    );
}

export default RegisterB;