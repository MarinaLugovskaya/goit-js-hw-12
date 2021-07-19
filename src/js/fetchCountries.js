export default {fetchCountries};

const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?fields=name;population;flag;languages;capital`)
  .then(response => {
    return response.json()
})
.catch(error => {
  console.log(error)
})
}