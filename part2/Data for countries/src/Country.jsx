import React from "react";
import Weather from "./Weather";

const Country = ({ country }) => {
  const name = country.name?.common || country.name;
  const capital = Array.isArray(country.capital) ? country.capital[0] : country.capital;
  const languages = country.languages ? Object.values(country.languages) : [];
 
  const coordinates = country.capitalInfo?.latlng || country.latlng;
  const latitude = coordinates?.[0];
  const longitude = coordinates?.[1];

  return (
    <div>
      <h2>{name}</h2>
      {capital && <p>capital {capital}</p>}
      <p>population {country.population}</p>

      <h3>languages</h3>
      <ul>
        {languages.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>

      {country.flags && (
        <img
          src={country.flags.png || country.flags.svg}
          alt={`flag of ${name}`}
          style={{ width: 150 }}
        />
      )}

      <Weather capital={capital} latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default Country;