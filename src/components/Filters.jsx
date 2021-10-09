// referências de pesquisa: App.js
import React, { useContext } from 'react';
import NumericFilters from './NumericFilters';
import ActiveFilters from './ActiveFilters';
import SortFilters from './SortFilters';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { filters, handleNameFilter } = useContext(StarWarsContext);
  const { name } = filters.filterByName;

  return (
    <div>
      <div>
        <NumericFilters />
        <SortFilters />
        <ActiveFilters />
      </div>
      <div className="name-filter">
        <input
          data-testid="name-filter"
          type="text"
          value={ name }
          onChange={ ({ target }) => handleNameFilter(target.value) }
        />
      </div>
    </div>
  );
}

export default Filters;
