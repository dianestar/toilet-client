import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../core/_reducers/register";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import EmailInput from "../../components/common/EmailInput";
import PasswordInput from "../../components/common/PasswordInput";
import Snackbar from "../../components/common/Snackbar";
import styles from "../../styles/pages/common.module.scss";
import { POST_USERS_VALIDATION } from "../../core/_axios/register";

const RegisterA = () => {
    const methods = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [duplicated, setDuplicated] = useState(false);

    const onSubmit = async () => {
        const form = {
            email: methods.watch("email"),
            password: methods.watch("pw"),
            checkPassword: methods.watch("pwcheck"),
        };

        try {
            const {
                data: {
                    success
                }
            } = await POST_USERS_VALIDATION(form);
            if (success) {
                dispatch(saveUser(form));
                navigate("/register_profile");
            }
        } catch (error) {
            if (error.response.status === 409) {
                setDuplicated(true);
            }
            setTimeout(() => {
                setDuplicated(false);
            }, 3000);
        }
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
            {duplicated && <Snackbar key={Date.now()} type="error" text="이미 가입된 이메일 입니다."/>}
        </Layout>
    );
}

export default RegisterA;
