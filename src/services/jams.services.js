import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL


async function registerToJam(jamId,user) {
	let res
	await axios.get(`${API_URL}/jams/${jamId}`)
	.then((foundJam)=>{
		let musicians = foundJam.data.musicians
		const musiciansIds = musicians.map(musician=>musician._id)
		let result = musiciansIds.includes(user._id)
		if(!result){
			musicians.push(user)
			axios.put(`${API_URL}/jams/${jamId}`,{musicians})
			.then((response)=>{
				const modifiedJam = response.data
				axios.get(`${API_URL}/users/${user._id}`)
				.then((currentUser)=>{
					const events = currentUser.data.eventsSubscribed
					events.push(modifiedJam)
					axios.put(`${API_URL}/users/${user._id}`,{eventsSubscribed:events})
				})
			})
		}else{return true}
	})
	.then((test)=>{return test})
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
				let newEventsList = events.filter(event=>event._id!==modifiedJamId)
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
	
	let convertedDate = new Date(date).setHours(0,0,0,0)
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
