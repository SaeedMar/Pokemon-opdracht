// import { useState, useEffect } from 'react';
// import axios from 'axios';
//
// function PokemonCatalog() {
//     const [pokemonList, setPokemonList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [offset, setOffset] = useState(0);
//     const [hasMore, setHasMore] = useState(true); // Om te checken of er meer Pokémon zijn
//     const limit = 20;
//     let controller = new AbortController();
//
//
//     const fetchPokemon = async (limit = 20, offset = 0) => {
//         setLoading(true);
//         setError(null);
//         try {
//             controller = new AbortController();
//             const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, {
//                 signal: controller.signal
//             });
//
//             const pokemonResults = response.data.results;
//
//
//             const detailedPokemonList = await Promise.all(
//                 pokemonResults.map(async (pokemon) => {
//                     const details = await axios.get(pokemon.url);
//                     return {
//                         name: pokemon.name,
//                         image: details.data.sprites.front_default,
//                         weight: details.data.weight,
//                         moves: details.data.moves.length,
//                         abilities: details.data.abilities.map((ability) => ability.ability.name),
//                     };
//                 })
//             );
//
//             setPokemonList(detailedPokemonList);
//             setHasMore(pokemonResults.length === limit);
//             setLoading(false);
//         } catch (err) {
//             if (err.name !== "CanceledError") {
//                 setError("Er is een fout opgetreden bij het ophalen van de data.");
//             }
//             setLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchPokemon(limit, offset);
//
//
//         return () => {
//             controller.abort();
//         };
//     }, [offset]);
//
//     // Knoppen voor volgende/vorige pagina
//     const nextPage = () => {
//         if (!loading && hasMore) {
//             setOffset((prevOffset) => prevOffset + limit);
//         }
//     };
//
//     const prevPage = () => {
//         if (!loading && offset > 0) {
//             setOffset((prevOffset) => Math.max(0, prevOffset - limit));
//         }
//     };
//
//     return (
//         <div>
//             <h1>Pokémon Catalog</h1>
//             {loading && <p>Loading...</p>}
//             {error && <p>{error}</p>}
//
//             <div className="pokemon-grid">
//                 {!loading && pokemonList.map((pokemon, index) => (
//                     <div key={index} className="pokemon-card">
//                         <h2>{pokemon.name}</h2>
//                         <img src={pokemon.image} alt={pokemon.name} />
//                         <p><strong>Moves:</strong> {pokemon.moves}</p>
//                         <p><strong>Weight:</strong> {pokemon.weight}</p>
//                         <p><strong>Abilities:</strong></p>
//                         <ul>
//                             {pokemon.abilities.map((ability, idx) => (
//                                 <li key={idx}>{ability}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//
//             <div>
//                 <button onClick={prevPage} disabled={loading || offset === 0}>Vorige</button>
//                 <button onClick={nextPage} disabled={loading || !hasMore}>Volgende</button>
//             </div>
//         </div>
//     );
// }
//
// export default PokemonCatalog;

import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function PokemonCatalog() {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 20;
    let controller = new AbortController();

    const fetchPokemon = async (limit = 20, offset = 0) => {
        setLoading(true);
        setError(null);
        try {
            controller = new AbortController();
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, {
                signal: controller.signal
            });

            const pokemonResults = response.data.results;

            const detailedPokemonList = await Promise.all(
                pokemonResults.map(async (pokemon) => {
                    const details = await axios.get(pokemon.url);
                    return {
                        name: pokemon.name,
                        image: details.data.sprites.front_default,
                        weight: details.data.weight,
                        moves: details.data.moves.length,
                        abilities: details.data.abilities.map((ability) => ability.ability.name),
                    };
                })
            );

            setPokemonList(detailedPokemonList);
            setHasMore(pokemonResults.length === limit);
            setLoading(false);
        } catch (err) {
            if (err.name !== "CanceledError") {
                setError("Er is een fout opgetreden bij het ophalen van de data.");
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemon(limit, offset);

        return () => {
            controller.abort();
        };
    }, [offset]);

    // Knoppen voor volgende/vorige pagina
    const nextPage = () => {
        if (!loading && hasMore) {
            setOffset((prevOffset) => prevOffset + limit);
        }
    };

    const prevPage = () => {
        if (!loading && offset > 0) {
            setOffset((prevOffset) => Math.max(0, prevOffset - limit));
        }
    };

    return (
        <div>
            <h1>Pokémon Catalog</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className="pokemon-grid">
                {!loading && pokemonList.map((pokemon, index) => (
                    <PokemonCard
                        key={index}
                        name={pokemon.name}
                        image={pokemon.image}
                        moves={pokemon.moves}
                        weight={pokemon.weight}
                        abilities={pokemon.abilities}
                    />
                ))}
            </div>

            <div>
                <button onClick={prevPage} disabled={loading || offset === 0}>Vorige</button>
                <button onClick={nextPage} disabled={loading || !hasMore}>Volgende</button>
            </div>
        </div>
    );
}

export default PokemonCatalog;
