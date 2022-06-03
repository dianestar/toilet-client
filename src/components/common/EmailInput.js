import React from "react";
import { useFormContext } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";
import styles from "../../styles/components/input.module.scss";

const EmailInput = () => {
    const { register, formState: {errors} } = useFormContext();

    return (
        <>
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
        </>
    );
}

export default EmailInput;