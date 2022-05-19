import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY,
  GET_COUNTRY_DETAIL,
  CREATE_ACTIVITY,
} from "./actions.js";
const initialState = {
  countries: [],
  countryDetail: {},
};

function firstLetterUpperCase(sentence) {
    let word = sentence.split(" ").map(word => {
        return word[0].toUpperCase() + word.slice(1);
    })
    return word.join(" ");
}
export default function rootReducer(state = initialState, { type, payload }) {
  if (type === GET_ALL_COUNTRIES) {
    return {
      ...state,
      countries: payload,
    };
  } else if (type === GET_COUNTRY) {
    return {
      ...state,
      countries: payload,
    };
  } else if (type === GET_COUNTRY_DETAIL) {
    payload.name = firstLetterUpperCase(payload.name)
    return {
      ...state,
      countryDetail: payload,
    };
  } else if (type === CREATE_ACTIVITY) {
    return {
      ...state,
      countries: payload,
    };
  } else return state;
}