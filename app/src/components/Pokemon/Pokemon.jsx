import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pokemons = () => {
    const [pokes, setPokes] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/').then((res) => {
            setPokes(res.data.results);
        });
    }, []);

    useEffect(() => {
        const getImages = () => {
            const imagePromises = pokes.map((pokemon) => {
                return axios.get(pokemon.url).then((res) => {
                    return { name: pokemon.name, image: res.data.sprites.front_default };
                });
            });

            Promise.all(imagePromises).then((imageData) => {
                setImages(imageData);
            });
        };

        if (pokes.length > 0) {
            getImages();
        }
    }, [pokes]);

    return (
        <div>
            <h1>Pokemons</h1>
            <ul>
                {images.map((pokemon, index) => (
                    <li key={index}>
                        <img src={pokemon.image} alt={`Pokemon ${index}`} />
                        <p>{pokemon.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pokemons;
