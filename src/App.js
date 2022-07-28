import "./App.css";

import {useContext} from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MapPage from './pages/MapPage/MapPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute'; 
import AnonRoute from './components/AnonRoute'; 

import {AuthContext} from './context/auth.context';
import CreateJam from './pages/CreateJam/CreateJam';
import EditJam from './pages/EditJam/EditJam';
import JamListPage from './pages/JamListPage/JamListPage';
import JamDetailPage from './pages/JamDetailPage/JamDetailPage';


//MATERIAL UI
import {createTheme } from '@mui/material/styles';
import ResponsiveAppBar from './components/ResponsiveNavBar';
import ProfilePage from './pages/Profile/ProfilePage';

const customTheme = createTheme({
  //Color settings
  palette: {
    primary: {
      main: "#263238",
      light: "#4f5b62",
      dark: "#000a12",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b2dfdb",
      light: "#e5ffff",
      dark: "#82ada9",
      contrastText: "#263238",
    },
    text: {
      main: "#82ada9",
      primary: "#ffffff",
      secondary: "#263238",
    },
  },
  bgcolor: "primary.main",
});

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>			
			<ResponsiveAppBar/>
			<Routes>
				<Route exact path="/" element={<HomePage/>} />
				<Route exact path="/map"
					element={<MapPage />}/>
				<Route
					exact
					path="/createjam"
					element={
						<PrivateRoute>
							<CreateJam />
						</PrivateRoute>	
					}
				/>

				<Route
					exact
					path="/editjam/:jamId"
					element={
						<PrivateRoute>
							<EditJam />
						</PrivateRoute>	
					}
				/>

				<Route
					exact
					path="/jams"
					element={
							<JamListPage />
					}
				/>

				<Route
					exact
					path="/jams/:jamId"
					element={
						<JamDetailPage />
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
				
				<Route
					exact
					path="/profile"
					element={
						<PrivateRoute>
							<ProfilePage/>
						</PrivateRoute>
					}
				/>				
				</Routes>
			</>	
	);
}

export default App;
