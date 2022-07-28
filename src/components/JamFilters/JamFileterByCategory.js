import { useState } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';


function JamFilterByCategory (props) {
    const {searchJams} = props
    const musicalGenre = [{value:'Jazz',label:'Jazz'},
    {value:'Funk',label:'Funk'},
    {value:'Blues',label:'Blues'},
    {value:'Rock',label:'Rock'},
    {value:'Soul',label:'Soul'},
    {value:'Metal',label:'Metal'},
    {value:'Hip-Hop',label:'Hip-Hop'},
    {value:'Other',label:'Other'},
    {value:'All kind',label:'All kind'},]
    const [searchCategories,setCategories] = useState(musicalGenre[8])
    const handleCategories = (e) => {
        searchJams(e)
        setCategories(e)
    }
    const animatedComponents = makeAnimated();

    return(
        <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={[musicalGenre[8]]}
                isMulti
                options={musicalGenre}
                onChange={(e) => handleCategories(e)}
                />
    )
}

export default JamFilterByCategory