import { combineReducers } from 'redux';
import test from './test';
import register from './register';
import profileInfo from './profileInfo';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	//localStorage에 저장
	storage: storage,
	//test,register,profileInfo중에 profileInfo만 저장
	whitelist: ['profileInfo'],
	//blacklist -> 그것만 제외
};

const rootReducer = combineReducers({
	test,
	register,
	profileInfo,
});

export default persistReducer(persistConfig, rootReducer);
