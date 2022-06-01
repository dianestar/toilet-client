import React from 'react';
import styles from '../styles/components/toiletInfo.module.scss';
import { ReactComponent as Pin } from '../assets/icons/pin.svg';
import star from '../assets/icons/star.png';
import ellipsis from '../assets/icons/more.png';

const ToiletInfoOnMap = () => {
	return (
		<section className={styles.wrapper}>
			<article className={styles.text}>
				<p className={styles.title}>화장실 이름</p>
				<section className={styles.desc}>
					<Pin />
					<span>서울시 어쩌구 빌딩 2층</span>
					<img src={star} alt={star} />
					<span>4.2</span>
				</section>
				<section className={styles.category}>#카테고리</section>
				<section className={styles.details}>
					<span>청결</span>
					<span className={styles.content}>3</span>
					<span>휴지</span>
					<span className={styles.content}>있음</span>
					<span>변기</span>
					<span className={styles.content}>양변기</span>
					<span>비밀번호</span>
					<span className={styles.content}>있음</span>
				</section>
			</article>
			<article className={styles.icon}>
				<img className={styles.ellipsis} src={ellipsis} alt="ellipsis" />
				<span className={styles.more}>더보기 &gt;</span>
			</article>
		</section>
	);
};

export default ToiletInfoOnMap;
