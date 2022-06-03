import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as EyeUnprotected } from '../../assets/icons/eyeUnprotected.svg';
import styles from "../../styles/components/input.module.scss";

const PasswordInput = ({ withCheck = false }) => {
    const { register, watch, formState: {errors} } = useFormContext();
    const [pwProtected, setPwProtected] = useState(true);
    const [pwcheckProtected, setPwcheckProtected] = useState(true);

    const [writingPw, setWritingPw] = useState(false);
    const [writingPwcheck, setWritingPwcheck] = useState(false);
    const onChangePw = (e) => {
        if (e.target.value !== "") {
            setWritingPw(true);
        }
        else {
            setWritingPw(false);
        }
    }
    const onChangePwcheck = (e) => {
        if (e.target.value !== "") {
            setWritingPwcheck(true);
        }
        else {
            setWritingPwcheck(false);
        }
    }

    return (
        <>
            <div className={styles[`form-input-div`]}>
                <label className={`${styles.placeholder} ${writingPw && styles.moved}`}>비밀번호</label>
                <input
                    className={`${styles[`form-input`]} ${writingPw && styles.writing} ${errors.pw && styles.error}`}
                    type={pwProtected ? "password" : "text"}
                    {...register("pw", {
                        required: {
                            value: true,
                            message: "비밀번호를 입력해주세요"
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i,
                            message: "비밀번호는 숫자,영문자,특수문자를 포함하여 8자리 이상입니다"
                        },
                        onChange: onChangePw,
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
            {withCheck &&
            <>
                <div className={styles[`form-input-div`]}>
                    <label className={`${styles.placeholder} ${writingPwcheck && styles.moved}`}>비밀번호 확인</label>
                    <input
                        className={`${styles[`form-input`]} ${writingPwcheck && styles.writing} ${errors.pwcheck && styles.error}`}
                        type={pwcheckProtected ? "password" : "text"}
                        {...register("pwcheck", {
                            required: {
                                value: true,
                                message: "비밀번호 확인을 입력해주세요"
                            },
                            validate:
                                (value) => value === watch("pw") || "비밀번호가 일치하지 않습니다",
                            onChange: onChangePwcheck,
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
            </>
            }
        </>               
    );
}

export default PasswordInput;