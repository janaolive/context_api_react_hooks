import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FilterList() {
  const { filters, setFilters, setFiltered } = useContext(StarWarsContext);
  const { filterByNumericValues } = filters;

  // limpar filtro do estado, da table de filtragens e o botão
  const handleClearFilter = (index) => {
    const clearFilter = filterByNumericValues.splice(index, 1);
    setFilters({
      ...filters,
      filterByNumericValues: [clearFilter],
    });
    setFiltered(undefined);
  };

  return (
    <div>
      {
        filterByNumericValues.lenght > 0
          ? filterByNumericValues.map((filter, index) => (
            <div key={ index } data-testid="filter">
              <p>{ filter.column }</p>
              <p>{ filter.comparison }</p>
              <p>{ filter.value }</p>
              <button
                type="button"
                onClick={ () => handleClearFilter(index) }
              >
                X
              </button>
            </div>
          ))
          : <br />
      }
    </div>
  );
}

export default FilterList;
