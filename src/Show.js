import React from 'react';

const Show = ({ pokemon }) => (
  <div>
    <h2>{pokemon.name}</h2>
    <img alt={pokemon.name} src={pokemon.sprites.front_default} />
  </div>
);

export default Show;
