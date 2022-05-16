import './styles/main.module.scss';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/common/Login';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
		</Routes>
	);
}

export default App;
