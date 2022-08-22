/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";

export const fetchTodo = () => {
  const [continents, setContinents] = useState([]);
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios
      .get("/countries/continents")
      .then((result) => setContinents(result.data));
    axios.get("/activity/all").then((result) => setActivities(result.data));
  }, []);
  return { continents, activities };
};

export function createActivity(body) {
  axios.post("/activity", body).then((result) => result);
  setTimeout(function () {
    alert("Tourist activity added successfully");
  }, 1500);
}

export function getDetail(id) {
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/countries/${id}`)
      .then((result) => setDetail(result.data))
      .finally(() => setLoading(false));
  }, []);

  return { detail, loading };
}
