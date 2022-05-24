import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import styles from "../../styles/pages/common.module.scss";

const ResetPwA = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const onSubmit = () => {

    }
    return (
        <Layout>
            <Header text="비밀번호 찾기" />
            <section className={styles.wrapper}>
                <p className={styles.title}>비밀번호 찾기</p>
                <p className={styles.desc}>
                    계정의 이메일 주소를 입력해주세요.
                    <br/>
                    비밀번호 재설정 링크가 포함된 메일을 보내드립니다.
                </p>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles[`form-input-div`]}>
                        <input className={styles[`form-input`]} placeholder="이메일" {...register("email", { required: true })}/>
                        {errors.email && <span>EMAIL error message</span>}
                    </div>
                </form>
                <BlueBtn text="비밀번호 찾기" />
            </section>
        </Layout>
    );
}

export default ResetPwA;