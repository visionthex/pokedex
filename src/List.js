import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import axios from 'axios';

const List = () => {
    const [pokemonList, setPokemonList] = useState([]);

// In the List component
useEffect(() => {
    const fetchPokemon = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const detailedPokemonData = await Promise.all(response.data.results.map(async (pokemon) => {
            const detailedResponse = await axios.get(pokemon.url);
            return {
              ...detailedResponse.data,
              sprite: detailedResponse.data.sprites.front_default,
            };
        }));
        setPokemonList(detailedPokemonData);
    };

    fetchPokemon();
}, []);


    return (
        <div className="pokemon-container">
            {pokemonList.map(pokemon => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
        </div>
    );
};

export default List;

