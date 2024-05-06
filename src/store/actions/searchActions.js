import { getSearchJobs, setSearchFilter, updateSearchJobs } from "../types/searchTypes";

export function fetchJobs(limit = 10, offset = 0) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "limit": limit,
        "offset": offset
    });
       
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
    };
       
    return (dispatch) => {
        fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((res) => res.text())
        .then((data) => {            
            try {
                const parsedData = JSON.parse(data);
                if(offset === 0){
                    dispatch(getSearchJobs(parsedData));
                }else{
                    dispatch(updateSearchJobs(parsedData))
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }
}

export function setFilter(data) {
    return (dispatch) => {
        dispatch(setSearchFilter(data))
    }
}

