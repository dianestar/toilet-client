import './styles/main.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/common/Login';
import TestPage from './pages/common/TestPage';
import RegisterA from './pages/common/RegisterA';
import RegisterB from './pages/common/RegisterB';
import FindPwA from './pages/common/FindPwA';
import FindPwB from './pages/common/FindPwB';
import FindPwC from './pages/common/FindPwC';
import LoginB from './pages/common/LoginB';
import Map from './pages/Map';
import List from './pages/List';
import AccountInfo from './pages/account/AccountInfo';
import Profile from './pages/account/Profile';

function App() {
	console.log('test');
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/login" element={<LoginB />} />
			<Route path="/testpage" element={<TestPage />} />
			<Route path="/register_account" element={<RegisterA />} />
			<Route path="/register_profile" element={<RegisterB />} />
			<Route path="/findpwA" element={<FindPwA />} />
			<Route path="/findpwB" element={<FindPwB />} />
			<Route path="/find_password" element={<FindPwC />} />
			<Route path="/map" element={<Map />} />
			<Route path="/list" element={<List />} />
			<Route path="/account/profile" element={<Profile />} />
			<Route path="/account/account_info" element={<AccountInfo />} />
		</Routes>
	);
}

export default App;
