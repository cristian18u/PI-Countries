import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY,
  GET_COUNTRY_INPUT,
  GET_COUNTRY_DETAIL,
  CREATE_ACTIVITY,
  ORDER_ALPHABET,
  ORDER_POPULATION,
  FILTER_CONTINENT,
  FILTER_ACTIVITY,
  COUNTRY_FILTER,
  FILTER_NAME_COUNTRY,
  ADD_COUNTRY,
  DELETE_ADDED_COUNTRY,
  UPDATE_PAGE,
  RELOAD_PAGE,
} from "./actions.js";
const initialState = {
  countries: [],
  countriesInput: [],
  continents: [],
  activities: [],
  countryDetail: {},
  bodyActivity: {},
  nameCountries: [],
  addedCountries: [],
  countriesDb: [],
  filter: {
    continent: null,
    activity: null,
  },
  order: {
    alphabet: null,
    population: null,
  },
  pageActionActual: "home",
  page: 1,
  pageTotal: 0,
};

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
        pageActionActual: "home",
        page: 1,
      };
    case GET_COUNTRY:
      return {
        ...state,
        countries: payload,
      };
    case COUNTRY_FILTER:
      return {
        ...state,
        countries: payload,
      };
    case GET_COUNTRY_INPUT:
      return {
        ...state,
        countriesInput: payload,
      };
    // case ORDER:
    //   return {
    //     ...state,
    //     page: 1,
    //     pageActionActual: "order",
    //     countries: payload.filter((element, index) => index < 9),
    //     countriesOrderDb: payload,
    //     pageTotal: Math.ceil((payload.length - 9) / 10) + 1,
    //   };
    case ORDER_ALPHABET:
      return {
        ...state,
        page: 1,
        order: {
          ...state.order,
          alphabet: payload,
        },
      };
    case ORDER_POPULATION:
      return {
        ...state,
        page: 1,
        order: {
          ...state.order,
          population: payload,
        },
      };
    case FILTER_CONTINENT:
      return {
        ...state,
        page: 1,
        filter: { ...state.filter, continent: payload },
        // pageActionActual: "filter",
        // countries: state.countriesDb
        //   .filter((country) => country.continent === payload)
        //   .filter((element, index) => index < 9),

        // countriesFilterDb: state.countriesDb.filter(
        //   (country) => country.continent === payload
        // ),
        // pageTotal:
        //   Math.ceil(
        //     (state.countriesDb.filter(
        //       (country) => country.continent === payload
        //     ).length -
        //       9) /
        //       10
        //   ) + 1,
      };
    case FILTER_ACTIVITY:
      return {
        ...state,
        page: 1,
        countries: payload,
        filter: { ...state.filter, activity: payload },
      };
    case DELETE_ADDED_COUNTRY:
      return {
        ...state,
        addedCountries: state.addedCountries.filter(
          (element) => element !== payload
        ),
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
      if (state.pageActionActual === "home") {
        return {
          ...state,
          countries: state.countriesDb.filter((element, index) => {
            return index >= state.page * 10 - 11 && index < state.page * 10 - 1;
          }),
        };
      }
      if (state.pageActionActual === "filter") {
        return {
          ...state,
          countries: state.countriesFilterDb.filter((element, index) => {
            return index >= state.page * 10 - 11 && index < state.page * 10 - 1;
          }),
        };
      }
      if (state.pageActionActual === "order") {
        return {
          ...state,
          countries: state.countriesOrderDb.filter((element, index) => {
            return index >= state.page * 10 - 11 && index < state.page * 10 - 1;
          }),
        };
      }
      return state;
    case FILTER_NAME_COUNTRY:
      return {
        ...state,
        nameCountries: payload?.map((element) => element.name),
      };
    case ADD_COUNTRY:
      return {
        ...state,
        addedCountries: [...new Set([...state.addedCountries, payload])],
      };
    default:
      return state;
  }
}
