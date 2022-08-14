/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createActivity,
  filterNameCountry,
  addCountry,
  deleteAddedCountry,
} from "../../redux/actions.js";
import "./CreateActivity.css";
import validationForm from './ModuleFunction'

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

  const { nameCountries, addedCountries, activities } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  function handleChange(event) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  React.useEffect(() => {
    setError(validationForm(input, addedCountries, activities));
    if (input.nameCountryInput)
      dispatch(filterNameCountry(input.nameCountryInput));
  }, [input, addedCountries]);

  function handleSubmit(event) {
    event.preventDefault();
    input.country = addedCountries;
    dispatch(createActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      nameCountryInput: "",
    });
    setTimeout(function () {
      alert("Tourist activity added successfully");
    }, 1500);
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
          {error.name && input.name ? <span >{error.name}</span> : null}
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
            {nameCountries ? (
              nameCountries.map((country, index) => (
                <button
                  key={index}
                  onClick={() => dispatch(addCountry(country))}
                >
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
        {addedCountries?.map((country, index) => (
          <div key={index} className="deleteAddedCountries">
            <div>{country}</div>
            <button onClick={() => dispatch(deleteAddedCountry(country))}>
              X
            </button>
          </div>
        ))}
      </div>
      {error.country && input.nameCountryInput ? (
        <span>{error.country}</span>
      ) : null}
    </div>
  );
}
