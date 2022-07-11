import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import BlueBtn from '../../components/common/BlueBtn';
import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import styles from '../../styles/pages/writeToiletInfo.module.scss';
import { ADDITIONAL } from '../../core/_axios/toilet';
import { useForm } from 'react-hook-form';
import AskReview from '../../components/modal/AskReview';
import Snackbar from '../../components/common/Snackbar';

const WriteToiletInfo = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const category = ['공용', '지하철', '기타'];
	const [categoryList, setCategoryList] = useState(-1);

	const turnstile = ['개찰구 안', '개찰구 밖'];
	const [turnstileList, setTurnstileList] = useState(null);

	const [open, setOpen] = useState(false);
	const [duplicated, setDuplicated] = useState(false);

	const [errorText, setErrorText] = useState('');

	const handlecategoryList = (idx) => {
		setCategoryList(idx);
	};

	const handleturnstileList = (idx) => {
		setTurnstileList(idx);
	};

	const { register, watch, handleSubmit } = useForm({
		mode: 'onChange',
		defaultValues: null,
	});

	const onSubmit = async () => {
		const form = {
			address: location.state.userAddress,
			detailAddress: watch('detailAddress'),
			category: categoryList,
			subway: turnstileList,
			lat: location.state.userLat,
			lng: location.state.userLng,
		};

		try {
			const {
				data: { success },
			} = await ADDITIONAL(form);

			if (success) {
				setOpen(true);
			}
		} catch (e) {
			console.log(e);
			if (e.response.status === 409 || e.response.status === 500) {
				setDuplicated(true);
				setTimeout(() => {
					setDuplicated(false);
				}, 3000);
			}
			setErrorText(e.message);
		}
	};

	return (
		<Layout>
			<Header text="화장실 추가" type="back" />
			<section className={styles.wrapper}>
				<article>
					<div className={styles.addressSection}>
						<p>화장실 위치</p>
						<p
							className={styles.modifyAddress}
							onClick={() => {
								navigate(-1);
							}}
						>
							주소 수정
						</p>
					</div>
					<div className={styles.addressWrite}>
						<div className={styles.addressInfo}>
							<p className={styles.title}>주소</p>
							<p>{location.state.userAddress}</p>
						</div>
						<input
							placeholder="정확한 위치 (선택) ex.뫄뫄빌딩 2층 복도 끝"
							name="detailAddress"
							{...register('detailAddress')}
						/>
					</div>
				</article>
				<article className={styles.category}>
					<p>카테고리</p>
					{category.map((list, i) => (
						<button
							onClick={() => {
								handlecategoryList(i);
							}}
							className={`${styles.btn} ${
								categoryList === i ? styles.active : ''
							}`}
							key={list}
						>
							{list}
						</button>
					))}

					{categoryList === 1 ? (
						<div className={styles.turnstile}>
							<p>개찰구 안에 있나요?</p>
							{turnstile.map((turnstile, i) => (
								<button
									key={turnstile}
									className={`${styles.btn} ${
										turnstileList === i ? styles.active : ''
									}`}
									onClick={() => {
										handleturnstileList(i);
									}}
								>
									{turnstile}
								</button>
							))}
						</div>
					) : null}
				</article>
				<form onSubmit={handleSubmit(onSubmit)}>
					<BlueBtn
						active={
							categoryList === -1 ||
							(categoryList === 1 && turnstileList === null)
								? false
								: true
						}
						text="화장실 추가"
					/>
				</form>
			</section>

			{duplicated && (
				<Snackbar key={Date.now()} type="error" text={errorText} />
			)}

			{open && <AskReview open={open} setOpen={setOpen} />}
		</Layout>
	);
};

export default WriteToiletInfo;
