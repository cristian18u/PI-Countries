import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRY = "GET_COUNTRY";
export const GET_COUNTRY_INPUT = "GET_COUNTRY_INPUT";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const ORDER = "ORDER";
export const FILTER = "FILTER";
export const FILTER_ACTIVITY = "FILTER_ACTIVITY";
export const FILTER_NAME_COUNTRY = "FILTER_NAME_COUNTRY";
export const ADD_COUNTRY = "ADD_COUNTRY";
export const DELETE_ADDED_COUNTRY = "DELETE_ADDED_COUNTRY";
export const UPDATE_PAGE = "UPDATE_PAGE";
export const RELOAD_PAGE = "RELOAD_PAGE";

export function getAllCountries() {
  return function (dispatch) {
    Promise.all([
      axios.get("http://localhost:3001/countries"),
      axios.get("http://localhost:3001/countries/continents"),
      axios.get("http://localhost:3001/activity/all"),
    ]).then((result) => dispatch({ type: GET_ALL_COUNTRIES, payload: result }));
  };
}

export function getCountry(name) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries?name=${name}`)
      .then((result) => dispatch({ type: GET_COUNTRY, payload: result.data }))
      .catch(() => dispatch({ type: GET_COUNTRY, payload: null }));
  };
}

export function getCountryInput(name) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries/input?name=${name}`)
      .then((result) => dispatch({ type: GET_COUNTRY_INPUT, payload: result.data }))
      .catch(() => dispatch({ type: GET_COUNTRY_INPUT, payload: null }));
  };
}

export function getCountryDetail(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries/${id}`)
      .then((result) =>
        dispatch({ type: GET_COUNTRY_DETAIL, payload: result.data })
      );
  };
}

export function order(order) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries/order?order=${order}`)
      .then((result) => dispatch({ type: ORDER, payload: result.data }));
  };
}

export function filter(payload) {
  return { type: FILTER, payload };
}
export function filterNameCountry(name) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/countries/filterCountry?name=${name}`)
      .then((result) => dispatch({ type: FILTER_NAME_COUNTRY, payload: result.data }))
      .catch(() => dispatch({ type: FILTER_NAME_COUNTRY, payload: null }));
  };
}

export function filterActivity(name) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/activity/filter?name=${name}`)
      .then((result) => dispatch({ type: ORDER, payload: result.data }));
  };
}
export function sendFormBody(body) {
  // return function (dispatch) {
    axios
      .post("http://localhost:3001/countries", body)
      // .then((result) => dispatch({ type: ORDER, payload: result.data }));
  // };
}
export function addCountry(payload) {
  return { type: ADD_COUNTRY, payload };
}

export function deleteAddedCountry(payload) {
  return { type: DELETE_ADDED_COUNTRY, payload };
}

export function createActivity(body) {
  console.log('body')
  return function (dispatch) {
  axios
      .post("http://localhost:3001/activity", body)
      .then((result) => dispatch({ type: CREATE_ACTIVITY, payload: result.data }))
 };
}

export function updatePage(payload) {
  return { type: UPDATE_PAGE, payload };
}

export function reloadPage(payload) {
  return { type: RELOAD_PAGE, payload };
}
