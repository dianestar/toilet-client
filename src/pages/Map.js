/* eslint-disable no-loop-func */
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
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
let selectedMarker = null;
let markerDefault = new kakao.maps.MarkerImage(pinDefaultNoBg, new kakao.maps.Size(20, 28));
let markerSelected = new kakao.maps.MarkerImage(pinSelectedNoBg, new kakao.maps.Size(22, 32));

const Map = () => {
	// 유저 정보 (user.imgUrl: 유저 프로필이미지)
	const user = useSelector((state) => state.profileInfo);

	// 현재 사용자 위치의 접근 허용 여부, 위도, 경도
	const [isValid, setIsValid] = useState(false);
	const [userLat, setUserLat] = useState(null);
	const [userLng, setUserLng] = useState(null);

	// 현재 지도 중심좌표의 위도, 경도
	const [centerLat, setCenterLat] = useState(null);
	const [centerLng, setCenterLng] = useState(null);

	// 지도 레벨 및 주변 화장실 조회 반경
	const [mapLevel, setMapLevel] = useState(3);
	const [distance, setDistance] = useState(0.3);

	// 주변에 있는 화장실 리스트
	const [toiletList, setToiletList] = useState([]);

	// 디스플레이 여부 설정 변수
	const [showInfo, setShowInfo] = useState(false);
	const [showBtn, setShowBtn] = useState(false);
	const [showWarning, setShowWarning] = useState(false);

	// 검색창 관련
	const [keyword, setKeyword] = useState("");
	const [searchMode, setSearchMode] = useState(false);
	const [candidates, setCandidates] = useState([]);
	const [noResult, setNoResult] = useState(false);

	// ToiletInfo props
	const [toiletInfo, setToiletInfo] = useState({
		address: "화장실 이름",
		detail_address: "서울시 어쩌구 빌딩 2층",
	});

	/* navigator.geolocation 콜백 함수 */
	const onValid = (position) => {
		setIsValid(true);
		setUserLat(position.coords.latitude);
		setUserLng(position.coords.longitude);
	};

	const onInvalid = () => {
		setIsValid(false);
		setUserLat(37.56646);
		setUserLng(126.98121);
	};
	/********************************************/

	/* 화장실 가져오기 (AROUND_TOILET API 활용 부분) */
	const getToilet = async (isInitial) => {
		if (!isInitial) {
			setCenterLat(map.getCenter().getLat());
			setCenterLng(map.getCenter().getLng());
			setShowBtn(false);	
		}

		const form = {
			lat: !isInitial ? map.getCenter().getLat() : userLat,
			lng: !isInitial ? map.getCenter().getLng() : userLng,
			dist: distance,
		};

		try {
			const {
				data: { success, data }
			} = await AROUND_TOILET(form);
			
			if (success) {
				setToiletList(data);
			}
		} catch (error) {
			console.log(error);
		}		
	}
	/******************************************/

	/* 마커 클릭 이벤트 시 화장실 필터링 */
	const filterToiletInfo = (title) => {
		toiletList.forEach((v) => {
			if (v.address === title) { setToiletInfo(v); }
		});
	}
	/******************************************/

	/* 검색창 관련 함수 */
	const doSearch = (newKeyword) => {
		setNoResult(false);
		setCandidates([]);
		let $pages = document.getElementById("pages");
		while ($pages.hasChildNodes()) { $pages.removeChild($pages.lastChild); }

		let places = new kakao.maps.services.Places();
		let setNewKeyword = function(result, status, pagination) {
			if (status === kakao.maps.services.Status.OK) {
				setCandidates(result);

				while ($pages.hasChildNodes()) { $pages.removeChild($pages.lastChild); }
				for (let i=1; i<=pagination.last; i++) {
					let $a = document.createElement("a");
					$a.href = "#";
					$a.innerHTML = i;
					if (i === pagination.current) {
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
				map.setCenter(new kakao.maps.LatLng(result[0].y, result[0].x));
				setCandidates([]);
				setNoResult(false);
				setShowInfo(false);
				setSearchMode(false);
				setKeyword(address);
				setShowBtn(true);
			}
		};
		geocoder.addressSearch(address, callback);
	}
	/*******************************/

	useEffect(() => {
		// 현재 위치 정보 가져오기
		navigator.geolocation.getCurrentPosition(onValid, onInvalid);
		let userPosition = new kakao.maps.LatLng(userLat, userLng);

		// 지도 생성하기
		let mapContainer = document.getElementById('map'),
			mapOption = {
				center: userPosition,
				level: mapLevel,
			};
		map = new kakao.maps.Map(mapContainer, mapOption);
		map.setMaxLevel(10);

		// 현재 위치 허용한 경우만 현재 위치에 프로필 이미지 표시
		if (isValid) {
			// 커스텀 오버레이 활용
			let $outerDiv = document.createElement("div");
			$outerDiv.style.cssText = "width:100px; height:100px; border-radius:50%; background-color:#589FD21A; display:flex; justify-content:center; align-items:center;";
			
			let $innerDiv = document.createElement("div");
			$innerDiv.style.cssText = "width:66px; height:66px; border-radius:50%; background-color:#589FD233; display:flex; justify-content:center; align-items:center;";
			$outerDiv.appendChild($innerDiv);

			let $img = document.createElement("img");
			$img.src = user.imgUrl;
			$img.alt = "user";
			$img.style.cssText = "width:42px; height:42px; border-radius:50%; object-fit:cover";
			$innerDiv.appendChild($img);

			new kakao.maps.CustomOverlay({
				map: map,
				position: userPosition,
				content: $outerDiv,
				yAnchor: 1 
			});
		}

		// 처음에는 지도의 중심좌표를 현재 사용자의 위치로 설정
		if (centerLat === null && centerLng === null) {
			setCenterLat(userLat);
			setCenterLng(userLng);
			map.setCenter(userPosition);
			getToilet(true);
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
				image: markerDefault,
			});

			// 화장실 마커 클릭 이벤트
			kakao.maps.event.addListener(marker, "click", function() {
				if (selectedMarker === marker && marker.getImage().Yj.indexOf("pinDefaultNoBg") === -1) {
					marker.setImage(markerDefault);
					setShowInfo(false);
				}

				else if (!selectedMarker || selectedMarker !== marker) {
					!!selectedMarker && selectedMarker.setImage(markerDefault);
					marker.setImage(markerSelected);
				}
				selectedMarker = marker;
				filterToiletInfo(marker.getTitle());
				marker.setImage(markerSelected);
				map.setCenter(marker.getPosition());
				map.setLevel(3);
				setShowInfo(true);
			})
		}

		// 검색창 기본 주소값 설정
		let geocoder = new kakao.maps.services.Geocoder();
		let setDefaultKeyword = function(result, status) {
			if (status === kakao.maps.services.Status.OK) {
				setKeyword(result[0].address.address_name);
			}
		}
		geocoder.coord2Address(map.getCenter().getLng(), map.getCenter().getLat(), setDefaultKeyword);

		// 이동 이벤트 등록
		kakao.maps.event.addListener(map, "dragend", function() {
			let latlng = map.getCenter();
			console.log("변경된 지도 중심좌표 " + latlng );

			let currentBounds = map.getBounds();
			console.log("이전 지도 중심좌표 ", centerLat, centerLng);
			console.log("변경된 영역 ", currentBounds);

			if (centerLat > currentBounds.getNorthEast().getLat() || centerLat < currentBounds.getSouthWest().getLat()
			|| centerLng > currentBounds.getNorthEast().getLng() || centerLng < currentBounds.getSouthWest().getLng()) {
				setShowBtn(true);
			}
		})

		// 확대/축소 이벤트 등록
		kakao.maps.event.addListener(map, 'zoom_changed', function() {        			
			let currentLevel = map.getLevel();
			setMapLevel(currentLevel);
			console.log("변경된 지도 확대/축소 레벨 " + currentLevel);

			if (currentLevel >= 8) {
				setShowWarning(true);
				setShowBtn(false);
			}
			else {
				setShowWarning(false);
				setShowBtn(true);
				if (currentLevel === 1) { setDistance(0.1); }
				else if (currentLevel === 2) { setDistance(0.2); }
				else if (currentLevel === 3) { setDistance(0.3); }
				else if (currentLevel === 4) { setDistance(0.5); }
				else if (currentLevel === 5) { setDistance(1.5); }
				else if (currentLevel === 6) { setDistance(3); }
				else if (currentLevel === 7) { setDistance(5); }
			}
		});
	}, [user.imgUrl, isValid, userLat, userLng, centerLat, centerLng, toiletList]);

	return (
		<Layout>
			<section className={styles.map} id="map">
				<SearchBox
					keyword={keyword}
					searchMode={searchMode}
					noResult={noResult}
					candidates={candidates}
					setSearchMode={setSearchMode}
					doSearch={doSearch}
					confirmSearch={confirmSearch}
				/>
				{showInfo && 
				<ToiletInfo type="onMap" address={toiletInfo.address} detail_address={toiletInfo.detail_address}/>
				}
				<NavBar num={[0, 1, 1, 1]} />
				{showBtn &&
				<button className={styles.research} onClick={() => getToilet(false)}>
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
