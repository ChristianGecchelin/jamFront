const ProfileHost = () => {
    return ( 
    <div>
<p>My Places</p>
<ul>{places.map((place)=>{return <li key={place.key}>{place.name}</li>})}</ul>

<p>My Jams</p>
<ul>{Jams.map((jam)=>{return <li key={jam.key}>{jam.name}</li>})}</ul>

    </div> );
}
 
export default ProfileHost;