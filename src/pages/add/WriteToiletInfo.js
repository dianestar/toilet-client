import React from 'react';
import { useNavigate } from 'react-router';
import BlueBtn from '../../components/common/BlueBtn';
import Header from '../../components/common/Header';
import Layout from '../../components/common/Layout';
import styles from '../../styles/pages/writeToiletInfo.module.scss';

const WriteToiletInfo = ({ userAddress }) => {
	const navigate = useNavigate();
	const category = ['공용', '지하철', '기타'];

	console.log(userAddress);
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
							<p>서울시 어쩌구 2-16</p>
						</div>
						<input placeholder="정확한 위치 (선택) ex.뫄뫄빌딩 2층 복도 끝" />
					</div>
				</article>
				<article className={styles.category}>
					<p>카테고리</p>
					{category.map((list) => (
						<button className={styles.btn} key={list}>
							{list}
						</button>
					))}
				</article>
				<BlueBtn text="화장실 추가" />
			</section>
		</Layout>
	);
};

export default WriteToiletInfo;
