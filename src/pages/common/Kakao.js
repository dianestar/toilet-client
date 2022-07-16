import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import axios from 'axios';
import profileInfo, { snsProfile } from '../../core/_reducers/profileInfo';
import { REDIRECT_KAKAO } from '../../core/_axios/login';

const Kakao = () => {
	useEffect(async () => {
		const res = await REDIRECT_KAKAO();

		console.log(res);
	}, []);

	return (
		<div>
			<p>로그인 중입니다. 잠시만 기다려주세요</p>
		</div>
	);
};

export default Kakao;
