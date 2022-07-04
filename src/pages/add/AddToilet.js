/*global kakao*/
import React, { useState, useEffect } from 'react';
import Layout from '../../components/common/Layout';
import Header from '../../components/common/Header';
import AskReview from '../../components/modal/AskReview';
import styles from '../../styles/pages/addToilet.module.scss';
import BlueBtn from '../../components/common/BlueBtn';
import pinSelectedNoBg from '../../assets/icons/pinSelectedNoBg.svg';
import { useNavigate } from 'react-router-dom';
import WriteToiletInfo from './WriteToiletInfo';

const AddToilet = () => {
	const [open, setOpen] = useState(true);
	const [userAddress, setUserAddress] = useState('');
	const navi = useNavigate();

	useEffect(() => {
		const mapContainer = document.getElementById('map'), // 지도를 표시할 div
			mapOption = {
				center: new kakao.maps.LatLng(37.56646, 126.98121), // 지도의 중심좌표
				level: 3, // 지도의 확대 레벨
			};

		const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

		const imageSrc = pinSelectedNoBg, // 마커이미지의 주소입니다
			imageSize = new kakao.maps.Size(22, 32); // 마커이미지의 크기입니다

		const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

		let marker = new kakao.maps.Marker({
			// 지도 중심좌표에 마커를 생성합니다
			position: map.getCenter(),
			image: markerImage,
		});
		// 지도에 마커를 표시합니다

		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition(
				function (position) {
					let lat = position.coords.latitude, // 위도
						lon = position.coords.longitude; // 경도

					let locPosition = new kakao.maps.LatLng(lat, lon);

					map.setCenter(locPosition);
					// 마커와 인포윈도우를 표시합니다
					displayMarker(locPosition);
				},
				function (err) {
					if (err) {
						console.warn(`ERROR(${err.code}): ${err.message}`);
					}
				},
			);
		} else {
			// HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
			const locPosition = new kakao.maps.LatLng(37.56646, 126.98121);
			displayMarker(locPosition);
		}

		function displayMarker(locPosition) {
			// 마커를 생성합니다
			marker = new kakao.maps.Marker({
				map: map,
				position: locPosition,
				image: markerImage,
			});

			// 지도 중심좌표를 접속위치로 변경합니다
			map.setCenter(locPosition);
			searchDetailAddrFromCoords(map.getCenter(), displayCenterInfo);
		}

		const geocoder = new kakao.maps.services.Geocoder();

		// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다

		// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
		kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
			searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
				if (status === kakao.maps.services.Status.OK) {
					let infoText = document.querySelector('.infoText');
					infoText.innerHTML = result[0].address.address_name;
					marker.setPosition(mouseEvent.latLng);
					marker.setMap(map);
				}
			});
		});

		// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다

		function searchDetailAddrFromCoords(coords, callback) {
			// 좌표로 법정동 상세 주소 정보를 요청합니다
			geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
		}

		// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
		function displayCenterInfo(result, status) {
			if (status === kakao.maps.services.Status.OK) {
				let infoText = document.querySelector('.infoText');
				infoText.innerHTML = result[0].address.address_name;
			}
		}

		let handleUserAddress = function (result, status) {
			if (status === kakao.maps.services.Status.OK) {
				setUserAddress(result[0].address.address_name);
			}
		};

		geocoder.coord2Address(
			map.getCenter().getLng(),
			map.getCenter().getLat(),
			handleUserAddress,
		);
	}, [userAddress]);

	return (
		<>
			<Layout>
				<Header type="hamburger" text="화장실 추가" />

				{/* <AskReview open={open} setOpen={setOpen} /> */}
				<section className={styles.map} id="map">
					<div className={styles.checkAddress}>
						<p>이 주소가 맞나요?</p>
						<div className={styles.btn}>
							<div className={styles.address}>
								<p className="infoText"></p>
							</div>
							<BlueBtn
								text="이 위치로 주소 설정"
								onClick={() => {
									if (userAddress !== '') navi('/add_toilet/write_toilet_info');
									<WriteToiletInfo
										userAddress={userAddress}
										setUserAddress={setUserAddress}
									/>;
								}}
							/>
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

export default AddToilet;
