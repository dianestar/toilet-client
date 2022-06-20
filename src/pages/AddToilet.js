import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';
import AskReview from '../components/modal/AskReview';
import styles from '../styles/pages/addToilet.module.scss';
import BlueBtn from '../components/common/BlueBtn';
import Btn from '../components/common/Btn';

const AddToilet = () => {
	const [open, setOpen] = useState(true);

	return (
		<>
			<Layout>
				<Header type="hamburger" text="화장실 추가" />
				<section className={styles.wrapper}>
					{/* <AskReview open={open} setOpen={setOpen} /> */}
					<div className={styles.checkAddress}>
						<p>이 주소가 맞나요?</p>
						<div className={styles.btn}>
							<Btn text="서울시 어쩌구 2-16" />
							<BlueBtn text="이 위치로 주소 설정" />
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

export default AddToilet;
