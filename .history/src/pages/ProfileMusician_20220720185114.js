const ProfileMusician = () => {
    return ( <div>
        <h2>Bienvenido User</h2>
        <form onSubmit=''>
				<label>Pick your instrument</label>
                <select value={type} onChange={handleType}>
				{instruments.map((instrument)=>{
                    return <option value={instrument} onChange={handleInstrument}>{instrument}</option>})
                }
				</select>
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
    </div> );
}
 
export default ProfileMusician;