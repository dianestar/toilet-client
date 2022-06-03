import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";
import styles from "../../styles/components/input.module.scss";

const NicknameInput = () => {
    const { register, formState: {errors} } = useFormContext();
    
    const [writing, setWriting] = useState(false);
    const onChange = (e) => {
        if (e.target.value !== "") {
            setWriting(true);
        }
        else {
            setWriting(false);
        }
    }

    return (
        <>
            <div className={styles[`form-input-div`]}>
                <label className={`${styles.placeholder} ${writing && styles.moved}`}>닉네임</label>
                <input
                    className={`${styles[`form-input`]} ${writing && styles.writing} ${errors.nickname && styles.error}`}
                    {...register("nickname", {
                        required: true,
                        onChange: onChange,
                    })}
                />
            </div>
            {errors.nickname && <FormErrorMessage message="닉네임을 입력해주세요"/>}
        </>
    );
}

export default NicknameInput;