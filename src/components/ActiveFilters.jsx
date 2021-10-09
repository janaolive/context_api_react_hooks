// referências de pesquisa: App.js
import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const ActiveFilters = () => {
  const { filters, clearNumericFilter } = useContext(StarWarsContext);
  const { filterByNumericValues } = filters;

  return (
    <div className="active-filters">
      {filterByNumericValues.map(({ column }) => (
        <div key={ column } data-testid="filter">
          <p>{column}</p>
          <button type="button" onClick={ () => clearNumericFilter(column) }>
            remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;
