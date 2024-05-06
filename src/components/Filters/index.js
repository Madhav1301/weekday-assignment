import React from "react";
import { useContext } from "react";
import { JobListingContext } from "../../context";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from '@mui/material/Stack';
import {ROLES, DATA} from '../../constants';

export default function Filters() {
  const props = useContext(JobListingContext);

  return (
    <Stack direction={{xs: 'column', md: 'row'}} spacing={1}>
      <Autocomplete
        fullWidth
        multiple
        id="roles"
        className="dropdown"
        options={ROLES}
        groupBy={(role) => role.Deportment}
        getOptionLabel={(role) => role.Role}
        sx={{ width: window.innerWidth / 6 }}
        renderInput={(params) => <TextField {...params} label="Roles" />}
        onChange={(event, value) => {
          // Setting the selected roles in the context
          props.setFilter((prevState) => ({
              ...prevState,
              roles: value 
          }));
        }}
      />
      {Object.keys(DATA).map((key) => {
        const id = key.replace(/ /g, "_").toLowerCase();
        console.log(id);
        return (
          <Autocomplete
            multiple
            sx={{px: '5px', borderRadius: '10px'}}
            id={id}
            options={DATA[key]}
            sx={{ width: window.innerWidth / 6 }}
            renderInput={(params) => <TextField {...params} label={key} />}
            onChange={(event, value) => {
              props.setFilter((prevState) => ({
                ...prevState,
                [id]: value
            }));
            }}
          />
        );
      })}
      <TextField
        id="search-box"
        className="search-box"
        label="Search Company Name"
        variant="outlined"
        value={props.search}
        sx={{ maxWidth: window.innerWidth / 6 }}
        onChange={(e) => {
          props.setFilter((prevState) => ({
            ...prevState,
            search: e.target.value 
        }));
        }}
      />
    </Stack>
  );
}
