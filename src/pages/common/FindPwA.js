import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import FormErrorMessage from "../../components/common/FormErrorMessage";
import styles from "../../styles/pages/common.module.scss";
import { POST_REDIRECT } from "../../core/_axios/findpw";

const FindPwA = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            const res = await POST_REDIRECT({email: watch("email"),});
            console.log(res);

            if (res.data.success) {
                navigate("/findpwB", {
                    state: {
                        email: watch("email"),
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
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles[`form-input-div`]}>
                        <input
                            className={errors.email ? `${styles[`form-input`]} ${styles.error}`: styles[`form-input`]}
                            placeholder="이메일"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "이메일을 입력해주세요"
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/i,
                                    message: "올바르지 않은 형식의 이메일 입니다"
                                },
                            })}
                        />
                    </div>
                    {errors.email && <FormErrorMessage message={errors.email.message}/>}
                    <BlueBtn text="비밀번호 찾기" />
                </form>
            </section>
        </Layout>
    );
}

export default FindPwA;