import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { usePokemonStore } from "../../hooks/usePokemonStore";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchInput = ({ filterPokemonsAction }) => {
  const pokemonStore = usePokemonStore();
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    filterPokemonsAction({ name: e.target.value });
  };

  const onStartSearch = (event) => {
    if (event.key === "Enter") {
      console.log("enter press here! ");
      pokemonStore.fetchByName();
      event.preventDefault();
    }
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search by full name"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={handleSearch}
        onKeyPress={onStartSearch}
        value={searchInput}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
