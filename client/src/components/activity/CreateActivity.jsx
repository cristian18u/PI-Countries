import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createActivity,
  filterNameCountry,
  addCountry,
  deleteAddedCountry,
} from "../../redux/actions.js";
import "./CreateActivity.css";


export default function CreateActivity() {
  const [input, setInput] = React.useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    nameCountry: "",
  });

  const countries = useSelector((state) => state.nameCountries);
  const addedCountries = useSelector((state) => state.addedCountries);

  const dispatch = useDispatch();

  function handleChange(event) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  }

  React.useEffect(() => {
    if (input.nameCountry) dispatch(filterNameCountry(input.nameCountry));
  }, [input.nameCountry]);

  function handleSubmit(event) {
    event.preventDefault();
    input.country = addedCountries;
    dispatch(createActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      nameCountry: "",
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
          <label>difficulty</label>
          <input
            type="number"
            name="difficulty"
            value={input.difficulty}
            onChange={handleChange}
          />
          <label>duration</label>
          <input
            type="number"
            name="duration"
            value={input.duration}
            onChange={handleChange}
          />
          <label>season</label>
          <input
            type="text"
            name="season"
            value={input.season}
            onChange={handleChange}
          />
          <button type="submit">Create Activity</button>
        </div>
      </form>
      <div className="containerSearch">
        <form
          className="formulation2"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(filterNameCountry(input.nameCountry));
            setInput({
              ...input,
              nameCountry: "",
            });
          }}
        >
          <input
            type="text"
            name="nameCountry"
            placeholder="Country or Continent..."
            value={input.nameCountry}
            onChange={handleChange}
          />
          <input type="submit" value="Buscar" />
        </form>
        <div className="containerNameCountries">
          {countries ? (
            countries.map((country, index) => (
              <button key={index} onClick={() => dispatch(addCountry(country))}>
                {country}
              </button>
            ))
          ) : (
            <h3>Not Result...</h3>
          )}
        </div>
      </div>
      <div className="addCountry">
        {addedCountries?.map((country, index) => (
          <div key={index} className='deleteAddedCountries'>
          <div>{country}</div>
          <button onClick={() => dispatch(deleteAddedCountry(country))}>
            X
          </button>
          </div>
        ))}
      </div>
    </div>
  );
}
