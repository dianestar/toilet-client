import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import styles from "../../styles/pages/common.module.scss";
import profileImage from "../../assets/icons/Profile-Image.svg";
import openPhoto from "../../assets/icons/Open-Photo.svg";

const RegisterB = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const onSubmit = () => {

    }
    return (
        <Layout>
            <Header text="회원가입"/>
            <section className={styles.wrapper}>
                <p className={styles.title}>프로필 정보</p>
                <article className={styles[`photo-div`]}>
                    <img className={styles.profile} src={profileImage} alt="profile"/>
                    <img className={styles.open} src={openPhoto} alt="open"/> 
                </article>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles[`form-input-div`]}>
                        <input className={styles[`form-input`]} placeholder="닉네임" {...register("email", { required: true })}/>
                        {errors.email && <span>NICKNAME error message</span>}
                    </div>
                </form>
                <BlueBtn text="회원가입" />
            </section>
        </Layout>
    );
}

export default RegisterB;