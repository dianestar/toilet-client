import React, { useState } from "react";
import DeleteConfirm from "./modal/DeleteConfirm";
import { ReactComponent as StarFill } from "../assets/icons/starFill.svg";
import { ReactComponent as StarGray } from "../assets/icons/starGray.svg";
import { ReactComponent as KebabMenu } from '../assets/icons/kebabMenu.svg';
import styles from "../styles/components/review.module.scss";
import TempImg from "../assets/images/KakaoTalk_Photo_2022-04-18-22-19-10 003.jpeg"

const Review = ({ reviewInfo, toggle, setToggle }) => {
    const { id, rate, content, toilet_img, time } = reviewInfo;
    const [showing, setShowing] = useState(false);
    const [open, setOpen] = useState(false);

    return (
        <>
            <section className={styles.review}>
                <p className={styles.title}>화장실 주소</p>
                {Array(rate).fill(0).map(() => <StarFill className={styles.star} width="10" height="10"/>)}
                {Array(5-rate).fill(0).map(() => <StarGray className={styles.star} width="10" height="10"/>)}
                <span className={styles.date}>{time}</span>
                {toilet_img ?
                    <article className={styles[`img-list`]}>
                        <img className={styles.img} src={TempImg} alt="temp"/>
                    </article>
                    :
                    null
                }
                <p className={styles.content}>{content}</p>
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
            <DeleteConfirm open={open} setOpen={setOpen} id={id} toggle={toggle} setToggle={setToggle}/>
        </>
    );
}

export default Review;