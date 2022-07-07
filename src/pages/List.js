import React, { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import NavBar from '../components/common/NavBar';
import SearchBox from '../components/SearchBox';
import ToiletInfo from "../components/ToiletInfo";
import { AROUND_TOILET } from "../core/_axios/toilet";
import styles from "../styles/pages/list.module.scss";

const { kakao } = window;

const List = () => {
    // 주변에 있는 화장실 리스트
	const [toiletList, setToiletList] = useState([0, 0, 0, 0, 0]);

    // 검색창 관련
	const [keyword, setKeyword] = useState("");
	const [searchMode, setSearchMode] = useState(false);
	const [candidates, setCandidates] = useState([]);
	const [noResult, setNoResult] = useState(false);

    // 현재 사용자 위치의 접근 허용 여부, 위도, 경도
	const [userLat, setUserLat] = useState(null);
	const [userLng, setUserLng] = useState(null);

    /* 화장실 가져오기 (AROUND_TOILET API 활용 부분) */
	const getToilet = async (lat, lng) => {
		const form = {
			lat,
			lng,
			dist: 1,
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

    /* navigator.geolocation 콜백 함수 */
	const onValid = (position) => {
		setUserLat(position.coords.latitude);
		setUserLng(position.coords.longitude);
	};

	const onInvalid = () => {
		setUserLat(37.56646);
		setUserLng(126.98121);
	};
	/********************************************/

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
                console.log(result);
                
				setCandidates([]);
				setNoResult(false);
				setSearchMode(false);
				setKeyword(result[0].road_address !== null ? result[0].road_address.address_name : result[0].address.address_name);

                getToilet(result[0].y, result[0].x);
			}
		};
		geocoder.addressSearch(address, callback);
	}
	/*******************************/

    useEffect(() => {
        // 현재 위치 정보 가져오기
		navigator.geolocation.getCurrentPosition(onValid, onInvalid);

        // 검색창 기본 주소값 설정
		let geocoder = new kakao.maps.services.Geocoder();
		let setDefaultKeyword = function(result, status) {
			if (status === kakao.maps.services.Status.OK) {
				setKeyword(result[0].road_address !== null ? result[0].road_address.address_name : result[0].address.address_name);
			}
		}
		geocoder.coord2Address(userLng, userLat, setDefaultKeyword); 

        // 주변 화장실 가져오기
        getToilet(userLat, userLng);
    }, [userLat, userLng])

    return (
        <Layout>
            <section className={`${styles.list} ${searchMode && styles.search}`}>
                <SearchBox
                    keyword={keyword}
					searchMode={searchMode}
					noResult={noResult}
					candidates={candidates}
					setSearchMode={setSearchMode}
					setNoResult={setNoResult}
					doSearch={doSearch}
					confirmSearch={confirmSearch}
                />
                {toiletList.map((value, index) => {
                    return (
                        <ToiletInfo key={index} type="onList" toiletInfo={value}/>
                    );
                })}
				{toiletList.length === 0 &&
				<p className={styles[`no-result`]}>검색 결과가 존재하지 않습니다</p>
				}
                <NavBar num={[1, 0, 1, 1]} />
            </section>
        </Layout>
    );
}

export default List;
