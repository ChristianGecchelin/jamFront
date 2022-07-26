import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL


function registerToJam(jamId,user) {
	axios.get(`${API_URL}/jams/${jamId}`)
	.then((foundJam)=>{
		let musicians = foundJam.data.musicians
		const musiciansIds = musicians.map(musician=>musician._id)
		if(musiciansIds.includes(user._id)){
			throw new Error ('YA ESTAS INSCRITO')
		}
		musicians.push(user)
		axios.put(`${API_URL}/jams/${jamId}`,{musicians})
		.then((response)=>{
			console.log(response.data)
			const modifiedJam = response.data
			axios.get(`${API_URL}/users/${user._id}`)
			.then((currentUser)=>{
				const events = currentUser.data.eventsSubscribed
				console.log()
				events.push(modifiedJam)
				axios.put(`${API_URL}/users/${user._id}`,{eventsSubscribed:events})
				.then((response)=>console.log(response.data))
			})
		})
	})
	.catch(err=>console.log(err))
}

function unregisterToJam(jamId,user){
	axios.get(`${API_URL}/jams/${jamId}`)
	.then((foundJam)=>{
		let musicians = foundJam.data.musicians
		let updatedMusicians = musicians.filter(musician=>musician._id!==user._id)
		axios.put(`${API_URL}/jams/${jamId}`,{musicians:updatedMusicians})
		.then((response)=>{
			const modifiedJamId = response.data._id
			axios.get(`${API_URL}/users/${user._id}`)
			.then((currentUser)=>{
				const events = currentUser.data.eventsSubscribed
				console.log(events)
				let newEventsList = events.filter(event=>event._id!==modifiedJamId)
				console.log(newEventsList)
				axios.put(`${API_URL}/users/${user._id}`,{eventsSubscribed:newEventsList})
				.then((response)=>console.log(response.data))
			})
		})
	})
	.catch(err=>console.log(err))
	
}

function deleteJam(jamId){
	return axios.delete(`${API_URL}/jams/${jamId}`)
}

const searchJamsByDate = (date,cloneJams) => {
	//Convert the date without the hours
	let convertedDate = date.setHours(0,0,0,0)
	const updatedJams = cloneJams.filter((cloneJam)=>{
		if(convertedDate===null){
			return cloneJam
		}else{
			//Convert the date into a date object, without the hours
			let convertedJamDate = new Date(cloneJam.date).setHours(0,0,0,0)
			return convertedJamDate === convertedDate
		}
	})
	return updatedJams
}

export { registerToJam, unregisterToJam,deleteJam, searchJamsByDate};
