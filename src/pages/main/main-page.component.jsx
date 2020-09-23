import React, { useEffect } from "react";
import "./styles.scss";
import { usePokemonStore } from "../../hooks/hooks";
import { useObserver } from "mobx-react";
import PokemonPreview from "../../components/pokemon-preview/pokemon-preview.component";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import SearchFilterContainer from "../../components/search-filter-container/search-filter-container";

const PokemonPreviewWithSpinner = withSpinner(PokemonPreview);

const MainPage = () => {
  const pokemonStore = usePokemonStore();

  useEffect(() => {
    if (pokemonStore.pokemons.length === 0) {
      pokemonStore.fetch();
    }
  });

  return useObserver(() => (
    <div className="main-page-container">
      <SearchFilterContainer />
      <PokemonPreviewWithSpinner
        isLoading={pokemonStore.isFetching}
        data={pokemonStore.filteredPokemons}
      />
    </div>
  ));
};

export default MainPage;
