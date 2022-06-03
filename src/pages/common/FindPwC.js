import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import FormErrorMessage from "../../components/common/FormErrorMessage";
import styles from "../../styles/pages/common.module.scss";
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as EyeUnprotected } from '../../assets/icons/eyeUnprotected.svg';
import { PATCH_RESET_PASSWORD } from "../../core/_axios/findpw";

const FindPwC = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

    const [pwProtected, setPwProtected] = useState(true);
    const [pwcheckProtected, setPwcheckProtected] = useState(true);

    const navigate = useNavigate();

	const onSubmit = async () => {
        const res = await PATCH_RESET_PASSWORD({
            password: watch("pw"),
            checkPassword: watch("pwcheck"),
        });
        if (res.data.success) {
            alert("비밀번호 재설정이 완료되었습니다");
            navigate("/login");
        }
    };

    return (
        <Layout>
            <Header text="비밀번호 재설정" />
            <section className={styles.wrapper}>
            <p className={styles.title}>비밀번호 재설정</p>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles[`form-input-div`]}>
                        <input
                            className={errors.pw ? `${styles[`form-input`]} ${styles.error}`: styles[`form-input`]}
                            placeholder="비밀번호"
                            type={pwProtected ? "password" : "text"}
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
                        {
                            pwProtected
                            ?
                            <Eye className={styles[`form-eye`]} onClick={() => setPwProtected(!pwProtected)}/>
                            :
                            <EyeUnprotected className={styles[`form-eye`]} onClick={() => setPwProtected(!pwProtected)}/>
                        }
                        
                    </div>
                    {errors.pw && <FormErrorMessage message={errors.pw.message}/>}
                    <div className={styles[`form-input-div`]}>
                        <input
                            className={errors.pwcheck ? `${styles[`form-input`]} ${styles.error}`: styles[`form-input`]}
                            placeholder="비밀번호 확인"
                            type={pwcheckProtected ? "password" : "text"}
                            {...register("pwcheck", {
                                required: {
                                    value: true,
                                    message: "비밀번호 확인을 입력해주세요"
                                },
                                validate:
                                    (value) => value === watch("pw") || "비밀번호가 일치하지 않습니다"
                            })}
                        />
                        {
                            pwcheckProtected
                            ?
                            <Eye className={styles[`form-eye`]} onClick={() => setPwcheckProtected(!pwcheckProtected)}/>
                            :
                            <EyeUnprotected className={styles[`form-eye`]} onClick={() => setPwcheckProtected(!pwcheckProtected)}/>
                        }
                    </div>
                    {errors.pwcheck && <FormErrorMessage message={errors.pwcheck.message}/>}
                    <BlueBtn text={"비밀번호 재설정"} />
                </form>
            </section>
        </Layout>
    );
}

export default FindPwC;
