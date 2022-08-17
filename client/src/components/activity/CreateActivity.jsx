/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createActivity,
//   filterNameCountry,
//   addCountry,
//   deleteAddedCountry,
// } from "../../redux/actions.js";
import "./CreateActivity.css";
import validationForm from "./ModuleFunction";

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

  React.useEffect(() => {
    setError(validationForm(input, state.addedCountries, activities));
    if (input.nameCountryInput) getNameCountry(input.nameCountryInput);
    console.log(state.countries);
  }, [input, state.addedCountries]);

  const activities = ["wolfer", "bailor"];
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

  function createActivity(body) {
    console.log("body", body);
    axios.post("http://localhost:3001/activity", body).then((result) => result);
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
    <div className="containerActivity">
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
          <input
            type="number"
            name="difficulty"
            value={input.difficulty}
            onChange={handleChange}
          />
          {error.difficulty && input.difficulty ? (
            <span>{error.difficulty}</span>
          ) : null}
          <label>duration (hr)</label>
          <input
            type="number"
            name="duration"
            value={input.duration}
            onChange={handleChange}
          />
          {error.duration && input.duration ? (
            <span>{error.duration}</span>
          ) : null}
          <label>season</label>
          <input
            type="text"
            name="season"
            value={input.season}
            onChange={handleChange}
          />
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
  );
}
