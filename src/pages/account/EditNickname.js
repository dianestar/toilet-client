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

const EditNickname = () => {
	const user = useSelector((state) => state.profileInfo);
	const methods = useForm();
	const dispatch = useDispatch();

	const onSubmit = async () => {
		const form = methods.watch('nickname');
		console.log(form, 'test');

		try {
			const {
				data: { success, message },
			} = await PATCH_USERS(form);
			if (success) {
				dispatch(profileInfo(form));
				// <Snackbar type="success" text="닉네임이 변경되었습니다." />;
			}
			// else {
			// 	<Snackbar type="success" text={message} />;
			// }
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Layout>
			<Header text="계정 정보 관리" />
			<section className={styles.wrapper}>
				<h2 className={classNames(styles.title, styles.mb20)}>닉네임 수정</h2>
				<article>
					<FormProvider {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
						<form>
							<NicknameInput name={user.nickname} />
							<BlueBtn text="저장" />
						</form>
					</FormProvider>
				</article>
			</section>
		</Layout>
	);
};

export default EditNickname;
