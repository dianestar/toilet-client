import './styles/main.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/common/Login';
import TestPage from './pages/common/TestPage';
import RegisterA from './pages/common/RegisterA';
import RegisterB from './pages/common/RegisterB';
import ResetPwA from './pages/common/ResetPwA';
import ResetPwB from './pages/common/ResetPwB';
import ResetPwC from './pages/common/ResetPwC';
import LoginB from './pages/common/LoginB';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/login" element={<LoginB />} />
			<Route path="/testpage" element={<TestPage />} />
			<Route path="/registeraccount" element={<RegisterA />} />
			<Route path="/registerprofile" element={<RegisterB />} />
			<Route path="/resetpwA" element={<ResetPwA />} />
			<Route path="/resetpwB" element={<ResetPwB />} />
			<Route path="/resetpwC" element={<ResetPwC />} />
		</Routes>
	);
}

export default App;
