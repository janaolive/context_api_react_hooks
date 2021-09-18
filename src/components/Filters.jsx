// tentei incluir a lógica do filtroaqui também, mas não funciou. Após pesquisa voltei ela para o component Table.

import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { data, handleChange } = useContext(StarWarsContext);

  return (
    <div>
      <label htmlFor="search-by-name">
        Busca por nome:
        <input
          id="search-by-name"
          type="text"
          data-testid="name-filter"
          placeholder="Digite o nome de um planeta"
          onChange={ handleChange }
        />
      </label>
    </div>
  );
}

export default Filters;
