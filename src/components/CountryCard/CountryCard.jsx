import './CountryCard.css';

function CountryCard({flag, population, name, region, key}) {
    return (
        <article id={key} className="country-article">
            <div className="country-title"><span className="flagWrapper">
                <img src={flag} alt={`flag of ${name}`}/>
            </span>
            <h4 className={region}>{name}</h4></div>
            Has a population of {population} people
        </article>
    )
}

export default CountryCard;