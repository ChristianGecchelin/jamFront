import { useState, useContext } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../context/auth.context';
import { loginService } from '../services/auth.services';

//Material
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Avatar,Button, CssBaseline,
	TextField,Grid,Box,
	Typography,Container,Link} from '@mui/material';
	import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

function LoginPage(props) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errorMessage, setErrorMessage ] = useState(undefined);
	const navigate = useNavigate();
	const { logInUser, user } = useContext(AuthContext);

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		const requestBody = { email, password };

		try {
			const response = await loginService(requestBody);
			
			const token = response.data.authToken;
			logInUser(token);
			navigate('/');
		} catch (err) {
			const errorDescription = err?.response?.data?.message;
			setErrorMessage(errorDescription);
		}
	};

	return (
		<Container component="main" maxWidth="xs" >
			<CssBaseline />
			<Box
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
			>
			<Avatar sx={{ m: 1}}>
				<LockOpenOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Log in
			</Typography>
			<Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={email} 
						onChange={handleEmail}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="new-password"
						value={password} 
						onChange={handlePassword}
						/>
					</Grid>
				</Grid>
				<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
				>
					Log in
				</Button>
				<Grid container justifyContent="flex-end">
				<Grid item>
					<Link href={'/signup'} variant="body2">
					Don't have an account yet? Sign up					</Link>
				</Grid>
				</Grid>
			</Box>	
			</Box>
		</Container>);
}

export default LoginPage;
