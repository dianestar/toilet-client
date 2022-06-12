import { combineReducers } from 'redux';
import test from './test';
import register from './register';
import profileInfo from './profileInfo';

const rootReducer = combineReducers({
	test,
	register,
	profileInfo,
});

export default rootReducer;
