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

    return (
        <>
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
                            message: "비밀번호는 숫자,영문자,특수문자를 포함하여 8자리 이상입니다"
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
            {withCheck &&
            <>
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
            </>
            }
        </>               
    );
}

export default PasswordInput;