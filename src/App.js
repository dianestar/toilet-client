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
import Map from "./pages/Map";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/login" element={<LoginB />} />
			<Route path="/testpage" element={<TestPage />} />
			<Route path="/registeraccount" element={<RegisterA />} />
			<Route path="/registerprofile" element={<RegisterB />} />
			<Route path="/findpwA" element={<FindPwA />} />
			<Route path="/findpwB" element={<FindPwB />} />
			<Route path="/find_password" element={<FindPwC />} />
			<Route path="/map" element={<Map />} />
		</Routes>
	);
}

export default App;
