import axios from "axios";

export function getCountry(body) {
  return function (dispatch) {
    axios
      .post(`/countries`, body)
      .then((result) => dispatch({ type: "@getCountry", payload: result.data }))
      .catch(() =>
        dispatch({ type: "@getCountry", payload: { result: [], pageTotal: 1 } })
      );
  };
}

export function setPage(page) {
  return { type: "@setPage", payload: page };
}

export function setName(name) {
  return { type: "@setName", payload: name };
}

export function setContinentFilter(continent) {
  return { type: "@setContinentFilter", payload: continent };
}

export function setActivityFilter(activity) {
  return { type: "@setActivityFilter", payload: activity };
}

export function setAlphabetOrder(type) {
  return { type: "@setAlphabetOrder", payload: type };
}

export function setPopulationOrder(type) {
  return { type: "@setPopulationOrder", payload: type };
}
