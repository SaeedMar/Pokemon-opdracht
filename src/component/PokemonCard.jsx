import React from 'react';

function PokemonCard({ name, image, moves, weight, abilities }) {
    return (
        <div className="pokemon-card">
            <h2>{name}</h2>
            <img src={image} alt={name} />
            <p><strong>Moves:</strong> {moves}</p>
            <p><strong>Weight:</strong> {weight}</p>
            <p><strong>Abilities:</strong></p>
            <ul>
                {abilities.map((ability, idx) => (
                    <li key={idx}>{ability}</li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonCard;
