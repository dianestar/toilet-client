import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import FormErrorMessage from "../../components/common/FormErrorMessage";
import styles from "../../styles/pages/common.module.scss";
import { ReactComponent as ProfileImage } from '../../assets/icons/profileImage.svg';
import { ReactComponent as OpenPhoto } from '../../assets/icons/openPhoto.svg';

const RegisterB = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm();

    const onSubmit = async () => {
    }
    return (
        <Layout>
            <Header text="회원가입"/>
            <section className={styles.wrapper}>
                <p className={styles.title}>프로필 정보</p>
                <article className={styles[`photo-div`]}>
                    <ProfileImage className={styles.profile} />
					<OpenPhoto className={styles.open} /> 
                </article>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles[`form-input-div`]}>
                        <input
                            className={errors.nickname ? `${styles[`form-input`]} ${styles.error}`: styles[`form-input`]}
                            placeholder="닉네임"
                            {...register("nickname", { required: true })}
                        />
                    </div>
                    {errors.nickname && <FormErrorMessage message="닉네임을 입력해주세요"/>}
                    <BlueBtn text="회원가입"/>
                </form>
            </section>
        </Layout>
    );
}

export default RegisterB;