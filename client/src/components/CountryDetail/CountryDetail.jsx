import { getDetail } from "../../functions/services";
import c from "./CountryDetail.module.css";

export default function CountryDetail({ match }) {
  const { detail, loading } = getDetail(match.params.id);

  if (loading) {
    return (
      <div className={c.loading}>
        <h1>Loading...</h1>
      </div>
    );
  }
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
  } = detail;
  return (
    <div className={c.containerDetail}>
      <div className={c.country}>
        <h2>{name}</h2>
        <h4>{id}</h4>
        <img src={flag} alt="flag" />
        <div className={c.info}>
          <p>Continent: {continent}</p>
          <p>Subregion: {subregion}</p>
          <p>Population: {population}</p>
          <p>Capital: {capital}</p>
          <p>Area: {area + " Km2"}</p>
        </div>
      </div>
      <div className={c.containerActivity}>
        <h2>Activities</h2>
        {activities?.map(({ name, difficulty, duration, season }) => (
          <div className={c.activity}>
            <h3>{name}</h3>
            <p>difficulty: {difficulty}</p>
            <p>Duration: {duration}</p>
            <p>Season: {season}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
