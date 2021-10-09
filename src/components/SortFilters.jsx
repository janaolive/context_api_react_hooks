// referências de pesquisa: App.js
import React, { useState, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Select from './Select';

const SortFilters = () => {
  const { headers, sortFilter } = useContext(StarWarsContext);

  const [column, setColumn] = useState('name');
  const [sort, setSort] = useState('ASC');

  const handleRadioChange = ({ target }) => {
    sortFilter(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSort({ column, sort });
  };

  return (
    <form onSubmit={ handleSubmit }>
      <Select
        id="column-sort"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
        options={ headers }
      />

      <label htmlFor="sort-asc">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          checked={ sort === 'ASC' }
          id="sort-asc"
          onChange={ handleRadioChange }
        />
        ASC
      </label>

      <label htmlFor="sort-desc">
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          value="DESC"
          checked={ sort === 'DESC' }
          id="sort-desc"
          onChange={ handleRadioChange }
        />
        DESC
      </label>

      <button data-testid="column-sort-button" type="submit">
        sort
      </button>
    </form>
  );
};

export default SortFilters;
