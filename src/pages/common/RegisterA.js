import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../core/_reducers/register";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import EmailInput from "../../components/common/EmailInput";
import PasswordInput from "../../components/common/PasswordInput";
import styles from "../../styles/pages/common.module.scss";

const RegisterA = () => {
    const methods = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = () => {
        dispatch(saveUser({
            email: methods.watch("email"),
            password: methods.watch("pw"),
            checkPassword: methods.watch("pwcheck"),
        }));
        navigate("/register_profile");
    }

    return (
        <Layout>
            <Header text="회원가입"/>
            <section className={styles.wrapper}>
                <p className={styles.title}>계정 정보</p>
                <p className={styles.desc}>로그인 시 사용할 이메일과 비밀번호를 입력하세요.</p>
                <FormProvider {...methods}>
                    <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                        <EmailInput />
                        <PasswordInput withCheck={true} />
                        <BlueBtn text="다음"/>
                    </form>
                </FormProvider>
            </section>
        </Layout>
    );
}

export default RegisterA;
