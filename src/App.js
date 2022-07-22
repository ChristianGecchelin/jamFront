import './App.css';
import {useContext} from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import MapPage from './pages/MapPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute'; 
import AnonRoute from './components/AnonRoute'; 
import ProfileHost from './pages/ProfileHost/ProfileHost';
import ProfileMusician from './pages/ProfileMusician/ProfileMusician';
import {AuthContext} from './context/auth.context';
import NewPlace from './pages/NewPlace/NewPlace'
function App() {
	const{user}=useContext(AuthContext)
	return (
		<div className="App">
			<Navbar />

			<Routes>
				<Route exact path="/" component={HomePage} />
				<Route
					exact
					path="/map"
					element={
							<MapPage />
					}
				/>
				
				<Route
					exact
					path="/signup"
					element={
						<AnonRoute>
							<SignupPage />
						</AnonRoute>
					}
				/>

				<Route
					exact
					path="/login"
					element={
						<AnonRoute>
							<LoginPage />
						</AnonRoute>
					}
				/>

				{user&&<Route
					exact
					path="/profile"
					element={
						<PrivateRoute>
							{user.type==='host'?<ProfileHost />:
							<ProfileMusician/>}
						</PrivateRoute>
					}
				/>}

				<Route
					exact
					path="/newPlace"
					element={
						<PrivateRoute>
							<NewPlace />
						</PrivateRoute>
					}
				/>
				</Routes>
		</div>
	);
}

export default App;
