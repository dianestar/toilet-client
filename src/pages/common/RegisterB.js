import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import FormErrorMessage from "../../components/common/FormErrorMessage";
import styles from "../../styles/pages/common.module.scss";
import { ReactComponent as ProfileImage } from '../../assets/icons/profileImage.svg';
import { ReactComponent as OpenPhoto } from '../../assets/icons/openPhoto.svg';
import { POST_USERS_REGISTER, POST_USERS_UPLOAD } from "../../core/_axios/register";

const RegisterB = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const userInfo = useSelector((state) => state.register);

    const [alreadyExists, setAlreadyExists] = useState(false);

    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const onChangeImage = (e) => {
        setImageFile(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    const onSubmit = async () => {
        const form = {
            email: userInfo.email,
            password: userInfo.password,
            nickname: watch("nickname"),
            checkPassword: userInfo.checkPassword,
        };

        console.log(form);

        try {
            const response = await POST_USERS_REGISTER(form);
            if (response) {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }

        if (imageUrl) {
            const form = new FormData();
            form.append("image", imageFile);

            try {
                const response = await POST_USERS_UPLOAD(form);
                if (response) {
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <Layout>
            <Header text="회원가입"/>
            <section className={styles.wrapper}>
                <p className={styles.title}>프로필 정보</p>
                <article className={styles[`photo-div`]}>
                    <label htmlFor="image-input">
                        {!imageFile
                        ?
                        <ProfileImage className={styles.profile} />
                        :
                        <img className={styles[`profile-image`]} src={imageUrl} alt="profile"/>
                        }
					    <OpenPhoto className={styles.open} /> 
                    </label>
                    <input
                        id="image-input"
                        type="file"
                        accept="image/*"
                        onChange={onChangeImage}
                    />
                </article>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles[`form-input-div`]}>
                        <input
                            className={errors.nickname ? `${styles[`form-input`]} ${styles.error}`: styles[`form-input`]}
                            placeholder="닉네임"
                            {...register("nickname", { required: true })}
                        />
                    </div>
                    {errors.nickname && <FormErrorMessage message="닉네임을 입력해주세요"/>}
                    {alreadyExists && <FormErrorMessage message="이미 사용중인 닉네임 입니다"/>}
                    <BlueBtn text="회원가입"/>
                </form>
            </section>
        </Layout>
    );
}

export default RegisterB;
