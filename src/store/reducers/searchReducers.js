import { combineReducers } from "@reduxjs/toolkit"

const initialState = {
    searchJobs: [],
    totalCount: 0,
    searchFilter : [],
    isFilterOn: false
}

const searchReducer = (state = initialState, action) => {
    console.log("chekcing in payload::", action.type)
  switch (action.type) {
    case "GET_JOBS":
        return {...state, searchJobs: action.payload.jdList, totalCount: action.payload.totalCount, searchFilter: [], isFilterOn: false}
    case 'UPDATE_JOBS':
        return {...state, searchJobs: [...state.searchJobs, ...action.payload.jdList], isFilterOn: false}
    case 'SET_FILTER':
        return {...state, isFilterOn: true, searchFilter: action.payload}
    default:
      return state
  }
}

const searchJobsReducer = combineReducers({
  searchJobs: searchReducer
})

export default searchJobsReducer