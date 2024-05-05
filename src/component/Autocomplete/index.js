import { Autocomplete, TextField } from "@mui/material";

const AutoComplete = (props) => {
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
