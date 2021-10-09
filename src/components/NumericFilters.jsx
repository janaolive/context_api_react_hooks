// referências de pesquisa: App.js

import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import Select from './Select';

const NumericFilters = () => {
  const {
    handleNumericFilter,
    comparisonOptions,
    filteredColumns,
  } = useContext(StarWarsContext);

  const [column, setColumn] = useState(filteredColumns[0]);
  const [comparison, setComparison] = useState(comparisonOptions[0]);
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    handleNumericFilter({ column, comparison, value });
    setValue('');
  };

  useEffect(() => {
    setColumn(filteredColumns[0]);
  }, [filteredColumns]);

  return (
    <form className="numeric-filters" onSubmit={ handleSubmit }>
      <Select
        id="column-filter"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
        options={ filteredColumns }
      />

      <Select
        id="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
        options={ comparisonOptions }
      />

      <input
        data-testid="value-filter"
        type="text"
        value={ value }
        onChange={ ({ target }) => setValue(target.value.replace(/\D/, '')) }
      />

      <button data-testid="button-filter" type="submit">
        filter
      </button>
    </form>
  );
};

export default NumericFilters;
