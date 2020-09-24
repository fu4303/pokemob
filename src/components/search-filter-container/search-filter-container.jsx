import React from "react";
import Grid from "@material-ui/core/Grid";
import SearchInput from "../search-input/search-input.component";
import { POKEMON_TYPES } from "../../constants/pokemon-types";
import FilterInput from "../filter-input/filter-input.component";
import { usePokemonStore } from "../../hooks/usePokemonStore";

const SearchFilterContainer = () => {
  const pokemonStore = usePokemonStore();

  const typesArray = Object.keys(POKEMON_TYPES).map((i) => POKEMON_TYPES[i]);
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={6} md={4}>
        <SearchInput filterPokemonsAction={pokemonStore.filterPokemons} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FilterInput
          filterData={typesArray}
          filterPokemonsAction={pokemonStore.filterPokemons}
        />
      </Grid>
    </Grid>
  );
};
export default SearchFilterContainer;
