/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
import CountryCard from "./country/CountryCard.jsx";
// import {
//   // getAllCountries,
//   // getCountry,
//   // getCountryInput,
//   orderAlphabet,
//   orderPopulation,
//   filterContinent,
//   filterActivity,
//   countryFilter,
//   // filterActivity,
//   updatePage,
//   reloadPage,
// } from "../redux/actions.js";
import "./Home.css";

export default function Home() {
  const [name, setName] = React.useState("");
  // const [filter, setFilter] = React.useState("");
  const [countriesInput, setCountriesInput] = React.useState([]);

  // const dispatch = useDispatch();
  React.useEffect(() => {
    getCountry();
  }, []);

  // function paginated(option) {
  //   dispatch(updatePage(option));
  //   dispatch(reloadPage());
  // }

  React.useEffect(() => {
    if (name) getCountryInput(name);
  }, [name]);

  // const {
  //   countries,
  //   countriesInput,
  //   filter,
  //   continents,
  //   activities,
  //   page,
  //   pageTotal,
  // } = useSelector((state) => state);

  // const body = { filter, page };

  const [countries, setCountries] = React.useState([{}]);

  function getCountry(body) {
    axios
      .post(`http://localhost:3001/countries`, body)
      .then((result) => setCountries(result.data))
      .catch(() => setCountries(null));
  }

  function getCountryInput(name) {
    axios
      .get(`http://localhost:3001/countries/input?name=${name}`)
      .then((result) => setCountriesInput(result.data));
  }
  const body = {
    name: name,
  };
  // // const sinredux = prueba
  // console.log(sinredux);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getCountry(body);
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
        {name ? (
          <div className="containerInput">
            {countriesInput?.map((country, index) => (
              <button
                key={index}
                onClick={() => {
                  setName(country);
                }}
              >
                {country}
              </button>
            ))}
          </div>
        ) : null}
      </form>
      {/* <div className="contenedordesplegable">
        <div className="desplegabledefault">
          <button
            className="buttonHome"
            // onClick={() => dispatch(getAllCountries())}
          >
            todos
          </button>
        </div> */}
      {/* <div className="desplegable">
          <button className="button">A-Z</button>
          <div className="link">
            <button onClick={() => dispatch(orderAlphabet("nameAsc"))}>
              Or A-Z
            </button>
            <button onClick={() => dispatch(orderAlphabet("nameDes"))}>
              Or Z-A
            </button>
            <button onClick={() => dispatch(orderPopulation("populationAsc"))}>
              Pasc
            </button>
            <button onClick={() => dispatch(orderPopulation("populationDes"))}>
              Pdsc
            </button>
          </div>
        </div> */}
      {/* <div className="desplegable2">
          <button className="button">activity touristic</button>
          <div className="link2">
            {activities.map((activity, index) => (
              <button
                key={index}
                onClick={() => {
                  dispatch(filterActivity(activity));
                  dispatch(countryFilter(body));
                }}
              >
                {activity}
              </button>
            ))}
          </div>
        </div> */}
      {/* <div className="desplegable3">
          <button className="button">continent</button>
          <div className="link3">
            {continents.map((continent, index) => (
              <button
                key={index}
                onClick={() => {
                  dispatch(filterContinent(continent));
                  // dispatch(countryFilter(body));
                  prueba(body);
                }}
              >
                {continent}
              </button>
            ))}
          </div>
        </div> */}
      {/* </div> */}
      <h1>Countries</h1>
      <div className="container">
        {countries ? (
          countries.map((country, index) => (
            <CountryCard
              key={index}
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
      {/* <div className="paginated">
        {page > 1 ? (
          <button onClick={() => paginated("prev")}>prev</button>
        ) : null} */}
      {/*<button style={page==1?{display:'none'}:null}onClick={() => paginated("prev")}>prev</button>*/}
      {/* <div className="paginatedNum">
          <div className="pageActual">{page}</div>
          <div>{`de ${pageTotal}`}</div>
        </div>
        {page < pageTotal ? (
          <button onClick={() => paginated("next")}>next</button>
        ) : null} */}
      {/* </div> */}
    </div>
  );
}
