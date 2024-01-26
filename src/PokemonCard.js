import './App.css';
import React from 'react';

const PokemonCard = ({ pokemon }) => {
    return (
        <div className="pokemon-card">
            <img src={pokemon.sprite} alt={`${pokemon.name}`} />
            <h2>{pokemon.name}</h2>
            {/* other details */}
        </div>
    );
}

export default PokemonCard;

