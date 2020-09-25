import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import { usePokemonStore } from "../../hooks/usePokemonStore";
import { useObserver } from "mobx-react";

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

const SearchInput = ({ setFilter, input }) => {
  const pokemonStore = usePokemonStore();
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (typeof input !== "undefined") {
      setSearchInput(input);
    }
  }, [input]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    // setFilter({ name: e.target.value });
  };

  const startSearch = (event) => {
    debugger;
    event.preventDefault();
    if (searchInput !== "") {
      setFilter({ name: searchInput });
      pokemonStore.fetchByName();
    }
  };

  const onStartSearch = (event) => {
    if (event.key === "Enter") {
      setFilter({ name: searchInput });
      startSearch(event);
    }
  };

  return useObserver(() => (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search by full name"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={handleSearch}
        onKeyPress={onStartSearch}
        value={searchInput}
      />
      {searchInput !== "" ? (
        <IconButton
          type="clear"
          className={classes.iconButton}
          aria-label="clear"
          onClick={(event) => {
            pokemonStore.clearFilter();
            setSearchInput("");
            event.preventDefault();
          }}
        >
          <ClearIcon />
        </IconButton>
      ) : null}
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={startSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  ));
};

export default SearchInput;
