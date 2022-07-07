import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/common/Layout";
import Header from "../components/common/Header";
import Review from "../components/Review";
import styles from "../styles/pages/toiletDetails.module.scss";
import { ReactComponent as Direction } from "../assets/icons/direction.svg";
import { ReactComponent as StarFill } from "../assets/icons/starFill.svg";
import { ReactComponent as StarHalfGray } from "../assets/icons/starHalfGray.svg";
import { GET_TOILET_REVIEWS } from "../core/_axios/review";

const { kakao } = window;

const ToiletDetails = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const { address, detail_address, category, lat, lng, distance, common, lock, types, paper, disabled } = location.state.toiletInfo;
    const [reviews, setReviews] = useState([]);
    const [images, setImages] = useState([]);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const getToiletReviews = async () => {
            try {
                const {
                    data: { success, data }
                } = await GET_TOILET_REVIEWS({ address });
    
                if (success) {
                    console.log(data);
                    setReviews(data);

                    let temp = [...images];
                    data.forEach((v) => {
                        if (v.toilet_img && !temp.includes(v.toilet_img)) { temp.push(v.toilet_img); }
                    })
                    setImages(temp);
                }
            } catch (error) {
                console.log(error);
            }
        }

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

        getToiletReviews();
        
    }, [lat, lng, address, toggle]);

    return (
        <Layout>
            <Header type="back" text="화장실 정보"/>
            <div className={styles[`toilet-details`]}>
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
							<span className={styles.content}>{common === null ? "-" : (common ? "남녀 공용" : "남녀 분리")}</span>
                            <span>비밀번호</span>
							<span className={styles.content}>{lock === null ? "-" : (lock ? "있음" : "없음")}</span>
                            <span>변기</span>
							<span className={styles.content}>{types?.split(",").map((v, i) => {
                                let str = "";
                                if (i !== 0) { str += ","; }
                                if (v === "0") { str += "양변기"; }
                                else if (v === "1") { str += "좌변기"; }
                                else { str += "비데"; }
                                return str;
                            })}</span>
							<span>휴지</span>
							<span className={styles.content}>{paper === null ? "-" : (paper ? "있음" : "없음")}</span>
                            <span>장애인화장실</span>
							<span className={styles.content}>{disabled === null ? "-" : (disabled ? "있음" : "없음")}</span>
                        </div>
                    </article>
                    <article className={styles[`image-div`]}>
                        <p>사진</p>
                        <div>
                            {images.map((v) => <img key={v} src={v} alt="temp"/>)}
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
                            {reviews.map((v) => {
                                return (
                                    <Review key={v.id} address={address} reviewInfo={v} toggle={toggle} setToggle={setToggle} type="toiletreview"/>
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