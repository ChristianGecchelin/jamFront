import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { signupService } from '../services/auth.services';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
        console.log(errorMessage);
      }
    }
  };

	return (
		<div className="SignupPage">
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
		</div>
	);
}

export default SignupPage;
