const fetch = require('node-fetch');
const fs = require('fs');

const API_HOST = 'http://localhost:3030';
const RUTA_FRAGMENTOS = './src/pages/Mapa/apollo/fragmentTypes.json';

const construirArchivoTiposDeFragmentos = () => {
console.log('Extrayendo tipos de fragmentos...');
fetch(`${API_HOST}/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );
    result.data.__schema.types = filteredData;
    fs.writeFile(RUTA_FRAGMENTOS, JSON.stringify(result.data), err => {
      if (err) {
        console.error('Error mientras se escribía el archivo fragmentTypes.json', err);
      } else {
        console.log('Los tipos de fragment fueron exitosamente extraídos en fragmentTypes.json!');
      }
    });
  });
}

module.exports = construirArchivoTiposDeFragmentos;