// referências de pesquisa: App.js
export const nameFilter = (array, name) => (
  array.filter(({ name: planetName }) => (
    planetName.toLowerCase().includes(name.toLowerCase())
  ))
);

export const numericFilter = (array, numericFilterArray) => {
  let arrayFiltered = [...array];
  const comparisonTable = {
    'maior que': (columnValue, comparisonValue) => columnValue > comparisonValue,
    'menor que': (columnValue, comparisonValue) => columnValue < comparisonValue,
    'igual a': (columnValue, comparisonValue) => columnValue === comparisonValue,
  };

  numericFilterArray.forEach(({ column, comparison, value }) => {
    arrayFiltered = arrayFiltered.filter((planet) => {
      const columnValue = Number(planet[column]);
      const comparisonValue = Number(value);

      return comparisonTable[comparison](columnValue, comparisonValue);
    });
  });

  return arrayFiltered;
};

export const filterOrder = (array, { column, sort }) => {
  const sortTable = {
    ASC: (a, b) => a.localeCompare(b, undefined, { numeric: true }),
    DESC: (a, b) => b.localeCompare(a, undefined, { numeric: true }),
  };

  return array.sort((planetA, planetB) => (
    sortTable[sort](planetA[column], planetB[column])
  ));
};
