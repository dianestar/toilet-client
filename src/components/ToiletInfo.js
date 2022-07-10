import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DeleteRequest from './modal/DeleteRequest';
import styles from '../styles/components/toiletInfo.module.scss';
import { ReactComponent as PinSelected } from '../assets/icons/pinSelected.svg';
import { ReactComponent as KebabMenu } from '../assets/icons/kebabMenu.svg';
import { ReactComponent as StarFill } from '../assets/icons/starFill.svg';
import { ReactComponent as More } from '../assets/icons/more.svg';

const ToiletInfo = ({ type, toiletInfo }) => {
	const { address, detail_address, category, subway, lat, lng, distance, common, lock, types, paper, disabled, clean } = toiletInfo;
	
	const [open, setOpen] = useState(false);
	const [showing, setShowing] = useState(false);

	const navigate = useNavigate();

	return (
		<>
			<div className={type === "onMap" ? styles.onMap : styles.onList}>
				<section className={styles.wrapper}>
					<article className={styles.text}>
						<p className={styles.title}>{address}</p>
						<section className={styles.desc}>
							<PinSelected />
							<span>{detail_address}</span>
							<StarFill width="12" height="12"/>
							<span>{clean.toFixed(2)}</span>
						</section>
						<section className={styles.category}>
							<article>{category === "0" ? "#공용" : category === "1" ? "#지하철" : "#기타"}</article>
							{category === "1" && <article className={styles.category}>{subway === "0" ? "#개찰구 안" : "#개찰구 밖"}</article>}
						</section>
						<section className={styles.details}>
							<span>종류</span>
							<span className={styles.content}>{common === null ? "-" : (common ? "남녀 공용" : "남녀 분리")}</span>
							<span>비밀번호</span>
							<span className={styles.content}>{lock === null ? "-" : (lock ? "있음" : "없음")}</span>
							<span>휴지</span>
							<span className={styles.content}>{paper === null ? "-" : (paper ? "있음" : "없음")}</span>
							<span>장애인화장실</span>
							<span className={styles.content}>{disabled === null ? "-" : (disabled ? "있음" : "없음")}</span>
						</section>
					</article>
					<article className={styles.icon}>
						<KebabMenu
							className={styles.ellipsis}
							onClick={() => {
								setShowing(!showing);
							}}
						/>
						<span
							className={styles.more}
							onClick={() => navigate(`/toilet_details/${address}`, {
								state: {
									toiletInfo
								}
							})}
						>
							더보기 <More />
						</span>
						{showing && (
							<ul className={styles.popUpList}>
								<li
									onClick={() => navigate(`/write_review/${address}`)}
								>
									리뷰 추가
								</li>
								<div className={styles.line} />
								<li
									className={styles.deleteBtn}
									onClick={() => setOpen(true )}
								>
									삭제 요청
								</li>
							</ul>
						)}
					</article>
				</section>
			</div>
			<DeleteRequest open={open} setOpen={setOpen} id={address} type={"toilet"}/>
		</>
	);
};

export default ToiletInfo;
