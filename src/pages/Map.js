import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import NavBar from '../components/common/NavBar';
import SearchBox from '../components/SearchBox';
import ToiletInfo from '../components/ToiletInfo';
import styles from '../styles/pages/map.module.scss';
import { AROUND_TOILET } from '../core/_axios/toilet';

const { kakao } = window;
let map;

const Map = () => {
	// 현재 사용자 위치의 위도 경도
	const [userLat, setUserLat] = useState(null);
	const [userLng, setUserLng] = useState(null);

	// 현재 지도 중심좌표의 위도 경도
	const [centerLat, setCenterLat] = useState(null);
	const [centerLng, setCenterLng] = useState(null);

	// 지도 레벨 및 주변 화장실 조회할 반경
	const [mapLevel, setMapLevel] = useState(3);
	const [distance, setDistance] = useState(1);

	const [toiletList, setToiletList] = useState([{lat: 37.307788898019304, lng: 127.07257059314489}]);

	const [showInfo, setShowInfo] = useState(false);
	const [showBtn, setShowBtn] = useState(false);
	const [showWarning, setShowWarning] = useState(false);

	const onValid = (position) => {
		setUserLat(position.coords.latitude);
		setUserLng(position.coords.longitude);
	};

	const onInvalid = () => {
		console.log('unable to get your location');
	};

	const getToilet = async () => {
		console.log(map.getCenter().getLat());
		console.log(map.getCenter().getLng());

		setCenterLat(map.getCenter().getLat());
		setCenterLng(map.getCenter().getLng());
		setShowBtn(false);

		const form = {
			lat: map.getCenter().getLat(),
			lng: map.getCenter().getLng(),
			dist: distance,
		};

		try {
			const {
				data: { success, data}
			} = await AROUND_TOILET(form);
			
			if (success) {
				console.log(data);
				setToiletList([{lat: 37.307788898019304, lng: 127.07257059314489}, {lat: 37.29782540183662, lng: 127.0692958590957}]);
			}
			
		} catch (error) {
			console.log(error);
		}
		
	}

	useEffect(() => {
		let mapContainer = document.getElementById('map'), // 지도를 표시할 div
			mapOption = {
				center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
				level: mapLevel, // 지도의 확대 레벨
			};

		// 지도를 표시할 div와 지도 옵션으로 지도를 생성
		map = new kakao.maps.Map(mapContainer, mapOption);

		// 지도의 최고 레벨 값 설정
		map.setMaxLevel(10);

		// 현재 위치 정보 가져오기
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onValid, onInvalid);
		} else {
			console.log('Geolocation not supported');
		}

		// 현재 위치로 지도 범위를 재설정
		let userPosition = new kakao.maps.LatLng(userLat, userLng);

		// 현재 위치 마커를 지도에 추가
		let userMarker = new kakao.maps.Marker({ position: userPosition });
		userMarker.setMap(map);

		// 처음에는 지도의 중심좌표를 현재 사용자의 위치로 설정
		if (centerLat === null && centerLng === null) {
			setCenterLat(userLat);
			setCenterLng(userLng);
			map.setCenter(userPosition);
		}
		// 그 외에는 변경된 지도의 중심좌표로 설정
		else {
			map.setCenter(new kakao.maps.LatLng(centerLat, centerLng));
		}

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
			console.log("변경된 지도 중심좌표 " + latlng );

			let currentBounds = map.getBounds();
			console.log("이전 지도 중심좌표 ", centerLat, centerLng);
			console.log("변경된 영역 ", currentBounds);

			console.log(centerLat < currentBounds.getNorthEast().getLat());
			console.log(centerLat > currentBounds.getSouthWest().getLat());
			console.log(centerLng < currentBounds.getNorthEast().getLng());
			console.log(centerLng > currentBounds.getSouthWest().getLng());

			// 중심좌표가 화면 밖으로 벗어난 경우 재검색 버튼 노출
			if (centerLat > currentBounds.getNorthEast().getLat() || centerLat < currentBounds.getSouthWest().getLat()
			|| centerLng > currentBounds.getNorthEast().getLng() || centerLng < currentBounds.getSouthWest().getLng()) {
				setShowBtn(true);
			}
		})

		// 확대/축소 이벤트 등록
		kakao.maps.event.addListener(map, 'zoom_changed', function() {        			
			let currentLevel = map.getLevel();
			setMapLevel(currentLevel);
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
	}, [mapLevel, userLat, userLng, centerLat, centerLng, toiletList]);
	
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
