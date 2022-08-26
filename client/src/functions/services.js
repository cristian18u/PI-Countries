/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";

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
