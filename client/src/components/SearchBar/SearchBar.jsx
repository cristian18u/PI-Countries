/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import c from "./SearchBar.module.css";
import {
  getCountry,
  setActivityFilter,
  setAlphabetOrder,
  setContinentFilter,
  setName,
} from "../../redux/actions";
import { resetSelect } from "../../functions/functions";

export default function SearchBar({ body }) {
  const [countriesInput, setCountriesInput] = useState([]);
  const { name } = body;

  const dispatch = useDispatch();

  useEffect(() => {
    if (name) getCountryInput(name);
  }, [name]);

  function getCountryInput(name) {
    axios
      .get(`/countries/input?name=${name}`)
      .then((result) => setCountriesInput(result.data));
  }

  function searchName(e) {
    dispatch(setName(e.target.value));
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCountriesInput([]);
          dispatch(setActivityFilter(""));
          dispatch(setContinentFilter(""));
          dispatch(setAlphabetOrder(""));
          dispatch(getCountry(body));
          resetSelect();
        }}
      >
        <input
          className={c.input}
          type="text"
          placeholder="Country..."
          value={name}
          onChange={searchName}
        />
        <input className={c.search} type="submit" value="Search" />
        {name ? (
          <div className={c.suggest}>
            {countriesInput?.map((country, index) => (
              <button
                key={index}
                onClick={() => {
                  dispatch(setName(country));
                }}
              >
                {country}
              </button>
            ))}
          </div>
        ) : null}
      </form>
    </>
  );
}
