import React, { useEffect } from "react";
import BackToTop from "react-back-to-top-button";
import PokeInfo from "../../components/poke-all-info/poke-all-info.component";
import "./styles.scss";
import { usePokemonStore } from "../../hooks/usePokemonStore";
import { useObserver } from "mobx-react";
import { PokemonPreview } from "../../components/pokemon-preview/pokemon-preview.component";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import SearchFilterContainer from "../../components/search-filter-container/search-filter-container";
import BackToTopIcon from "../../components/back-to-top/back-to-top.component";

const PokemonPreviewWithSpinner = withSpinner(PokemonPreview);

const MainPage = ({ match }) => {
  const pokemonStore = usePokemonStore();

  useEffect(() => {
    pokemonStore.fetch();
  }, [pokemonStore.offset, pokemonStore.resultPerPage, pokemonStore]);

  return useObserver(() => {
    return (
      <div className="main-page-container">
        {!!match.params.pokeId ? (
          <PokeInfo
            pokeId={parseInt(match.params.pokeId)}
            data={pokemonStore.filteredPokemons}
          />
        ) : (
          <>
            <BackToTop
              children={<BackToTopIcon />}
              style={{ margin: "20px 20px 60px 20px" }}
              showOnScrollUp
              showAt={100}
              speed={1500}
              easing="easeInOutQuint"
            ></BackToTop>
            <SearchFilterContainer />
            <PokemonPreviewWithSpinner
              isLoading={pokemonStore.isFetching}
              data={pokemonStore.filteredPokemons}
              setOffset={pokemonStore.setOffset}
              setResultPerPage={pokemonStore.setResultPerPage}
              rows={pokemonStore.resultPerPage}
              offset={pokemonStore.offset}
              totalPokemonsCount={pokemonStore.totalPokemonsCount}
              isType={pokemonStore.isType}
              page={pokemonStore.currentPage}
              setPage={pokemonStore.setCurrentPage}
            />
          </>
        )}
      </div>
    );
  });
};

export default MainPage;
