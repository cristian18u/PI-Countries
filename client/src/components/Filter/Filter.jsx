import { useDispatch } from "react-redux";
import {
  setActivityFilter,
  setAlphabetOrder,
  setContinentFilter,
  setName,
  setPage,
  setPopulationOrder,
} from "../../redux/actions";
import c from "./Filter.module.css";

export default function Filter({ activities, continents }) {
  const dispatch = useDispatch();

  function filterContinent(e) {
    if (e.target.value === "select") dispatch(setContinentFilter(""));
    else dispatch(setContinentFilter(e.target.value));
    dispatch(setPage(1));
    dispatch(setName(""));
  }

  function filterActivity(e) {
    if (e.target.value === "select") dispatch(setActivityFilter(""));
    else dispatch(setActivityFilter(e.target.value));
    dispatch(setPage(1));
    dispatch(setName(""));
  }

  function order(e) {
    dispatch(setName(""));

    if (e.target.value === "select") {
      dispatch(setAlphabetOrder(""));
    } else if (e.target.value === "az" || e.target.value === "za") {
      dispatch(setAlphabetOrder(e.target.value));
    } else if (e.target.value === "asc" || e.target.value === "desc") {
      dispatch(setPopulationOrder(e.target.value));
      dispatch(setPage(1));
    }
  }
  return (
    <>
      <div className={c.filter}>
        <div>
          <label className="label">Activity </label>
          <select id="activity" onChange={filterActivity}>
            <option value="select">--Select--</option>
            {activities.map((activity, index) => (
              <option key={index}>{activity}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Continent </label>
          <select id="continent" onChange={filterContinent}>
            <option value="select">--Select--</option>
            {continents?.map((continent, index) => (
              <option key={index}>{continent}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Order for:</label>
          <select id="order" onChange={order}>
            <option value="select">--Select--</option>
            <optgroup label="Alphabet">
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </optgroup>
            <optgroup label="Population">
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </optgroup>
          </select>
        </div>
      </div>
    </>
  );
}
