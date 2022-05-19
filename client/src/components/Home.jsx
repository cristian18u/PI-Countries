import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CountryCard from "./country/CountryCard.jsx";
import { getAllCountries, getCountry } from "../redux/actions.js";
import './Home.css'


export default function Home() {

  const [name, setName] = React.useState('')


  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllCountries())
  }, []);

  const countries = useSelector((state) => state.countries);

  return (
    <div>
    <form onSubmit={(e) => {
      e.preventDefault(); // deja el boton disponible nuevamente
      dispatch(getCountry(name));
      setName(''); // reinicia el estado
    }}>
    <input 
    type="text"
    placeholder='...country'
    value={name}
    onChange={e => setName(e.target.value)}
    />
    <input type="submit" value="Buscar" />
    </form>
      <h1>Countries</h1>
      <div className="container">
        {countries?.map((country) => (
          <CountryCard
            key={country.ID}
            ID={country.ID}
            name={country.name}
            flag={country.flag}
            continent={country.continent}
          />
        ))}
      </div>
    </div>
  );
}