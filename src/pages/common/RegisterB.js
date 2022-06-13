import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import Layout from "../../components/common/Layout";
import Header from "../../components/common/Header";
import BlueBtn from "../../components/common/BlueBtn";
import NicknameInput from "../../components/common/NicknameInput";
import Snackbar from "../../components/common/Snackbar";
import styles from "../../styles/pages/common.module.scss";
import { ReactComponent as ProfileImage } from '../../assets/icons/profileImage.svg';
import { ReactComponent as OpenPhoto } from '../../assets/icons/openPhoto.svg';
import { POST_USERS_REGISTER, POST_USERS_UPLOAD } from "../../core/_axios/register";

const RegisterB = () => {
    const methods = useForm();
    const userInfo = useSelector((state) => state.register);

    const [duplicated, setDuplicated] = useState(false);
    const [registered, setRegistered] = useState(false);

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
            nickname: methods.watch("nickname"),
            checkPassword: userInfo.checkPassword,
        };

        try {
            const {
                data: { success }
            } = await POST_USERS_REGISTER(form);
            if (success) {
                setRegistered(true);
                setTimeout(() => {
                    setRegistered(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 409) {
                setDuplicated(true);
                setTimeout(() => {
                    setDuplicated(false);
                }, 3000);
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
            <Header type="back" text="회원가입"/>
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
                        <NicknameInput duplicated={duplicated} setDuplicated={setDuplicated}/>
                        <BlueBtn text="회원가입"/>
                    </form>
                </FormProvider>
            </section>
            {duplicated && <Snackbar key={Date.now()} type="error" text="이미 사용중인 닉네임 입니다."/>}
            {registered && <Snackbar key={Date.now()} type="success" text="회원가입이 완료되었습니다."/>}
        </Layout>
    );
}

export default RegisterB;
