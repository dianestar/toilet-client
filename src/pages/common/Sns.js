import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { profile } from '../../core/_reducers/profileInfo';
import { REDIRECT_KAKAO } from '../../core/_axios/login';

const Sns = () => {
	const dispatch = useDispatch();

	useEffect(async () => {
		const {
			data: { success, data },
		} = await REDIRECT_KAKAO();

		if (success) {
			dispatch(
				profile({
					nickname: data.nickname,
					imgUrl: data.imgUrl,
					email: data.email,
					sns: 'None',
				}),
			);
		}
	}, []);

	return (
		<div>
			<p>로그인 중입니다. 잠시만 기다려주세요</p>
		</div>
	);
};

export default Sns;
