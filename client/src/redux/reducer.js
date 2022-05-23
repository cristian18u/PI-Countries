import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY,
  GET_COUNTRY_DETAIL,
  CREATE_ACTIVITY,
  ORDER,
  FILTER,
  FILTER_ACTIVITY,
  FILTER_NAME_COUNTRY,
  ADD_COUNTRY,
  DELETE_ADDED_COUNTRY,
  UPDATE_PAGE,
  RELOAD_PAGE,
} from "./actions.js";
const initialState = {
  countries: [],
  continents: [],
  activities: [],
  countryDetail: {},
  bodyActivity: {},
  nameCountries: [],
  addedCountries: [],
  countriesDb: [],
  page: 1,
  pageTotal: 0,
};

// .filter((item, index) => {
//   return (
//     payload.map((country) => country.continent).indexOf(item) === index
//   );
// })

// function firstLetterUpperCase(sentence) {
//   let word = sentence.split(" ").map((word) => {
//     return word[0].toUpperCase() + word.slice(1);
//   });
//   return word.join(" ");
// }

// function SortArray(x, y) {
//   return x.name.localeCompare(y.name);
// }

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: payload[0].data.filter((element, index) => index < 9),
        continents: payload[1].data.map((element) => element.continent),
        countriesDb: payload[0].data,
        activities: payload[2].data.map((activity) => activity.name),
        pageTotal: Math.ceil((payload[0].data.length - 9) / 10) + 1,
      };
    case GET_COUNTRY:
      // console.log(payload)
      // if(!payload)
      return {
        ...state,
        countries: payload,
      };
    case ORDER:
      return {
        ...state,
        countries: payload,
      };
    case FILTER:
      return {
        ...state,
        countries: state.countriesDb.filter(
          (country) => country.continent === payload
        ),
      };
    case FILTER_NAME_COUNTRY:
      return {
        ...state,
        nameCountries: payload?.map((element) => element.name),
      };
    case ADD_COUNTRY:
      return {
        ...state,
        addedCountries: [...new Set([...state.addedCountries, payload])],
        cambio: null,
      };
    case DELETE_ADDED_COUNTRY:
      return {
        ...state,
        addedCountries: state.addedCountries.filter(
          (element) => element !== payload
        ),
      };
    case FILTER_ACTIVITY:
      return {
        ...state,
        countries: payload,
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
        addedCountries: [],
        nameCountries: [],
      };
    case UPDATE_PAGE:
      if (payload === "next") {
        return {
          ...state,
          page: state.page + 1,
        };
      } else if (payload === "prev") {
        return {
          ...state,
          page: state.page > 1 ? state.page - 1 : state.page,
        };
      }
      return state;
    case RELOAD_PAGE:
      return {
        ...state,
        countries: state.countriesDb.filter((element, index) => {
          return index >= state.page * 10 - 11 && index < state.page * 10 - 1;
        }),
      };
    default:
      return state;
  }
}
