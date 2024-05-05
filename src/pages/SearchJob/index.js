import { BasePay, Experience, NoOfEmployees, RemoteOptions, RoleCategories, Roles, TechStack } from "../../helpers/constants";
import AutoComplete from "../../component/Autocomplete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../store/actions/searchActions";
import { CircularProgress } from "@mui/material";

const SearchJob = () => {
    const dispatch = useDispatch();
    const jdList = useSelector(state => state.search.searchJobs);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1); 

    useEffect(() => {
        dispatch(fetchJobs());

        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            setPage(prevPage => prevPage + 1); 
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (page > 1) { 
            setIsLoading(true); 
            dispatch(fetchJobs(page));
        }
    }, [page]);

    useEffect(() => {
        if (jdList.length > 0) setIsLoading(false);
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

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                {isLoading ? <CircularProgress /> : <></>}
            </div>
        </div>
    );
};

export default SearchJob;
