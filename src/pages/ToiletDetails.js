import React, { useEffect } from "react";
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
    useEffect(() => {
        /* 주소로 장소 표시하기  */
        let mapContainer = document.getElementById('map'), // 지도를 표시할 div
			mapOption = {
				center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
				level: 3, // 지도의 확대 레벨
			};

		// 지도를 생성합니다
		let map = new kakao.maps.Map(mapContainer, mapOption);

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch('경기 용인시 수지구 풍덕천동 696-1', function(result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">수지근린공원화장실</div>'
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        });    
    }, []);

    return (
        <Layout>
            <div className={styles[`toilet-details`]}>
                <Header type="back" text="화장실 정보"/>
                <section className={styles.map} id="map">
                </section>
                <section className={styles.details}>
                    <article className={styles[`title-div`]}>
                        <p>화장실 이름</p>
                        <section className={styles.distance}>
                            <Direction />
                            <span>200m</span>
                        </section>
                        <section className={styles.hashtag}>
                            <article>
                                #지하철
                            </article>
                            <article>
                                #개찰구 안
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
                            <span>청결</span>
							<span className={styles.content}>3</span>
                            <span>종류</span>
							<span className={styles.content}>남녀 공용</span>
                            <span>비밀번호</span>
							<span className={styles.content}>있음</span>
                            <span>변기</span>
							<span className={styles.content}>양변기,좌변기,비데</span>
							<span>휴지</span>
							<span className={styles.content}>있음</span>
                            <span>자판기</span>
							<span className={styles.content}>없음</span>
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
                            <span className={styles[`add-review`]}>리뷰 추가</span>
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