### Pokemob App:
* This app is developed with React.js and MobX for state management;
* Uses Pokémon API (http://pokeapi.co/)

Bonuses:
Used React Hooks;
SASS, MUI makeStyles;
CSS animations;

### MVP:

* Pokemons are listed in cards with their name, avatar, colored type and the main pokemon stats;

* Pokemon stats get sorted by value, from highest to smallest, to show just 3 strongest stats;

* On the first render the app sends request to the API and receives data just for 10 Pokémons.

* For instance, if you keep the view for 10 cards(Pokémons), then when you click on the next page the app sends a new request for 10 new Pokémons.
The received data from those API calls is saved in one array. Like that, there is no need to make unnecessary API requests when we go back to previous pages.

### Filter:
* Filtering is handled with different requests to parts of the API;
* Filter by type sends request on https://pokeapi.co/api/v2/type/{type} ;
* At the same time, previously received data doesn’t get lost, it gets stored in array, so there is no need to fetch again when filters are removed;
* Filter by type works with multiple selected types;

* Filter by name sends request on https://pokeapi.co/api/v2/pokémon/{name}, and works by full match;

### Notes:

* I don’t use images from the API, because I wanted to get them in a better quality. Insted, I used images provided by https://pokeres.bastionbot.org ;

### To impove:
Ideally, filter should cache data and use it to check it in first place before making API calls;

