import { getSearchJobs } from "../types/searchTypes";

export function fetchJobs() {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
        "limit": 10,
        "offset": 0
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
                console.log("chekcing data::", parsedData)
                dispatch(getSearchJobs(parsedData));
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }
}