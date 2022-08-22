const initialState = {
  countries: [],
  pageTotal: 0,
  page: 1,
  name: "",
  continentFilter: "",
  activityFilter: "",
  alphabetOrder: "",
  populationOrder: "",
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "@getCountry":
      return {
        ...state,
        countries: payload.result,
        pageTotal: payload.pageTotal,
      };
    case "@getCountryDetail":
      return {
        ...state,
        countryDetail: payload,
      };
    case "@setPage":
      return {
        ...state,
        page: payload,
      };
    case "@setName":
      return {
        ...state,
        name: payload,
      };
    case "@setContinentFilter":
      return {
        ...state,
        continentFilter: payload,
      };
    case "@setActivityFilter":
      return {
        ...state,
        activityFilter: payload,
      };
    case "@setAlphabetOrder":
      return {
        ...state,
        alphabetOrder: payload,
        populationOrder: "",
      };
    case "@setPopulationOrder":
      return {
        ...state,
        populationOrder: payload,
        alphabetOrder: "",
      };
    default:
      return state;
  }
}
