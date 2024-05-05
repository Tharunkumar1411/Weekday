import { combineReducers } from "@reduxjs/toolkit"

const initialState = {
    searchJobs: [],
    totalCount: 0,
}

const searchReducer = (state = initialState, action) => {
    console.log("chekcing in payload::", action.payload)
  switch (action.type) {
    case "GET_JOBS":
        return {...state, searchJobs: action.payload.jdList, totalCount: action.payload.totalCount}
    default:
      return state
  }
}

const searchJobsReducer = combineReducers({
  searchJobs: searchReducer
})

export default searchJobsReducer