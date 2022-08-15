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
// import { filterActivity, filterContinent } from "../redux/actions.js";
// import { filterActivity } from "../redux/actions.js";

export default function Home() {
  const [name, setName] = React.useState("");
  const [continents, setContinents] = React.useState(null);
  const [state, setState] = React.useState({
    page: 1,
  });
  const [filter, setFilter] = React.useState({});
  const [countriesInput, setCountriesInput] = React.useState([]);
  const [countries, setCountries] = React.useState([{}]);

  // const dispatch = useDispatch();
  React.useEffect(() => {
    getContinent();
  }, []);
  React.useEffect(() => {
    getCountry(body);
  }, [state.page, filter.continent]);
  // React.useEffect(() => {
  //   getCountry(body);
  // }, [state]);

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

  function getCountry(body) {
    axios
      .post(`http://localhost:3001/countries`, body)
      .then((result) => {
        setState({ ...state, pageTotal: result.data.pageTotal });
        setCountries(result.data.result);
      })
      .catch(() => setCountries(null));
  }

  function getCountryInput(name) {
    axios
      .get(`http://localhost:3001/countries/input?name=${name}`)
      .then((result) => setCountriesInput(result.data));
  }

  function getContinent() {
    // console.log("continent");
    axios
      .get("http://localhost:3001/countries/continents")
      .then((result) => setContinents(result.data));
    console.log(continents);
  }

  function paginated(option) {
    if (option === "prev") setState({ ...state, page: state.page - 1 });
    else if (option === "next") setState({ ...state, page: state.page + 1 });
  }
  const body = {
    name: name,
    page: state.page,
    continent: filter.continent,
  };

  function filterContinent(continent) {
    setFilter({ ...filter, continent: continent });
    console.log(filter);
  }
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
      {/* <div className="contenedordesplegable"> */}
      {/* <div className="desplegabledefault">
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
      <div className="desplegable3">
        <button className="button">continent</button>
        <div className="link3">
          {continents?.map((continent, index) => (
            <button key={index} onClick={() => filterContinent(continent)}>
              {continent}
            </button>
          ))}
        </div>
      </div>
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
      <div className="paginated">
        {state.page > 1 ? (
          <button
            onClick={() => {
              paginated("prev");
              // getCountry(body);
            }}
          >
            prev
          </button>
        ) : null}
        <button
          style={state.page === 1 ? { display: "none" } : null}
          onClick={() => {
            paginated("prev");
            // getCountry(body);
          }}
        >
          prev
        </button>
        <div className="paginatedNum">
          <div className="pageActual">{state.page}</div>
          <div>{`de ${state.pageTotal}`}</div>
        </div>
        {state.page < state.pageTotal ? (
          <button
            onClick={() => {
              paginated("next");
              // getCountry(body);
            }}
          >
            next
          </button>
        ) : null}
      </div>
    </div>
  );
}
