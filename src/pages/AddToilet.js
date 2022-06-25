/*global kakao*/
import React, { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';
import AskReview from '../components/modal/AskReview';
import styles from '../styles/pages/addToilet.module.scss';
import BlueBtn from '../components/common/BlueBtn';
import Btn from '../components/common/Btn';

const AddToilet = () => {
	const [open, setOpen] = useState(true);

	useEffect(() => {
		const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
		const options = {
			//지도를 생성할 때 필요한 기본 옵션
			center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
			level: 3, //지도의 레벨(확대, 축소 정도)
		};

		const map = new kakao.maps.Map(container, options);
		const imageSrc =
				'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
			imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
			imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

		// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
		const markerImage = new kakao.maps.MarkerImage(
				imageSrc,
				imageSize,
				imageOption,
			),
			markerPosition = new kakao.maps.LatLng(33.450701, 126.570667); // 마커가 표시될 위치입니다

		// 마커를 생성합니다
		const marker = new kakao.maps.Marker({
			position: markerPosition,
			image: markerImage, // 마커이미지 설정
		});

		// 마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);
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
							<Btn text="서울시 어쩌구 2-16" />
							<BlueBtn text="이 위치로 주소 설정" />
						</div>
					</div>
				</section>
			</Layout>
		</>
	);
};

export default AddToilet;
