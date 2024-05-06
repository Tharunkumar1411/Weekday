import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setFilter } from "../../store/actions/searchActions";

const AutoComplete = (props) => {
    const dispatch = useDispatch()
    const jdList = useSelector(state => state.search.searchJobs.searchJobs);
    const searchFilters = useSelector(state => state.search.searchJobs.searchFilter);

    const [searchFilter, setSearchFilter] = useState({
        
        jobRole : [],
        experience: [],
        location: [],
        salary: [],
    })

    const handleOnChange = (event, newValue) => {
        console.log("cehck value::", newValue);

        if(newValue.length === 0){
            dispatch(fetchJobs());
            return;
        }

        let finalFilters = []
        const checkTag = newValue?.[0]?.tag

        if(checkTag === 'minJdSalary' || checkTag === 'minExp'){
            const updatedJobRoles = newValue.map((item) => item.value);
            const filteredValues = jdList.filter((value) => 
                updatedJobRoles.some((roleValue) => value[checkTag] > roleValue)
            );
            dispatch(setFilter(filteredValues))
            return
        }

        const updatedJobRoles = newValue.map((item) => item.title.toLowerCase());
        const filter = jdList.filter((item) => updatedJobRoles.includes(item[checkTag]));

        finalFilters = filter.filter((obj, index, self) => 
            index === self.findIndex((t) => (
                t.jdUid === obj.jdUid
            ))
        );
        console.log('finalFiltersupdatedJobRoles',updatedJobRoles, filter)
        dispatch(setFilter(finalFilters))
    };
    
    return(
        <div>
            <Autocomplete
                sx={{minWidth: props.width}}
                size="small"
                multiple
                id="tags-outlined"
                options={props.options}
                groupBy={(option) => option.category}
                getOptionLabel={(option) => option.title}
                filterSelectedOptions
                onChange={handleOnChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={props.placeHolder}
                        InputProps={{
                            ...params.InputProps,
                            sx: {
                                "& .MuiAutocomplete-endAdornment": {
                                    borderLeft: "1px solid #ccc",
                                    paddingLeft: "10px",
                                },
                            },
                        }}
                    />
                )}
                isOptionDisabled={() => props.RoleCategories.some((cat) => cat.disabled && props.isGroupBy)}
            />
        </div>
    )
}

export default AutoComplete;
