import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import EmailInput from "../../components/common/EmailInput";
import styles from "../../styles/pages/common.module.scss";
import { POST_REDIRECT } from "../../core/_axios/findpw";

const FindPwA = () => {
    const methods = useForm();
    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            const res = await POST_REDIRECT({email: methods.watch("email"),});
            console.log(res);

            if (res.data.success) {
                navigate("/findpwB", {
                    state: {
                        email: methods.watch("email"),
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
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
                <FormProvider {...methods}>
                    <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                        <EmailInput />
                        <BlueBtn text="비밀번호 찾기" />
                    </form>
                </FormProvider>
            </section>
        </Layout>
    );
}

export default FindPwA;