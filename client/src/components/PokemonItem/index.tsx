import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface StyleProps {
  isMatch: boolean;
  isRevealed: boolean;
  matchColor: string;
}

const blink = keyframes`
 30% {
      opacity: 1;
      visibility: visible;

  }

  50% {
      opacity: 0;
      visibility: hidden;
     
  }

  80% {
    opacity: 1;
    visibility: visible;
  }
`;

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
  & .front,
  & .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    transition: transform 0.25s ease-in-out;
    border-radius: 4px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    perspective: 500px;
  }

  & .front {
    background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/800px-Pok%C3%A9_Ball_icon.svg.png');
    background-color: black;
    transform: ${(props: StyleProps) =>
      props.isRevealed ? 'rotateY(-180deg)' : 'rotateY(0deg)'};
  }

  & .back {
    background-color: #d9fddd;
    transform: ${(props: StyleProps) =>
      props.isRevealed ? 'rotateY(0deg)' : 'rotateY(180deg)'};
    border: ${(props: StyleProps) =>
      props.isMatch ? `4px solid ${props.matchColor}` : `none`};

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.5);
      opacity: 0;
      visibility: hidden;
      animation: ${(props: StyleProps) =>
        props.isMatch
          ? css`
              ${blink} 1s linear
            `
          : 'none'};
    }
  }
`;

interface Props {
  id: string;
  pokemonId: number;
  isRevealed: boolean;
  handleSelectPokemon: (id: string) => void;
  isMatch: boolean;
  matchColor: string;
}

interface Pokemon {
  id: number;
  sprites: {
    front_default: string;
  };
}

const PokemonItem: React.FC<Props> = ({
  pokemonId,
  isRevealed,
  handleSelectPokemon,
  id,
  isMatch,
  matchColor,
}) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const firstRenderRef = useRef<boolean>(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((res) => {
      setPokemon(res.data);
    });
  }, [pokemonId]);

  return (
    <Wrapper
      isRevealed={isRevealed}
      onClick={() => handleSelectPokemon(id)}
      isMatch={isMatch}
      matchColor={matchColor}
    >
      <div className='front'></div>
      <div
        className='back'
        style={{ backgroundImage: `url(${pokemon?.sprites.front_default})` }}
      ></div>
    </Wrapper>
  );
};

export default PokemonItem;
