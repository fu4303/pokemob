import { observable, action, computed, decorate } from 'mobx';
import { fetchAPI } from '../api';
import { deleteKeyFromObj } from '../components/utils/deleteKeyFromObj';
import { isEmpty } from '../components/utils/isObjEmpty';
import { toJS } from 'mobx';


export default class PokemonStore {
    pokemons = [];
    isFetching = true;
    filter = {}; // name: '', types: []
    resultPerPage = 10;
    offset = 0;

    get filteredPokemons() {
        if (!isEmpty(this.filter)) {
            let pokemonsArr = [];
            let filteredFilter = deleteKeyFromObj(this.filter, 'name');

            if (this.filter.hasOwnProperty('name')) {
                pokemonsArr = this.pokemons.filter(pokemon => pokemon.name.includes(this.filter.name));
            } else {
                pokemonsArr = this.pokemons;
            }
            return pokemonsArr;
        } else {
            return this.pokemons;
        }

    }

    fetch() {
        // check if we need to retrieve new pokemons based on offset value, which comes from pokemon-preview.component
        this.isFetching = true;
        fetchAPI(`https://pokeapi.co/api/v2/pokemon?limit=${this.resultPerPage}&offset=${this.offset}`).then((allPokemons) => {
            Promise.all(allPokemons.results.map(pokemon => fetchAPI(pokemon.url))).then((fetchedPokemons) => {
                this.pokemons = [...this.pokemons, ...fetchedPokemons];
                this.isFetching = false;
                console.log(toJS(fetchedPokemons));
            });
        });

    }


    getSelectedPokemon(pokeId) {
        return this.pokemons.filter(pokemon => pokemon.id === pokeId)
    }

    filterPokemons = (filterToAdd) => {
        // console.log(toJS(filterToAdd));
        this.filter = { ...this.filter, ...filterToAdd }
    }

    clearFilter = () => {
        this.filter = {}
    }

    setResultPerPage = (newResult) => {
        this.resultPerPage = newResult;
    }

    setOffset = (newOffset) => {
        // console.log(this.offset, 'this', newOffset, 'new')
        this.offset = newOffset;
    }

}

decorate(PokemonStore, {
    pokemons: observable,
    filter: observable,
    isFetching: observable,
    resultPerPage: observable,
    offset: observable,

    filteredPokemons: computed,

    getSelectedPokemon: action,
    fetch: action,
    filterPokemons: action,
    clearFilter: action,
    setOffset: action,
    setResultPerPage: action,
})

