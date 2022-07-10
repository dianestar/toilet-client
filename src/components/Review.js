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
import { GET_ONE_TOILET } from "../core/_axios/toilet";

const Review = ({ address, reviewInfo, toggle, setToggle, type }) => {
    const { review_id, nickname, rate, content, toilet_img, review_time, time, common, lock, paper, disabled, types } = reviewInfo;
    const [showing, setShowing] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [requestOpen, setRequestOpen] = useState(false);
    const [isWriter, setIsWriter] = useState(false);

    const [options, setOptions] = useState("");

    const [toiletInfo, setToiletInfo] = useState({});
    
    const navigate = useNavigate();

    const profileInfo = useSelector((state) => state.profileInfo);

    useEffect(() => {
        if (profileInfo.nickname === nickname) { setIsWriter(true); }
        else { setIsWriter(false); }

        const getToiletInfo = async () => {
            const {
                data: { success, data }
            } = await GET_ONE_TOILET({address});
            
            if (success) {
                console.log(data);
                setToiletInfo({
                    address: data.address,
                    detail_address: data.detailAddress,
                    category: data.category,
                    lat: data.lat,
                    lng: data.lng,
                    common: data.option.common,
                    lock: data.option.lock,
                    types: data.option.types.toString(),
                    paper: data.option.paper,
                    disabled: data.option.disabled,
                    subway: data.subway,
                    clean: data.clean,
                });
            }
        }

        getToiletInfo();

        let optionsStr = "";
        common ? optionsStr += "남녀공용" : optionsStr += "남녀분리";
        lock ? optionsStr += " | 비밀번호 O" : optionsStr += " | 비밀번호 X";
        optionsStr += " | ";
        types.split(",").forEach((v, i) => {
            if (i !== 0) optionsStr += ",";
            if (v === "0") optionsStr += "양변기";
            else if (v === "1") optionsStr += "좌변기";
            else optionsStr += "비데"
        });
        paper ? optionsStr += " | 휴지 O" : optionsStr += " | 휴지 X";
        disabled ? optionsStr += " | 장애인화장실 O " : optionsStr += " | 장애인화장실 X";
        setOptions(optionsStr);

    }, [nickname, profileInfo.nickname, address, common, lock, types, paper, disabled])

    return (
        <>
            <section className={styles.review}>
                {type === "myreview" && <p className={styles.title} onClick={() => navigate(`/toilet_details/${address}`, { state: { toiletInfo } })}>{address}</p>}
                {Array(rate).fill(0).map((v, i) => <StarFill key={i} className={styles.star} width="10" height="10"/>)}
                {Array(5-rate).fill(0).map((v, i) => <StarGray key={i} className={styles.star} width="10" height="10"/>)}
                <span className={styles.date}>{review_time || time}</span>
                <p className={styles.desc}>{options}</p>
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
                        <li onClick={() => navigate(`/edit_review/${address}/${review_id}`, {
                            state: {
                                reviewInfo
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
            <DeleteConfirm open={deleteOpen} setOpen={setDeleteOpen} id={review_id} toggle={toggle} setToggle={setToggle}/>
            <DeleteRequest open={requestOpen} setOpen={setRequestOpen} id={review_id} toggle={toggle} setToggle={setToggle} type="review"/>
        </>
    );
}

export default Review;