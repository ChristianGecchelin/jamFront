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
import CreateJam from './components/CreateJam';
import JamListPage from './pages/JamListPage/JamListPage';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

//MATERIAL UI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
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
		
		<ThemeProvider theme={customTheme}>
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Navbar/>

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
							<CreateJam />
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
		</ThemeProvider>
		
	);
}

export default App;
