/*global kakao*/
import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';
import AskReview from '../components/modal/AskReview';
import styles from '../styles/pages/addToilet.module.scss';
import BlueBtn from '../components/common/BlueBtn';
import pinSelectedNoBg from '../assets/icons/pinSelectedNoBg.svg';

const AddToilet = () => {
	const [open, setOpen] = useState(true);

	useEffect(() => {
		const mapContainer = document.getElementById('map'), // 지도를 표시할 div
			mapOption = {
				center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
				level: 3, // 지도의 확대 레벨
			};

		const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

		let marker = new kakao.maps.Marker({
			// 지도 중심좌표에 마커를 생성합니다
			position: map.getCenter(),
		});
		// 지도에 마커를 표시합니다
		marker.setMap(map);

		// 지도에 클릭 이벤트를 등록합니다
		// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
		kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
			// 클릭한 위도, 경도 정보를 가져옵니다
			var latlng = mouseEvent.latLng;

			// 마커 위치를 클릭한 위치로 옮깁니다
			marker.setPosition(latlng);
		});

		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition(function (position) {
				var lat = position.coords.latitude, // 위도
					lon = position.coords.longitude; // 경도

				var locPosition = new kakao.maps.LatLng(lat, lon);

				// 마커와 인포윈도우를 표시합니다
				displayMarker(locPosition);
			});
		} else {
			// HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

			var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);

			displayMarker(locPosition);
		}

		function displayMarker(locPosition) {
			// 마커를 생성합니다
			marker = new kakao.maps.Marker({
				map: map,
				position: locPosition,
			});

			// 지도 중심좌표를 접속위치로 변경합니다
			map.setCenter(locPosition);
		}
	}, []);

	return (
		<>
			<Layout>
				<Header type="hamburger" text="화장실 추가" />

				{/* <AskReview open={open} setOpen={setOpen} /> */}
				<section className={styles.map} id="map">
					<div className={styles.checkAddress}>
						<p>이 주소가 맞나요?</p>
						<div className={styles.btn}>
							<p className="infoText"></p>
							<BlueBtn text="이 위치로 주소 설정" />
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

export default AddToilet;
