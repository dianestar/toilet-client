import React, { useState } from "react";
import { ReactComponent as StarFill } from "../assets/icons/starFill.svg";
import { ReactComponent as StarHalfGray } from "../assets/icons/starHalfGray.svg";
import { ReactComponent as StarGray } from "../assets/icons/starGray.svg";
import { ReactComponent as KebabMenu } from '../assets/icons/kebabMenu.svg';
import styles from "../styles/components/review.module.scss";
import TempImg from "../assets/images/KakaoTalk_Photo_2022-04-18-22-19-10 003.jpeg"

const Review = ({ yesImg, setOpen }) => {
    const [showing, setShowing] = useState(false);

    return (
        <section className={styles.review}>
            <p className={styles.title}>화장실 이름</p>
            <StarFill className={styles.star}/>
            <StarFill className={styles.star}/>
            <StarHalfGray className={styles.star}/>
            <StarGray className={styles.star}/>
            <StarGray className={styles.star}/>
            <span className={styles.date}>2022/02/16</span>
            {yesImg ?
                <article className={styles[`img-list`]}>
                    <img className={styles.img} src={TempImg} alt="temp"/>
                </article>
                :
                null
            }
            <p className={styles.content}>화장실 리뷰 들어가는 부분입니다. 이 부분은 텍스트 제한 없이 그냥 완전 길면 완전 길게 쭉 늘어지게 해주세요.
                <br/>
                <br/>
                이렇게 줄 바꿈해서 작성하면 줄바꿈한게 그냥 보여지게요.
            </p>
            <KebabMenu
                className={styles.ellipsis}
                onClick={() => {
                    setShowing(!showing);
                }}
            />
            {showing && (
                <ul className={styles.popUpList}>
                    <li>리뷰 수정</li>
                    <div className={styles.line} />
                    <li className={styles.deleteBtn} onClick={() => setOpen(true)}>리뷰 삭제</li>
                </ul>
            )}
        </section>
    );
}

export default Review;