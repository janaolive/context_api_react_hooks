// tentei incluir a lógica do filtro aqui também, mas não funcionou. Após pesquisa voltei ela para o componente

import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

// requisito 5 e 6
const initialFilters = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

const initialColumns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const ascending = 1;
const descending = -1;

function Filters() {
  const {
    data,
    setData,
    handleOption,
    handleChange,
    filters,
    setFilters,
    optionColumns,
  } = useContext(StarWarsContext);

  const [actualFilter, setActualFilter] = useState(initialFilters);
  const [columnList, setColumnList] = useState(initialColumns);
  const [sortFilters, setSortFilters] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const [objectFilters, setObjectFilters] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  // const handleFilterButton = () => {
  //   setFilters(
  //     { ...filters,
  //       filterByNumericValues: [...filters.filterByNumericValues, objectFilters],
  //     },
  //   );
  //   // handleOption();
  // };

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

  const clearColumn = (column) => {
    const columnFiltered = columnList.filter((col) => col !== column);
    setColumnList(columnFiltered);
  };

  const clearFilter = () => {
    setData(data);
  };

  const clickFilter = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, actualFilter],
    });
    clearColumn(actualFilter.column);
    const { column, comparison, value } = actualFilter;
    const filteredData = data.filter((planet) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'igual a') {
        return Number(planet[column]) > Number(value);
      }
      return null;
    });
    setData(filteredData);
  };

  const sortData = (column, sort) => {
    const order = sort === 'ASC' ? ascending : descending;
    const sortedData = [...data]
      .sort((a, b) => ((Number(a[column]) > Number(b[column])
        ? order
        : -order)));
    setData(sortedData);
  };

  // loading
  if (data === undefined) {
    return <h3> Carregando... </h3>;
  }

  return (
    <div>
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
        <button type="button" onClick={ clearFilter }>X</button>

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
        <button type="button" onClick={ clearFilter }>X</button>

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
          onClick={ clickFilter }
        >
          Filtrar
        </button>
      </form>

      <form>
        <select
          data-testid="column-sort"
          onChange={ (e) => setSortFilters({ ...sortFilters, column: [e.target.value] }) }
        >
          {initialColumns.map((col) => (
            <option key={ col } value={ col }>
              {col}
            </option>
          ))}
        </select>
        <label htmlFor="asc">
          <input
            type="radio"
            name="ascending-radio"
            id="ASC"
            data-testid="column-sort-input-asc"
            value="ASC"
            onClick={ () => setSortFilters({ ...sortFilters, sort: 'ASC' }) }
          />
          crescente
        </label>
        <label htmlFor="desc">
          <input
            type="radio"
            name="ascending-radio"
            id="DESC"
            data-testid="column-sort-input-desc"
            value="DESC"
            onClick={ () => setSortFilters({ ...sortFilters, sort: 'DESC' }) }
          />
          decrescente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => sortData(sortFilters.column, sortFilters.sort) }
        >
          Organizar
        </button>
      </form>
    </div>
  );
}

export default Filters;
