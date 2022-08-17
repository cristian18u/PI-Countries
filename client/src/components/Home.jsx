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
    console.log("disparo action");
    console.log("body", body);
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
      // .then((result) => {
      //   console.log("fetch", result.data);
      // setFlat({ nara: [4], activities: [] });
      // });
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

  function filterContinent(continent) {
    setFilter({ ...filter, continent: continent });
    setState({ ...state, page: 1 });
    console.log(filter);
  }

  function filterActivity(activity) {
    setFilter({ ...filter, activity: activity });
    setState({ ...state, page: 1 });
    console.log("activity", filter);
  }

  function order(option) {
    if (!option) {
      console.log("opti", option);
      setFilter({ ...filter, orderAlphabet: option, orderPopulation: option });
    } else if (option === "az" || option === "za") {
      setFilter({
        ...filter,
        orderAlphabet: option,
        orderPopulation: undefined,
      });
    } else if (option === "asc" || option === "desc") {
      setFilter({
        ...filter,
        orderPopulation: option,
        orderAlphabet: undefined,
      });
    }
    setState({ ...state, page: 1 });
  }

  return (
    <div className={c.container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setState({ ...state, page: 1, pageTotal: 1, nameSearch: name });
          setFilter({});
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
      <div className="contenedordesplegable">
        <div className="desplegabledefault"></div>
        <div className="desplegable">
          <button className="button">A-Z</button>
          <div className="link">
            <button onClick={() => order()}>--select--</button>
            <button onClick={() => order("az")}>Or A-Z</button>
            <button onClick={() => order("za")}>Or Z-A</button>
            <button onClick={() => order("asc")}>Pasc</button>
            <button onClick={() => order("desc")}>Pdsc</button>
          </div>
        </div>
        <div className="desplegable2">
          <button className="button">activity touristic</button>
          <div className="link2">
            <button onClick={() => filterActivity()}>--select--</button>
            {activities.map((activity, index) => (
              <button
                key={index}
                onClick={() => {
                  filterActivity(activity);
                }}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>
        <div className="desplegable3">
          <button className="button">continent</button>
          <div className="link3">
            <button onClick={() => filterContinent()}>--select--</button>
            {continents?.map((continent, index) => (
              <button key={index} onClick={() => filterContinent(continent)}>
                {continent}
              </button>
            ))}
          </div>
        </div>
      </div>
      <h1>Countries</h1>
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
