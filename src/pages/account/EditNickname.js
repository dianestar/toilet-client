import React, { useState } from "react";
import { useForm, FormProvider } from 'react-hook-form';
import BlueBtn from '../../components/common/BlueBtn';
import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import NicknameInput from '../../components/common/NicknameInput';
import styles from '../../styles/pages/common.module.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { PATCH_USERS } from '../../core/_axios/user';
import profileInfo from '../../core/_reducers/profileInfo';
import Snackbar from '../../components/common/Snackbar';
import { profile } from '../../core/_reducers/profileInfo';

const EditNickname = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.profileInfo);
	const methods = useForm();

	const [duplicated, setDuplicated] = useState(false);
    const [registered, setRegistered] = useState(false);

	const onSubmit = async () => {
		try {
			const {
				data: { success, data: { nickname, imgUrl, email } },
			} = await PATCH_USERS({nickname: methods.watch("nickname")});
			if (success) {
				dispatch(profile({nickname, imgUrl, email,}));

				setRegistered(true);
                setTimeout(() => {
                    setRegistered(false);
                }, 3000);
			}
		} catch (e) {
			console.log(e);
			
			if (e.response.status === 409) {
				setDuplicated(true);
                setTimeout(() => {
                    setDuplicated(false);
                }, 3000);
            }
		}
	};
	return (
		<Layout>
			<Header type="back" text="계정 정보 관리" />
			<section className={styles.wrapper}>
				<h2 className={classNames(styles.title, styles.mb20)}>닉네임 수정</h2>
				<article>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)}>
							<NicknameInput name={user.nickname} />
							<BlueBtn text="저장" />
						</form>
					</FormProvider>
				</article>
			</section>
			{duplicated && <Snackbar key={Date.now()} type="error" text="이미 사용중인 닉네임 입니다."/>}
            {registered && <Snackbar key={Date.now()} type="success" text="닉네임 수정이 완료되었습니다."/>}
		</Layout>
	);
};

export default EditNickname;
