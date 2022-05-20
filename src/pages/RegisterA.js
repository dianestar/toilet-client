import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/common/Layout";
import Back from "../assets/icons/Back.svg";
import Eye from "../assets/icons/Eye.svg";
import styles from "../styles/pages/registerA.module.scss";

const RegisterA = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const onSubmit = () => {

    }
    return (
        <Layout>
            <div className={styles.wrapper}>
                <section className={styles.header}>
                    <img className={styles[`header-back`]} src={Back} alt="back"/>
                    <span className={styles[`header-title`]}>회원가입</span>
                </section>
                <section className={styles.content}>
                    <article>
                        <p className={styles[`guide-main`]}>계정 정보</p>
                        <p className={styles[`guide-sub`]}>로그인 시 사용할 이메일과 비밀번호를 입력하세요.</p>
                    </article>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles[`form-input-div`]}>
                            <input className={styles[`form-input`]} placeholder="이메일" {...register("email", { required: true })}/>
                            {errors.email && <span>EMAIL error message</span>}
                        </div>
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
                        <button className={styles[`form-button`]}>다음</button>
                    </form>
                </section>
            </div>
        </Layout>
    );
}

export default RegisterA;