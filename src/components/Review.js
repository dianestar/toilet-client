import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteConfirm from "./modal/DeleteConfirm";
import DeleteRequest from "./modal/DeleteRequest";
import { ReactComponent as StarFill } from "../assets/icons/starFill.svg";
import { ReactComponent as StarGray } from "../assets/icons/starGray.svg";
import { ReactComponent as KebabMenu } from '../assets/icons/kebabMenu.svg';
import styles from "../styles/components/review.module.scss";
import TempImg from "../assets/images/KakaoTalk_Photo_2022-04-18-22-19-10 003.jpeg"

const Review = ({ address, reviewInfo, toggle, setToggle, type }) => {
    const { id, nickname, rate, content, toilet_img, time } = reviewInfo;
    const [showing, setShowing] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [requestOpen, setRequestOpen] = useState(false);
    const [isWriter, setIsWriter] = useState(false);
    
    const navigate = useNavigate();

    const profileInfo = useSelector((state) => state.profileInfo);

    useEffect(() => {
        if (profileInfo.nickname === nickname) { setIsWriter(true); }
        else { setIsWriter(false); }
    }, [nickname, profileInfo.nickname])

    return (
        <>
            <section className={styles.review}>
                {type === "myreview" && <p className={styles.title} onClick={() => navigate(`/toilet_details/${address}`)}>{address}</p>}
                {Array(rate).fill(0).map((v, i) => <StarFill key={i} className={styles.star} width="10" height="10"/>)}
                {Array(5-rate).fill(0).map((v, i) => <StarGray key={i} className={styles.star} width="10" height="10"/>)}
                <span className={styles.date}>{time}</span>
                {type === "myreview" && toilet_img ?
                    <article className={styles[`img-list`]}>
                        <img className={styles.img} src={toilet_img} alt="temp"/>
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
                {((showing && type === "myreview") || (showing && isWriter)) && (
                    <ul className={styles.popUpList}>
                        <li onClick={() => navigate(`/edit_review/${id}`, {
                            state: {
                                address
                            }
                        })}>리뷰 수정</li>
                        <div className={styles.line} />
                        <li className={styles.red} onClick={() => setDeleteOpen(true)}>리뷰 삭제</li>
                    </ul>
                )}
                {(type === "toiletreview" && showing && !isWriter) && (
                    <ul className={styles.popUpList}>
                        <li className={styles.red} onClick={() => setRequestOpen(true)}>리뷰 신고</li>
                    </ul>
                )}
            </section>
            <DeleteConfirm open={deleteOpen} setOpen={setDeleteOpen} id={id} toggle={toggle} setToggle={setToggle}/>
            <DeleteRequest open={requestOpen} setOpen={setRequestOpen} id={id} toggle={toggle} setToggle={setToggle} type="review"/>
        </>
    );
}

export default Review;