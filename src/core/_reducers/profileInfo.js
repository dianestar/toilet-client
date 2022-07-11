const info = {
	nickname: '',
	imgUrl: '',
	email: '',
};

export const PROFILE_INFO = 'PROFILE_INFO';
export const PROFILE_CHANGE = 'PROFILE_CHANGE';

//action
export const profile = (data) => {
	return {
		type: PROFILE_INFO,
		data,
	};
};

export const imgChange = (data) => {
	return {
		type: PROFILE_CHANGE,
		data,
	};
};

//reducer
const profileInfo = (state = info, action) => {
	switch (action.type) {
		case PROFILE_INFO:
			localStorage.removeItem('persist:root');
			return {
				...state,
				nickname: action.data.nickname,
				imgUrl: action.data.imgUrl,
				email: action.data.email,
			};

		// case PROFILE_CHANGE:
		// 	localStorage.removeItem('persist:root:imgUrl');
		// 	return {
		// 		...state,
		// 		imgUrl: action.data.imgUrl,
		// 	};
		default:
			return state;
	}
};

export default profileInfo;
