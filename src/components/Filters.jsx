// tentei incluir a lógica do filtro aqui também, mas não funcionou. Após pesquisa voltei ela para o componente

import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const {
    data, handleOption, handleChange, filters, setFilters, optionColumns,
  } = useContext(StarWarsContext);

  const [objectFilters, setObjectFilters] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  const handleFilterButton = () => {
    setFilters(
      { ...filters,
        filterByNumericValues: [...filters.filterByNumericValues, objectFilters],
      },
    );
    // handleOption();
  };

  useEffect(() => {
    const button = async () => {
      await handleOption();
    };
    button();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilter = ({ target }) => {
    const { name, value } = target;
    setObjectFilters({ ...objectFilters, [name]: value });
  };

  // loading
  if (data === undefined) {
    return <h3> Carregando... </h3>;
  }

  return (
    <form>
      <label htmlFor="search-by-name">
        Busca por nome:
        <input
          data-testid="name-filter"
          id="search-by-name"
          placeholder="Digite o nome de um planeta"
          type="text"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="option-column">
        Filtrar por:
        <select
          name="column"
          id="option-column"
          data-testid="column-filter"
          onChange={ handleFilter }
        >
          {
            optionColumns.map((option, index) => (
              <option
                key={ index }
                value={ option }
              >
                { option }
              </option>
            ))
          }
        </select>
      </label>

      <label htmlFor="option-comparison">
        Comparar por:
        <select
          name="comparison"
          id="option-comparison"
          data-testid="comparison-filter"
          onChange={ handleFilter }
        >
          <option value="-">-</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <label htmlFor="option-value">
        Filtrar Valor:
        <input
          type="number"
          name="value"
          id="option-value"
          data-testid="value-filter"
          onChange={ handleFilter }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterButton }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filters;
