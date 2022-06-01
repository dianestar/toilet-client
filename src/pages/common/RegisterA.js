import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUser } from "../../core/_reducers/register";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import FormErrorMessage from "../../components/common/FormErrorMessage";
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import styles from "../../styles/pages/common.module.scss";

const RegisterA = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const [pwVisible, setPwVisible] = useState(false);
    const [pwcheckVisible, setPwcheckVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = () => {
        dispatch(saveUser({
            email: watch("email"),
            password: watch("pw"),
            checkPassword: watch("pwcheck"),
        }));
        navigate("/registerprofile");
    }

    return (
        <Layout>
            <Header text="회원가입"/>
            <section className={styles.wrapper}>
                <p className={styles.title}>계정 정보</p>
                <p className={styles.desc}>로그인 시 사용할 이메일과 비밀번호를 입력하세요.</p>
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
                    <div className={styles[`form-input-div`]}>
                        <input
                            className={errors.pw ? `${styles[`form-input`]} ${styles.error}`: styles[`form-input`]}
                            placeholder="비밀번호"
                            type={pwVisible ? "text" : "password"}
                            {...register("pw", {
                                required: {
                                    value: true,
                                    message: "비밀번호를 입력해주세요"
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i,
                                    message: "숫자,영문자,특수문자를 포함하여 8자리 이상으로 설정해주세요"
                                },
                            })}
                        />
                        <Eye className={styles[`form-eye`]} onClick={() => setPwVisible(!pwVisible)}/>
                    </div>
                    {errors.pw && <FormErrorMessage message={errors.pw.message}/>}
                    <div className={styles[`form-input-div`]}>
                        <input
                            className={errors.pwcheck ? `${styles[`form-input`]} ${styles.error}`: styles[`form-input`]}
                            placeholder="비밀번호 확인"
                            type={pwcheckVisible ? "text" : "password"}
                            {...register("pwcheck", {
                                required: {
                                    value: true,
                                    message: "비밀번호 확인을 입력해주세요"
                                },
                                validate:
                                    (value) => value === watch("pw") || "비밀번호가 일치하지 않습니다"
                            })}
                        />
                        <Eye className={styles[`form-eye`]} onClick={() => setPwcheckVisible(!pwcheckVisible)}/>
                    </div>
                    {errors.pwcheck && <FormErrorMessage message={errors.pwcheck.message}/>}
                    <BlueBtn text="다음"/>
                </form>
            </section>
        </Layout>
    );
}

export default RegisterA;