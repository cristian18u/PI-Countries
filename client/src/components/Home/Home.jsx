/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import CountryCard from "../Country/CountryCard.jsx";
import c from "./Home.module.css";
import { getCountry } from "../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar.jsx";
import Filter from "../Filter/Filter.jsx";
import Paginate from "../Paginate/Paginate.jsx";

export default function Home() {
  const {
    countries,
    page,
    name,
    continentFilter,
    activityFilter,
    alphabetOrder,
    populationOrder,
  } = useSelector((state) => state);

  const body = {
    name: name,
    page: page,
    continent: continentFilter,
    activity: activityFilter,
    orderAlphabet: alphabetOrder,
    orderPopulation: populationOrder,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!name) dispatch(getCountry(body));
  }, [
    page,
    continentFilter,
    activityFilter,
    alphabetOrder,
    populationOrder,
    name,
  ]);

  return (
    <div className={c.container}>
      <div className={c.searchFilter}>
        <SearchBar body={body} />
        <Filter />
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
      <Paginate />
    </div>
  );
}
