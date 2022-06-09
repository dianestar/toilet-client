import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import NicknameInput from "../../components/common/NicknameInput";
import FormErrorMessage from "../../components/common/FormErrorMessage";
import styles from "../../styles/pages/common.module.scss";
import { ReactComponent as ProfileImage } from '../../assets/icons/profileImage.svg';
import { ReactComponent as OpenPhoto } from '../../assets/icons/openPhoto.svg';
import { POST_USERS_REGISTER, POST_USERS_UPLOAD } from "../../core/_axios/register";

const RegisterB = () => {
    const methods = useForm();
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
            email: methods.watch("email"),
            password: userInfo.password,
            nickname: methods.watch("nickname"),
            checkPassword: userInfo.checkPassword,
        };

        try {
            const response = await POST_USERS_REGISTER(form);
            if (response) {
                console.log(response);
            }
        } catch (error) {
            /* interceptor 수정 부분 테스트 */
            console.log(error);
            if (error.response.status === 400) {
                console.log("400");
            }
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
                <FormProvider {...methods}>
                    <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
                        <NicknameInput />
                        {alreadyExists && <FormErrorMessage message="이미 사용중인 닉네임 입니다"/>}
                        <BlueBtn text="회원가입"/>
                    </form>
                </FormProvider>
            </section>
        </Layout>
    );
}

export default RegisterB;
