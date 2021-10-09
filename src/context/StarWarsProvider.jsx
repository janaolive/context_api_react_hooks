// referências de pesquisa: App.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { filterOrder, nameFilter, numericFilter } from '../components/FiltersHelp';
import fetchPlanets from '../services/FetchPlanets';
import StarWarsContext from './StarWarsContext';

const initialFilters = {
  filterByName: { name: '' },
  filterByNumericValues: [],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

const columnOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparisonOptions = ['maior que', 'menor que', 'igual a'];

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filteredColumns, setFilteredColumns] = useState(columnOptions);

  const planets = async () => {
    const response = await fetchPlanets();
    setData(response);
    setHeaders(
      Object.keys(response.results[0]).filter((key) => key !== 'residents'),
    );
  };

  const handleNameFilter = (name) => {
    setFilters({
      ...filters,
      filterByName: { ...filters.filterByName, name },
    });
  };

  const handleNumericFilter = (numberFilter) => {
    const { filterByNumericValues } = filters;
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, numberFilter],
    });
    setFilteredColumns(
      filteredColumns.filter(
        (columnName) => columnName !== numberFilter.column,
      ),
    );
  };

  const clearNumericFilter = (filterColumn) => {
    const { filterByNumericValues } = filters;
    setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues.filter(
        ({ column }) => column !== filterColumn,
      ),
    });
    setFilteredColumns([...filteredColumns, filterColumn]);
  };

  const sortFilter = (order) => {
    setFilters({
      ...filters,
      order,
    });
  };

  const contextValue = {
    headers,
    filters,
    setFilters,
    filteredPlanets,
    filteredColumns,
    setFilteredColumns,
    comparisonOptions,
    handleNameFilter,
    handleNumericFilter,
    clearNumericFilter,
    sortFilter,
  };

  useEffect(() => {
    planets();
  }, []);

  useEffect(() => {
    if (data && data.results) {
      const { results } = data;
      const { filterByName, filterByNumericValues, order } = filters;

      let arrayFiltered = [...results];
      arrayFiltered = nameFilter(arrayFiltered, filterByName.name);
      arrayFiltered = numericFilter(arrayFiltered, filterByNumericValues);
      arrayFiltered = filterOrder(arrayFiltered, order);

      setFilteredPlanets(arrayFiltered);
    }
  }, [data, filters]);

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
