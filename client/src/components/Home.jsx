import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CountryCard from "./country/CountryCard.jsx";
import {
  getAllCountries,
  getCountry,
  order,
  filter,
  filterActivity,
  updatePage,
  reloadPage,
} from "../redux/actions.js";
import "./Home.css";

export default function Home() {
  const [name, setName] = React.useState("");

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  function paginated(option) {
    dispatch(updatePage(option));
    dispatch(reloadPage());
  }

  // React.useEffect(async() => {
  // if ( name ) dispatch(getCountry(name))
  // }, [name]);

  const { countries, continents, activities, page, pageTotal } = useSelector((state) => state);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(getCountry(name));
          setName("");
        }}
      >
        <input
          type="text"
          placeholder="Country..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" value="Buscar" />
      </form>
      <div className="contenedordesplegable">
        <div className="desplegabledefault">
          <button
            className="buttonHome"
            onClick={() => dispatch(getAllCountries())}
          >
            todos
          </button>
        </div>
        <div className="desplegable">
          <button className="button">A-Z</button>
          <div className="link">
            <button onClick={() => dispatch(order("nameAsc"))}>Or A-Z</button>
            <button onClick={() => dispatch(order("nameDes"))}>Or Z-A</button>
            <button onClick={() => dispatch(order("populationAsc"))}>
              Pasc
            </button>
            <button onClick={() => dispatch(order("populationDes"))}>
              Pdsc
            </button>
          </div>
        </div>
        <div className="desplegable2">
          <button className="button">activity touristic</button>
          <div className="link2">
            {activities.map((activity, index) => (
              <button
                key={index}
                onClick={() => dispatch(filterActivity(activity))}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>
        <div className="desplegable3">
          <button className="button">continent</button>
          <div className="link3">
            {continents.map((continent, index) => (
              <button key={index} onClick={() => dispatch(filter(continent))}>
                {continent}
              </button>
            ))}
          </div>
        </div>
      </div>
      <h1>Countries</h1>
      <div className="container">
        {countries ? (
          countries.map((country) => (
            <CountryCard
              key={country.id}
              id={country.id}
              name={country.name}
              flag={country.flag}
              continent={country.continent}
            />
          ))
        ) : (
          <h1>The are no countries to show</h1>
        )}
      </div>
      <div className="paginated">
      {page>1?<button onClick={() => paginated("prev")}>prev</button>:null}
      {/*<button style={page==1?{display:'none'}:null}onClick={() => paginated("prev")}>prev</button>*/}
      <div className="paginatedNum">
      <div className='pageActual'>{page}</div>
      <div>{`de ${pageTotal}`}</div>
      </div>
      {page<pageTotal?<button onClick={() => paginated("next")}>next</button>:null}
      </div>
    </div>
  );
}
