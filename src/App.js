import './App.css';
import {useContext} from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute'; 
import AnonRoute from './components/AnonRoute'; 
import ProfileHost from './pages/ProfileHost/ProfileHost';
import ProfileMusician from './pages/ProfileMusician/ProfileMusician';
import {AuthContext} from './context/auth.context';
import NewPlace from './pages/NewPlace/NewPlace'
import CreateJam from './pages/CreateJam/CreateJam';
import EditJam from './pages/EditJam/EditJam';
import JamListPage from './pages/JamListPage/JamListPage';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import JamDetailPage from './pages/JamDetailPage/JamDetailPage';
//MATERIAL UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveAppBar from './components/ResponsiveNavBar';
const customTheme = createTheme({
	//Color settings
	palette:{
		primary:{
			main:"#263238",
			light:"#4f5b62",
			dark:"#000a12",
			contrastText:"#ffffff"
		},
		secondary:{
			main:"#b2dfdb",
			light:"#e5ffff",
			dark:"#82ada9",
			contrastText:"#263238"
		},
		text:{
			main:"#82ada9",
			primary:"#ffffff",
			secondary:"#263238"
		}
	},
	bgcolor: 'primary.main'
})

function App() {
	const {user} = useContext(AuthContext)
	
	return (
		
		
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<ResponsiveAppBar/>

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
			</MuiPickersUtilsProvider>		
		
		
	);
}

export default App;
