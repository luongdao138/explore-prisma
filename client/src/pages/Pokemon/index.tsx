import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import './style.css';
import styled from 'styled-components';
import PokemonItem from '../../components/PokemonItem';
import useBoolean from '../../hooks/useBoolean';
import { v4 as uuidv4 } from 'uuid';

const MAP_SIZE = 4;

interface StylesProps {
  size: number;
}

interface MapItem {
  id: string;
  pokemonId: number;
  isRevealed: boolean;
}

const PokemonContent = styled('div')`
  width: min(100%, 600px);
  display: grid;
  grid-template-columns: ${(props: StylesProps) =>
    `repeat(${props.size}, 1fr)`};
  gap: 0.5rem;
  /* padding-top: 1rem; */
  /* padding-bottom: 1rem; */
  & > * {
    aspect-ratio: 1;
    border-radius: 4px;
  }
`;

const PokemonPage = () => {
  const [pokemonMap, setPokemonMap] = useState<MapItem[]>([]);
  const firstRenderRef = useRef<boolean>(true);

  const [matches, setMatches] = useState<number[]>([]);

  const handleSelectPokemon = (id: string) => {
    const mapItem = pokemonMap.find((i) => i.id === id);
    if (mapItem) {
      if (
        pokemonMap.filter((i) => i.isRevealed && !matches.includes(i.pokemonId))
          .length >= 2 ||
        mapItem.isRevealed
      ) {
        return;
      }

      setPokemonMap((prev) =>
        prev.map((i) => (i.id === id ? { ...i, isRevealed: true } : i))
      );
    }
  };

  useEffect(() => {
    const releavedPokemons = pokemonMap.filter(
      (i) => i.isRevealed && !matches.includes(i.pokemonId)
    );
    if (releavedPokemons.length === 2) {
      if (releavedPokemons[0].pokemonId === releavedPokemons[1].pokemonId) {
        setMatches((prev) => [...prev, releavedPokemons[0].pokemonId]);
      }
    }
  }, [pokemonMap, matches]);

  const closePokemonCard = (id: string) => {
    setPokemonMap((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isRevealed: false } : i))
    );
  };

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    // create a random array
    const pokemonIds = new Set<number>();

    while (pokemonIds.size < Math.pow(MAP_SIZE, 2) / 2) {
      const randomId = Math.ceil(Math.random() * 100);
      pokemonIds.add(randomId);
    }

    const items: number[] = [
      ...Array.from(pokemonIds),
      ...Array.from(pokemonIds),
    ];

    console.log({ items });
    setPokemonMap(
      _.shuffle(items).map((i) => ({
        id: uuidv4(),
        pokemonId: i,
        isRevealed: false,
      }))
    );
  }, []);

  return (
    <div className='pokemon-container'>
      <PokemonContent size={MAP_SIZE}>
        {pokemonMap.map((mapItem) => (
          <PokemonItem
            key={mapItem.id}
            pokemonId={mapItem.pokemonId}
            isRevealed={mapItem.isRevealed}
            handleSelectPokemon={handleSelectPokemon}
            id={mapItem.id}
            isMatch={matches.includes(mapItem.pokemonId)}
            closePokemonCard={closePokemonCard}
          />
        ))}
      </PokemonContent>
    </div>
  );
};

export default PokemonPage;
