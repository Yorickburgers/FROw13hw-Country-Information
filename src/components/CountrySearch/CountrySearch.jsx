import './CountrySearch.css';

function CountrySearch({key, flag, name, subarea, capital, populationAmount, neighborsAmount, domain}) {
return (
<>
    <article className="searchCard" id={key}>
        <div className="country-title"><span className="flagWrapper">
                <img src={flag} alt={`flag of ${name}`}/>
            </span>
            <h2>{name}</h2></div>
        {name} is situated in {subarea} and the capital is {capital}.
        It has a population of {populationAmount} million people and it borders with {neighborsAmount} neigboring countries.
        Websites can be found on {domain} domains.
    </article>
</>
)
}

export default CountrySearch;