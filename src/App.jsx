import './App.css';
import axios from 'axios'
import {useState} from "react";
import CountryCard from "./components/CountryCard/CountryCard.jsx";

function App() {

    const [countryInfo, setCountryInfo] = useState([])


    async function fetchCountryInfo() {
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all')
        console.log(result);
            const sortedCountries = result.data.sort((a, b) => {
                if (a.population > b.population) {
                    return 1;
                }
                if (a.population < b.population) {
                    return -1;
                }
                return 0;
            })
            setCountryInfo(sortedCountries);
        } catch (error) {
            console.error(error);
        }
    }

    console.log(countryInfo);

    return (
        <>
            <span className="imageWrapper">
                <img src="../src/assets/world_map.png" alt="image of world map"/>
            </span>
            <h1>World Regions</h1>
            <button type="button" className="mapButton" onClick={fetchCountryInfo}>Get country information!</button>
            <section className="countries-container">
            {countryInfo.map((country) => (
                <CountryCard
                    key={country.cca2}
                    flag={country.flags.svg}
                    name={country.name.common}
                    population={country.population}
                    region={country.region}
                />
            ))}
            </section>
        </>
    )
}

export default App
