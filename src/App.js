import './styles/main.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/common/Login';
import TestPage from "./pages/common/TestPage";
import RegisterA from './pages/RegisterA';
import RegisterB from "./pages/RegisterB";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/testpage" element={<TestPage />} />
			<Route path="/registeraccount" element={<RegisterA />} />
			<Route path="/registerprofile" element={<RegisterB />} />
		</Routes>
	);
}

export default App;
