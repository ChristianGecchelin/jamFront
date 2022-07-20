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
				<button type="submit">Select your instrument</button>
			</form>
    </div> );
}
 
export default ProfileMusician;