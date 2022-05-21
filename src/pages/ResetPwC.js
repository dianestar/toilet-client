import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import BlueBtn from "../components/common/BlueBtn";
import styles from "../styles/pages/resetpwC.module.scss";
import Eye from "../assets/icons/Eye.svg";


const ResetPwC = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const onSubmit = () => {}

    return (
        <Layout>
            <Header text="비밀번호 재설정" />
            <p className={styles.title}>비밀번호 재설정</p>
            <section className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles[`form-input-div`]}>
                        <input className={styles[`form-input`]} placeholder="비밀번호" {...register("pw", { required: true })}/>
                        <img className={styles[`form-eye`]} src={Eye} alt="eye" />
                        {errors.pw && <span>PW error message</span>}
                    </div>
                    <div className={styles[`form-input-div`]}>
                        <input className={styles[`form-input`]} placeholder="비밀번호 확인" {...register("pwcheck", { required: true })}/>
                        <img className={styles[`form-eye`]} src={Eye} alt="eye" />
                        {errors.pwcheck && <span>PWCHECK errror message</span>}
                    </div>
                    <BlueBtn text={"비밀번호 재설정"} />
                </form>
            </section>
        </Layout>
    );
}

export default ResetPwC;