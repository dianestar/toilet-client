import React, { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import styles from "../styles/pages/map.module.scss";

const { kakao } = window;

const Map = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const onValid = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }
    
    const onInvalid = () => {
        console.log("unable to get your location");
    }

    useEffect(() => {
        let mapContainer = document.getElementById('map'), // 지도를 표시할 div 

        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        let map = new kakao.maps.Map(mapContainer, mapOption); 
        console.log("loading kakaomap");

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onValid, onInvalid);
        }
        else {
            console.log("Geolocation not supported");
        }

        // 현재 위치로 지도 범위를 재설정
        let point = new kakao.maps.LatLng(latitude, longitude);

        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
        let bounds = new kakao.maps.LatLngBounds();

        // 마커를 지도에 추가
        let marker = new kakao.maps.Marker({position: point});
        marker.setMap(map);

        // LatLngBounds 객체에 좌표를 추가
        bounds.extend(point);

        // LatLngBounds 객체에 추가된 좌표를 기준으로 지도의 범위를 재설정
        map.setBounds(bounds);
    }, [latitude, longitude]);

    return (
        <Layout>
            <section>
                <article className={styles.map} id="map">
                </article>
            </section>
        </Layout>
    );
}

export default Map;