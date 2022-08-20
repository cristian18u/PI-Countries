/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from "react";
import c from "./CreateActivity.module.css";
import { validationForm } from "../../functions/functions";
import { createActivity, fetchTodo } from "../../functions/services";

export default function CreateActivity() {
  const [input, setInput] = React.useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    nameCountryInput: "",
  });

  const [error, setError] = React.useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  const [state, setState] = React.useState({ addedCountries: [] });

  const { activities } = fetchTodo();

  const season = ["summer", "autumn", "winter", "spring"];

  React.useEffect(() => {
    setError(validationForm(input, state.addedCountries, activities));
    if (input.nameCountryInput) getNameCountry(input.nameCountryInput);
  }, [input, state.addedCountries]);

  const body = {
    name: input.name,
    difficulty: input.difficulty,
    duration: input.duration,
    season: input.season,
    countries: state.addedCountries,
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  // function filterContinent(e) {
  //   if (e.target.value === "select") dispatch(setContinentFilter(""));
  //   else dispatch(setContinentFilter(e.target.value));
  //   dispatch(setPage(1));
  //   dispatch(setName(""));
  // }

  function setDifficulty(e) {
    if (e.target.value === "select") setInput({ ...input, difficulty: "" });
    else setInput({ ...input, difficulty: +e.target.value });
  }
  function setDuration(e) {
    if (e.target.value === "select") setInput({ ...input, duration: "" });
    else setInput({ ...input, duration: +e.target.value });
  }
  function setSeason(e) {
    if (e.target.value === "select") setInput({ ...input, season: "" });
    else setInput({ ...input, season: e.target.value });
  }

  function getNameCountry(name) {
    axios
      .get(`http://localhost:3001/countries/input?name=${name}`)
      .then((result) => setState({ ...state, countries: result.data }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    createActivity(body);
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      nameCountryInput: "",
    });
    setState({ ...state, addedCountries: [] });
    setTimeout(function () {
      alert("Tourist activity added successfully");
    }, 1500);
  }

  function addCountry(country) {
    if (!state.addedCountries.find((element) => element === country)) {
      setState({
        ...state,
        addedCountries: [...state.addedCountries, country],
      });
    }
  }

  function deleteAddedCountry(country) {
    setState({
      ...state,
      addedCountries: state.addedCountries.filter(
        (element) => element !== country
      ),
    });
  }

  return (
    <div className={c.container}>
      <div className={c.createActivity}>
        <form className="formulation1" onSubmit={handleSubmit}>
          <div className="createActivity">
            <label>name</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
            {error.name && input.name ? <span>{error.name}</span> : null}
            <label>difficulty</label>
            <select id="difficulty" onChange={setDifficulty}>
              <option value="select">--Select--</option>
              {[1, 2, 3, 4, 5].map((difficulty, index) => (
                <option key={index}>{difficulty}</option>
              ))}
            </select>
            {error.difficulty && input.difficulty ? (
              <span>{error.difficulty}</span>
            ) : null}
            <label>duration (hr)</label>
            <select id="duration" onChange={setDuration}>
              <option value="select">--Select--</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((duration, index) => (
                <option key={index}>{duration}</option>
              ))}
            </select>
            {error.duration && input.duration ? (
              <span>{error.duration}</span>
            ) : null}
            <label>season</label>
            <select id="season" onChange={setSeason}>
              <option value="select">--Select--</option>
              {season.map((season, index) => (
                <option key={index}>{season}</option>
              ))}
            </select>
            {error.season && input.season ? <span>{error.season}</span> : null}
            <input
              type="submit"
              name="Create Activity"
              disabled={Object.keys(error).length === 0 ? false : true}
            />
          </div>
        </form>
        <div className="containerSearch">
          <input
            type="text"
            name="nameCountryInput"
            placeholder="Country or Continent..."
            value={input.nameCountryInput}
            onChange={handleChange}
          />
          {input.nameCountryInput ? (
            <div className="containerNameCountries">
              {state.countries ? (
                state.countries.map((country, index) => (
                  <button key={index} onClick={() => addCountry(country)}>
                    {country}
                  </button>
                ))
              ) : (
                <h3>Not Result...</h3>
              )}
            </div>
          ) : null}
        </div>
        <div className="addCountry">
          {state.addedCountries?.map((country, index) => (
            <div key={index} className="deleteAddedCountries">
              <div>{country}</div>
              <button onClick={() => deleteAddedCountry(country)}>X</button>
            </div>
          ))}
        </div>
        {error.country && input.nameCountryInput ? (
          <span>{error.country}</span>
        ) : null}
      </div>
    </div>
  );
}
