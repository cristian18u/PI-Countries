/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from "react";
import c from "./CreateActivity.module.css";
import { resetSelect, validationForm } from "../../functions/functions";
import { createActivity } from "../../functions/services";
import { useSelector } from "react-redux";

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
  const { activities } = useSelector((state) => state);

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
      .get(`/countries/input?name=${name}`)
      .then((result) => setState({ ...state, countries: result.data }));
  }

  function addCountry(country) {
    if (!state.addedCountries.find((element) => element === country)) {
      setState({
        ...state,
        addedCountries: [...state.addedCountries, country],
      });
    }
    setInput({ ...input, nameCountryInput: "" });
  }

  function deleteAddedCountry(country) {
    setState({
      ...state,
      addedCountries: state.addedCountries.filter(
        (element) => element !== country
      ),
    });
  }

  function resetForm() {
    createActivity(body);
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      nameCountryInput: "",
    });
    setState({ ...state, addedCountries: [] });
    resetSelect();
  }

  return (
    <div className={c.container}>
      <div className={c.createActivity}>
        <div className={c.title}>
          <h3>Create To Activity</h3>
        </div>
        <div className={c.name}>
          <label>name</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          {error.name && input.name ? <span>{error.name}</span> : null}
        </div>
        <div className={c.difficulty}>
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
        </div>
        <div className={c.duration}>
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
        </div>
        <div className={c.season}>
          <label>season</label>
          <select id="season" onChange={setSeason}>
            <option value="select">--Select--</option>
            {season.map((season, index) => (
              <option key={index}>{season}</option>
            ))}
          </select>
          {error.season && input.season ? <span>{error.season}</span> : null}
        </div>
        <div className={c.countryInput}>
          <label>Added Country</label>
          <input
            type="text"
            name="nameCountryInput"
            placeholder="Country..."
            value={input.nameCountryInput}
            onChange={handleChange}
          />
          {input.nameCountryInput ? (
            <div className={c.suggest}>
              {state.countries?.map((country, index) => (
                <button key={index} onClick={() => addCountry(country)}>
                  {country}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div
          className="addedCountry"
          style={{
            display: "flex",
            "align-items": "flex-start",
            gap: "5px",
            "flex-wrap": "wrap",
            width: "300px",
          }}
        >
          {state.addedCountries?.map((country, index) => (
            <div key={index} className={c.delete}>
              <div>{country}</div>
              <button onClick={() => deleteAddedCountry(country)}>X</button>
            </div>
          ))}
        </div>
        <div className={c.buttonCreate}>
          <button
            disabled={Object.keys(error).length === 0 ? false : true}
            onClick={resetForm}
          >
            Create Activity
          </button>
        </div>
      </div>
    </div>
  );
}
