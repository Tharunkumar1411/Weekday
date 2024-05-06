export function getSearchJobs(data){
    return {
        type : "GET_JOBS",
        payload: data
    }
}

export function updateSearchJobs(data){
    return {
        type: 'UPDATE_JOBS',
        payload: data
    }
}


export function setSearchFilter(data){
    return {
        type: 'SET_FILTER',
        payload: data
    }
}
