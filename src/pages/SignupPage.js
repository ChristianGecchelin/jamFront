import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupService } from '../services/auth.services';

//Material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function SignupPage(props) {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ type, setType ] = useState('');
	const navigate = useNavigate();
	const [ errorMessage, setErrorMessage ] = useState(undefined);

	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);
	const handleUsername = (e) => setUsername(e.target.value);
	const handleType = (e) => setType(e.target.value);

	const handleSignupSubmit = async (e) => {
		e.preventDefault();
		// Create an object representing the request body
		const requestBody = { email, password, username,type };
    try{
    	await signupService(requestBody);
    	navigate("/login");
    }catch(err){
    	if(err.response?.status === 400){
        setErrorMessage(err.response.data.errorMessage);
    	}
    }
};

	return (	
		<Container component="main" maxWidth="xs">
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
				<AccountCircleIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign up
			</Typography>
			<Box component="form" noValidate onSubmit={handleSignupSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
						name="username"
						required
						fullWidth
						id="username"
						label="Username"
						autoFocus
						value={username} 
						onChange={handleUsername}
						/>
					</Grid>
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
					<Grid item xs={12}>
					</Grid>
				</Grid>
				<Button
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
				>
					Sign Up
				</Button>
				<Grid container justifyContent="flex-end">
				<Grid item>
					<Link href={'/login'} variant="body2">
					Already have an account? Log in
					</Link>
				</Grid>
				</Grid>
			</Box>
			</Box>
		</Container>
		
		
		/*<div className="SignupPage">
			<h1>Sign Up</h1>

			<form onSubmit={handleSignupSubmit}>
				<label>Email:</label>
				<input type="text" name="email" value={email} onChange={handleEmail} />

				<label>Password:</label>
				<input type="password" name="password" value={password} onChange={handlePassword} />

				<label>Username:</label>
				<input type="text" name="username" value={username} onChange={handleUsername} />
				<label>Type:</label>
				<select value={type} onChange={handleType}>
				<option value="host">Host</option>
  				<option value="musician">Musician</option>
				</select>
				<button type="submit">Sign Up</button>
			</form>

			{errorMessage && <p className="error-message">{errorMessage}</p>}

			<p>Already have account?</p>
			<Link to={'/login'}> Login</Link>
		</div>*/

	)
}

export default SignupPage;
