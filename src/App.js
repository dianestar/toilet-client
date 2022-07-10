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
import MyReview from './pages/MyReview';
import Map from './pages/Map';
import List from './pages/List';
import AccountInfo from './pages/account/AccountInfo';
import Profile from './pages/account/Profile';
import ToiletDetails from './pages/ToiletDetails';
import AddToilet from './pages/AddToilet';
import ReviewForm from './pages/ReviewForm';
import EditNickname from './pages/account/EditNickname';
import EditPassword from './pages/account/EditPassword';

function App() {
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
			<Route path="/my_review" element={<MyReview />} />
			<Route path="/account/profile" element={<Profile />} />
			<Route path="/account/account_info" element={<AccountInfo />} />
			<Route path="/toilet_details/:id" element={<ToiletDetails />} />
			<Route path="/add_toilet" element={<AddToilet /> } />
			<Route path="/write_review/:address" element={<ReviewForm />} />
			<Route path="/edit_review/:address/:id" element={<ReviewForm />} />
			<Route path="/account/edit_nickname" element={<EditNickname />} />
			<Route path="/account/edit_password" element={<EditPassword />} />
		</Routes>
	);
}

export default App;
