/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";

export const fetchTodo = () => {
  const [continents, setContinents] = useState([]);
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/countries/continents")
      .then((result) => setContinents(result.data));
    axios
      .get("http://localhost:3001/activity/all")
      .then((result) => setActivities(result.data));
  }, []);
  return { continents, activities };
};

export function createActivity(body) {
  axios.post("http://localhost:3001/activity", body).then((result) => result);
}
