import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/common/Layout';
import NavBar from '../components/common/NavBar';
import SearchBox from '../components/SearchBox';
import ToiletInfo from '../components/ToiletInfo';
import styles from '../styles/pages/map.module.scss';
import { AROUND_TOILET } from '../core/_axios/toilet';
import pinDefaultNoBg from "../assets/icons/pinDefaultNoBg.svg";
import pinSelectedNoBg from "../assets/icons/pinSelectedNoBg.svg";

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

	// 주변에 있는 화장실 리스트
	const [toiletList, setToiletList] = useState([{lat: 37.307788898019304, lng: 127.07257059314489}]);

	// 디스플레이 여부 설정하는 변수들
	const [showInfo, setShowInfo] = useState(false);
	const [showBtn, setShowBtn] = useState(false);
	const [showWarning, setShowWarning] = useState(false);

	// 검색창
	const [keyword, setKeyword] = useState("");
	const [searchMode, setSearchMode] = useState(false);
	const [candidates, setCandidates] = useState([]);
	const [noResult, setNoResult] = useState(false);

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

	const doSearch = (newKeyword) => {
		// 검색 
		setNoResult(false);

		// 장소 검색 서비스 객체를 생성
		let places = new kakao.maps.services.Places();

		// 검색 결과를 받을 콜백 함수
		let setNewKeyword = function(result, status, pagination) {
			if (status === kakao.maps.services.Status.OK) {
				console.log(result);
				setCandidates(result);

				console.log(pagination);
				let $pages = document.getElementById("pages");
				while ($pages.hasChildNodes()) {
					$pages.removeChild($pages.lastChild);
				}

				for (let i=1; i<=pagination.last; i++) {
					let $a = document.createElement("a");
					$a.href = "#";
					$a.innerHTML = i;

					if (i===pagination.current) {
						$a.style.fontWeight = "bold"
					}
					else {
						$a.onclick = (function(i) {
							return function() {
								pagination.gotoPage(i);
							}
						})(i);
					}
					$pages.appendChild($a);
				}
			}
			else {
				setNoResult(true);
			}
		}
		places.keywordSearch(newKeyword, setNewKeyword);
	}

	const confirmSearch = (address) => {
		let geocoder = new kakao.maps.services.Geocoder();
		let callback = function(result, status) {
			if (status === kakao.maps.services.Status.OK) {
				console.log(result);
				map.setCenter(new kakao.maps.LatLng(result[0].y, result[0].x));
				setKeyword(address);
				setSearchMode(false);
				setCandidates([]);
			}
		};
		
		geocoder.addressSearch(address, callback);
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

		// 마커이미지생성
		let markerDefault = new kakao.maps.MarkerImage(pinDefaultNoBg, new kakao.maps.Size(20, 28));
		let markerSelected = new kakao.maps.MarkerImage(pinSelectedNoBg, new kakao.maps.Size(22, 32));

		// 주변 화장실 마커 생성
		for (let i=0; i<toiletList.length; i++) {
			let marker = new kakao.maps.Marker({
				map: map,
				position: new kakao.maps.LatLng(toiletList[i].lat, toiletList[i].lng),
				title: toiletList[i].address,
				image: markerDefault,
			});

			// 화장실 마커 클릭 이벤트
			kakao.maps.event.addListener(marker, "click", function() {
				if (marker.getImage().Yj.indexOf("pinDefaultNoBg") !== -1) {
					marker.setImage(markerSelected);
					setShowInfo(true);
				}
				else {
					marker.setImage(markerDefault);
					setShowInfo(false);
				}
			})
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

		// 검색창 기본 주소값 설정
		// 주소-좌표 변환 객체를 생성
		let geocoder = new kakao.maps.services.Geocoder();
		let setDefaultKeyword = function(result, status) {
			if (status === kakao.maps.services.Status.OK) {
				console.log(result);
				setKeyword(result[0].address.address_name);
			}
		}
		// 좌표 값에 해당하는 구 주소와 도로명 주소 정보를 요청
		geocoder.coord2Address(map.getCenter().getLng(), map.getCenter().getLat(), setDefaultKeyword);

		
	}, [mapLevel, userLat, userLng, centerLat, centerLng, toiletList]);

	return (
		<Layout>
			<section className={styles.map} id="map">
				<SearchBox keyword={keyword} setKeyword={setKeyword} searchMode={searchMode} setSearchMode={setSearchMode} doSearch={doSearch}/>
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
			{searchMode &&
			<section id="dropdown" className={styles.dropdown}>
				{noResult && <p className={styles[`no-result`]}>검색 결과가 존재하지 않습니다</p>}
				{candidates.map((v, i) => (
					<article key={i} className={styles.candidates} onClick={() => confirmSearch(v.address_name)}>
						<p className={styles.place}>{v.place_name}</p>
						<p className={styles.address}>{v.address_name}</p>
						<p className={styles.address}>{v.road_address_name}</p>
						<hr />
					</article>
				))}
				<article id="pages" className={styles.pages}>
				</article>
			</section>
			}
		</Layout>
	);
};

export default Map;
