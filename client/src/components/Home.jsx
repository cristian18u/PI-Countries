/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import CountryCard from "./country/CountryCard.jsx";
import c from "./Home.module.css";

export default function Home() {
  const [name, setName] = React.useState("");
  const [continents, setContinents] = React.useState([]);
  const [activities, setActivities] = React.useState([]);
  const [state, setState] = React.useState({
    page: 1,
  });
  const [filter, setFilter] = React.useState({});
  const [countriesInput, setCountriesInput] = React.useState([]);
  const [countries, setCountries] = React.useState([{}]);

  const body = {
    name: state.nameSearch,
    page: state.page,
    continent: filter.continent,
    activity: filter.activity,
    orderAlphabet: filter.orderAlphabet,
    orderPopulation: filter.orderPopulation,
  };

  React.useEffect(() => {
    getContinent();
    getActivity();
  }, []);

  React.useEffect(() => {
    getCountry(body);
    console.log("static", continents, activities);
  }, [
    state.page,
    state.nameSearch,
    filter.continent,
    filter.activity,
    filter.orderAlphabet,
    filter.orderPopulation,
  ]);

  React.useEffect(() => {
    if (!name) setState({ ...state, nameSearch: undefined });
    if (name) getCountryInput(name);
  }, [name]);

  function getCountry(body) {
    axios
      .post(`http://localhost:3001/countries`, body)
      .then((result) => {
        setState({ ...state, pageTotal: result.data.pageTotal });
        setCountries(result.data.result);
      })
      .catch(() => {
        setState({ ...state, pageTotal: 1 });
        setCountries(null);
      });
  }

  function getCountryInput(name) {
    axios
      .get(`http://localhost:3001/countries/input?name=${name}`)
      .then((result) => setCountriesInput(result.data));
  }

  function getContinent() {
    axios
      .get("http://localhost:3001/countries/continents")
      .then((result) => setContinents(result.data));

    console.log("continent", continents);
  }

  function getActivity() {
    axios
      .get("http://localhost:3001/activity/all")
      .then((result) => setActivities(result.data));
    console.log("activity", activities);
  }

  function paginated(option) {
    if (option === "prev") setState({ ...state, page: state.page - 1 });
    else if (option === "next") setState({ ...state, page: state.page + 1 });
  }

  function filterContinent(e) {
    if (e.target.value === "select")
      setFilter({ ...filter, continent: undefined });
    else setFilter({ ...filter, continent: e.target.value });
    setState({ ...state, page: 1 });
    console.log(filter);
  }

  function filterActivity(e) {
    if (e.target.value === "select")
      setFilter({ ...filter, activity: undefined });
    else setFilter({ ...filter, activity: e.target.value });
    setState({ ...state, page: 1 });
    console.log("activity", filter);
  }

  function order(e) {
    if (e.target.value === "select") {
      setFilter({
        ...filter,
        orderAlphabet: undefined,
        orderPopulation: undefined,
      });
    } else if (e.target.value === "az" || e.target.value === "za") {
      setFilter({
        ...filter,
        orderAlphabet: e.target.value,
        orderPopulation: undefined,
      });
    } else if (e.target.value === "asc" || e.target.value === "desc") {
      setFilter({
        ...filter,
        orderPopulation: e.target.value,
        orderAlphabet: undefined,
      });
    }
    setState({ ...state, page: 1 });
  }

  return (
    <div className={c.container}>
      <div className={c.searchFilter}>
        <form
          className={c.input}
          onSubmit={(e) => {
            e.preventDefault();
            setState({ ...state, page: 1, pageTotal: 1, nameSearch: name });
            setFilter({});
          }}
        >
          <input
            className={c.input}
            type="text"
            placeholder="Country..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input className={c.search} type="submit" value="Search" />
          {name ? (
            <div className={c.suggest}>
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
        <div className={c.filter}>
          <div>
            <label className="label">Order for:</label>
            <select className="link" onChange={order}>
              <option value="select">--Select--</option>
              <optgroup label="Alphabet">
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </optgroup>
              <optgroup label="Population">
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </optgroup>
            </select>
          </div>
          <div>
            <label className="label">Activity</label>
            <select className="link2" onChange={filterActivity}>
              <option value="select">--Select--</option>
              {activities.map((activity, index) => (
                <option key={index}>{activity}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Continent</label>
            <select className="link3" onChange={filterContinent}>
              <option value="select">--Select--</option>
              {continents?.map((continent, index) => (
                <option key={index}>{continent}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className={c.containerCard}>
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
      <div className={c.containerPaginate}>
        <div className={c.paginate}>
          <button
            disabled={state.page === 1 ? true : false}
            onClick={() => {
              paginated("prev");
            }}
          >
            {"<"}
          </button>
          <div className={c.num}>
            <div className={c.numActual}>{state.page}</div>
            <div>{`de ${state.pageTotal}`}</div>
          </div>
          <button
            disabled={state.page === state.pageTotal ? true : false}
            onClick={() => {
              paginated("next");
            }}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
