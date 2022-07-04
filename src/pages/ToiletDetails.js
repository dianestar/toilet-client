import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Review from "../components/Review";
import styles from "../styles/pages/toiletDetails.module.scss";
import { ReactComponent as Direction } from "../assets/icons/direction.svg";
import { ReactComponent as StarFill } from "../assets/icons/starFill.svg";
import { ReactComponent as StarHalfGray } from "../assets/icons/starHalfGray.svg";
import TempImg from "../assets/images/KakaoTalk_Photo_2022-04-18-22-19-10 003.jpeg"

const { kakao } = window;
const arr = Array(5).fill(0);

const ToiletDetails = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { address, detail_address, category, lat, lng, distance, common, lock, types, paper, disabled } = location.state.toiletInfo;
    
    useEffect(() => {
        let coords = new kakao.maps.LatLng(lat, lng);

        let mapContainer = document.getElementById('map'),
			mapOption = {
				center: coords,
				level: 3,
			};

		let map = new kakao.maps.Map(mapContainer, mapOption);
        map.setDraggable(false);
        map.setZoomable(false);
        
        new kakao.maps.Marker({
            map: map,
            position: coords
        });
    }, [lat, lng]);

    return (
        <Layout>
            <div className={styles[`toilet-details`]}>
                <Header text="화장실 정보"/>
                <section className={styles.map} id="map">
                </section>
                <section className={styles.details}>
                    <article className={styles[`title-div`]}>
                        <p>{address}</p>
                        <section className={styles.distance}>
                            <Direction />
                            <span>약 {Math.round(distance * 1000)}m</span>
                        </section>
                        <section className={styles.hashtag}>
                            <article>
                                {category === "0" ? "#공용" : (category === "1" ? "#지하철" : "#기타")}
                            </article>
                            <article>
                                #{detail_address}
                            </article>
                        </section>
                    </article>
                    <article className={styles[`option-div`]}>
                        <div className={styles.stars}>
                            <p>4.2</p>
                            <div>
                                <StarFill className={styles.star} width="16" height="16" />
                                <StarFill className={styles.star} width="16" height="16" />
                                <StarFill className={styles.star} width="16" height="16" />
                                <StarFill className={styles.star} width="16" height="16" />
                                <StarHalfGray className={styles.star} width="16" height="16" />
                            </div>
                        </div>
                        <div className={styles.options}>
                            <span>종류</span>
							<span className={styles.content}>{common ? "남녀 공용" : "남녀 분리"}</span>
                            <span>비밀번호</span>
							<span className={styles.content}>{lock ? "있음" : "없음"}</span>
                            <span>변기</span>
							<span className={styles.content}>{types === "0" ? "양변기" : (types === "1" ? "좌변기" : "비데")}</span>
							<span>휴지</span>
							<span className={styles.content}>{paper ? "있음" : "없음"}</span>
                            <span>장애인화장실</span>
							<span className={styles.content}>{disabled ? "있음" : "없음"}</span>
                        </div>
                    </article>
                    <article className={styles[`image-div`]}>
                        <p>사진</p>
                        <div>
                            {arr.map(() => {
                                return (
                                    <img src={TempImg} alt="temp"/>
                                );
                            })}
                        </div>
                    </article>
                    <article className={styles[`review-div`]}>
                        <div className={styles[`review-header`]}>
                            <span className={styles[`review-title`]}>리뷰</span>
                            <span className={styles[`add-review`]}
                                onClick={() => navigate(`/write_review/${address}`, {
                                    state: {
                                        address,
                                        detail_address
                                    }
                                })}
                            >
                                리뷰 추가
                            </span>
                        </div>
                        <div>
                            {arr.map(() => {
                                return (
                                    <Review />
                                );
                            })}
                        </div>
                    </article>
                </section>
            </div>
        </Layout>
    );
}

export default ToiletDetails;