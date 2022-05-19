import axios from 'axios'

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';

export function getAllCountries() {
  return function (dispatch) {
    axios.get('http://localhost:3001/countries').then(result => dispatch ({type: GET_ALL_COUNTRIES, payload: result.data}))
  }
}
export function getCountry(name) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/countries?name=${name}`).then(result => dispatch ({type: GET_COUNTRY, payload: result.data}))
  }
}

export function getCountryDetail (id) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/countries/${id}`).then(result => dispatch ({type: GET_COUNTRY_DETAIL, payload: result.data}))
  }
}
// export const getCountryDetail = async (id) => {
//   const country = await axios.get(`http://localhost:3001/countries/${id}`);
//   return ({type: GET_COUNTRY_DETAIL, payload: country.data})
// }

// export default getCountryDetail;

export function createActivity(payload) {
  return ({type: CREATE_ACTIVITY, payload})
}