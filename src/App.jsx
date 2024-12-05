import './App.css';
import axios from 'axios'
import {useState} from "react";

function App() {

    const [countryInfo, setCountryInfo] = useState([])


    async function fetchCountryInfo() {
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all')
        console.log(result);
            setCountryInfo(result.data);
        } catch (error) {
            console.error(error);
        }
    }

    console.log(countryInfo);

    return (
        <>
            <span className="imageWrapper">
                <img src="../src/assets/world_map.png" alt="iamge of world map"/>
            </span>
            <button type="button" className="mapButton" onClick={fetchCountryInfo}>Haal landinformatie op!</button>
        </>
    )
}

export default App
