import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { signupService } from '../services/auth.services';


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
				<select name="type" id="type" onChange={handleType}>
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
