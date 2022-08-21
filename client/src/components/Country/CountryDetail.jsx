import React from "react";
import { useSelector } from "react-redux";
// import {getCountryDetail} from '../../redux/actions.js'
import ActivityCard from "../Activity/ActivityCard.jsx";
import "./CountryDetail.css";

export default function CountryDetail({ match }) {
  const {
    id,
    name,
    flag,
    continent,
    subregion,
    population,
    area,
    capital,
    activities,
  } = useSelector((store) => store.countryDetail);

  // const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(getCountryDetail(match.params.id));
  }, []);

  return (
    <div>
      <h3>{name}</h3>
      <img width={300} src={flag} alt="flag" />
      <p>id: {id}</p>
      <p>Continent: {continent}</p>
      <p>Subregion: {subregion}</p>
      <p>Population: {population}</p>
      <p>Capital: {capital}</p>
      <p>Area: {area + " Km2"}</p>
      <p>Activities:</p>
      <div className="containerActivity">
        {activities?.map((activity) => (
          <ActivityCard
            key={activity.id}
            name={activity.name}
            difficulty={activity.difficulty}
            duration={activity.duration}
            season={activity.season}
          />
        ))}
      </div>
    </div>
  );
}