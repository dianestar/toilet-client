import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import NavBar from '../components/common/NavBar';
import SearchBox from '../components/SearchBox';
import ToiletInfo from '../components/ToiletInfo';
import styles from '../styles/pages/map.module.scss';
import { AROUND_TOILET } from '../core/_axios/toilet';

const { kakao } = window;

const Map = () => {
	const [latitude, setLatitude] = useState(null);
	const [longitude, setLongitude] = useState(null);
	const [distance, setDistance] = useState(1);

	const [toiletList, setToiletList] = useState([{lat: 37.307788898019304, lng: 127.07257059314489}]);

	const [showInfo, setShowInfo] = useState(false);
	const [showBtn, setShowBtn] = useState(false);
	const [showWarning, setShowWarning] = useState(false);

	const onValid = (position) => {
		setLatitude(position.coords.latitude);
		setLongitude(position.coords.longitude);
	};

	const onInvalid = () => {
		console.log('unable to get your location');
	};

	const getToilet = async () => {
		const form = {
			lat: latitude,
			lng: longitude,
			dist: distance,
		};

		try {
			const {
				data: { success, data}
			} = await AROUND_TOILET(form);
			
			if (success) {
				console.log(data);
				setToiletList(data);
			}
			
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		let mapContainer = document.getElementById('map'), // 지도를 표시할 div
			mapOption = {
				center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
				level: 3, // 지도의 확대 레벨
			};

		// 지도를 표시할 div와 지도 옵션으로 지도를 생성
		let map = new kakao.maps.Map(mapContainer, mapOption);

		// 현재 위치 정보 가져오기
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onValid, onInvalid);
		} else {
			console.log('Geolocation not supported');
		}

		// 현재 위치로 지도 범위를 재설정
		let point = new kakao.maps.LatLng(latitude, longitude);

		// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
		let bounds = new kakao.maps.LatLngBounds();

		// 현재 위치 마커를 지도에 추가
		let currentMarker = new kakao.maps.Marker({ position: point });
		currentMarker.setMap(map);

		// LatLngBounds 객체에 좌표를 추가
		bounds.extend(point);

		// LatLngBounds 객체에 추가된 좌표를 기준으로 지도의 범위를 재설정
		map.setBounds(bounds);

		// 지도의 최고 레벨 값 설정
		map.setMaxLevel(10);

		// 주변 화장실 마커 생성
		for (let i=0; i<toiletList.length; i++) {
			let marker = new kakao.maps.Marker({
				map: map,
				position: new kakao.maps.LatLng(toiletList[i].lat, toiletList[i].lng),
				title: toiletList[i].address,
			});
		}

		// 이동 이벤트 등록
		kakao.maps.event.addListener(map, "dragend", function() {
			let latlng = map.getCenter();
			console.log("변경된 지도 중심좌표는 " + latlng + " 입니다.");

			setShowBtn(true);
		})

		// 확대/축소 이벤트 등록
		kakao.maps.event.addListener(map, 'zoom_changed', function() {        			
			let currentLevel = map.getLevel();
			console.log("변경된 지도 확대/축소 레벨은 " + currentLevel + " 입니다.");

			if (currentLevel >= 8) {
				setShowWarning(true);
				setShowBtn(false);
			}
			else {
				setShowWarning(false);
				setShowBtn(true);
				if (currentLevel <= 4) { setDistance(1); }
				else if (currentLevel === 5) { setDistance(2); }
				else if (currentLevel === 6) { setDistance(3); }
				else { setDistance(5); }
			}
		});
	}, [latitude, longitude, toiletList]);
	
	return (
		<Layout>
			<section className={styles.map} id="map">
				<SearchBox />
				{showInfo && 
				<ToiletInfo type="onMap"/>
				}
				<NavBar num={[0, 1, 1, 1]} />
				{showBtn &&
				<button className={styles.research} onClick={getToilet}>
					현 지도에서 재검색하기
				</button>
				}
				{showWarning ?				
				<article className={styles.warning}>
					보고 있는 지역이 너무 넓습니다
					<br/>
					지도를 확대해주세요
				</article>
				:
				null
				}
			</section>
		</Layout>
	);
};

export default Map;
