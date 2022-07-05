import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import EmailInput from "../../components/common/EmailInput";
import Snackbar from "../../components/common/Snackbar";
import styles from "../../styles/pages/common.module.scss";
import { CHECK_EMAIL } from "../../core/_axios/register";
import { POST_REDIRECT } from "../../core/_axios/findpw";

const FindPwA = () => {
    const methods = useForm();
    const navigate = useNavigate();

    const [emailError, setEmailError] = useState(false);

    const onSubmit = async () => {
        const form = {
            email: methods.watch("email"),
        };

        try {
            const {
                data: { success },
            } = await CHECK_EMAIL(form);

            if (success) {
                setEmailError(true);
                setTimeout(() => {
                    setEmailError(false);
                }, 3000);
            }
        } catch (error) {
            if (error.response.status === 409) {
                try {
                    const res = await POST_REDIRECT(form);
                    if (res.data.success) {
                        navigate("/findpwB", { state: form });
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
    

    return (
        <Layout>
            <Header type="back" text="비밀번호 찾기" />
            <section className={styles.wrapper}>
                <p className={styles.title}>비밀번호 찾기</p>
                <p className={styles.desc}>
                    계정의 이메일 주소를 입력해주세요.
                    <br/>
                    비밀번호 재설정 링크가 포함된 메일을 보내드립니다.
                </p>
                <FormProvider {...methods}>
                    <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                        <EmailInput />
                        <BlueBtn text="비밀번호 찾기" />
                    </form>
                </FormProvider>
            </section>
            {emailError && (
                <Snackbar key={Date.now()} text="회원가입 되지 않은 이메일 입니다." />
            )}
        </Layout>
    );
}

export default FindPwA;