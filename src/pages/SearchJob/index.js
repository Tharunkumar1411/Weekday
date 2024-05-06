import { BasePay, Experience, NoOfEmployees, RemoteOptions, RoleCategories, Roles, TechStack } from "../../helpers/constants";
import AutoComplete from "../../component/Autocomplete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../store/actions/searchActions";
import { CircularProgress } from "@mui/material";
import JobCard from "../../component/JobCard";

const SearchJob = () => {
    const dispatch = useDispatch();
    const jdList = useSelector(state => state.search.searchJobs);
    const [isLoading, setIsLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false)
    const [page, setPage] = useState(1); 

    useEffect(() => {
        dispatch(fetchJobs());
    }, []);

    useEffect(() => {
        if (jdList.length > 0) setLoadMore(false);
    }, [jdList]);

    return(
        <div>
            <div style={{marginLeft: 20, marginTop: 100, display:'flex', flexDirection: 'row',flexWrap:'wrap', gap: 10}}>
                <AutoComplete options={Roles} RoleCategories={RoleCategories} isGroupBy={true} placeHolder='Roles' width={140} size='small'/>
                <AutoComplete options={NoOfEmployees} isGroupBy={false} placeHolder='Number of Employees' width={230} size='small'/>
                <AutoComplete options={Experience} isGroupBy={false} placeHolder='Experience' width={180} size='small'/>
                <AutoComplete options={RemoteOptions} isGroupBy={false} placeHolder='Remote' width={180} size='small'/>
                <AutoComplete options={TechStack} isGroupBy={false} placeHolder='Tech Stack' width={180} size='small'/>
                <AutoComplete options={BasePay} isGroupBy={false} placeHolder='Minimum base pay salary' width={260} size='small'/>
            </div>

            <div style={{margin: 20, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
                {isLoading ? <CircularProgress /> : 
                <div>
                    <JobCard />
                </div>}
            </div>
        </div>
    );
};

export default SearchJob;
