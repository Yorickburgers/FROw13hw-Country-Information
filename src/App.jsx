import './App.css';
import axios from 'axios'
import {useState} from "react";
import CountryCard from "./components/CountryCard/CountryCard.jsx";
import CountrySearch from "./components/CountrySearch/CountrySearch.jsx";

function App() {

    const [countryInfo, setCountryInfo] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCountryInfo, setSearchCountryInfo] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");


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

    async function fetchSpecificCountry() {
        try {
            const resultSearch = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`);
            setSearchCountryInfo(resultSearch)
            setErrorMessage("");
        } catch (error) {
            console.error(error)
            setErrorMessage(`${searchTerm} does not exist. Please try again.`);
        }
    }

    return (
        <>
            <span className="imageWrapper">
                <img src="../src/assets/world_map.png" alt="image of world map"/>
            </span>
            <h1>World Regions</h1>
            <div className="buttonWrapper">
                <button type="button" className="mapButton" onClick={fetchCountryInfo}>Get all country information!
                </button>
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="For example Peru or Germany"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && fetchSpecificCountry()}
                    />
                    <button
                        type="button"
                        className="searchButton"
                        onClick={fetchSpecificCountry}
                    >Search
                    </button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {searchCountryInfo.data && searchCountryInfo.data.length > 0 && (
                <div>
                    <CountrySearch
                        key={searchCountryInfo.data[0].cca2}
                        flag={searchCountryInfo.data[0].flags.svg}
                        name={searchCountryInfo.data[0].name.common}
                        subarea={searchCountryInfo.data[0].subregion ? searchCountryInfo.data[0].subregion : searchCountryInfo.data[0].region}
                        capital={searchCountryInfo.data[0].capital ? searchCountryInfo.data[0].capital[0] : "unknown"}
                        populationAmount={Math.round(searchCountryInfo.data[0].population / 1000000)}
                        neighborsAmount={searchCountryInfo.data[0].borders ? searchCountryInfo.data[0].borders.length : 0}
                        domain={searchCountryInfo.data[0].tld[0]}
                    />
                </div>
            )}
            <ul className="countries-container">
                {countryInfo.map((country) => (
                    <CountryCard
                        key={country.cca2}
                        flag={country.flags.svg}
                        name={country.name.common}
                        population={country.population}
                        region={country.region}
                    />
                ))}
            </ul>
        </>
    )
}

export default App
