// referências de pesquisa: App.js
import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableRow from './TableRow';

function Table() {
  const { filteredPlanets, headers } = useContext(StarWarsContext);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={ header }>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredPlanets
            && filteredPlanets.map((planet) => (
              <TableRow key={ planet.name } planet={ planet } />
            ))}
      </tbody>
    </table>
  );
}

export default Table;
