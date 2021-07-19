// import { conditionalExpression } from 'babel-types';
import './css/styles.css';
import API from './js/fetchCountries';
import countryDescr from './templates/country-description.hbs';
import countriesList from'./templates/country-list.hbs';

import Notiflix from "notiflix";
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('input#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info')
};

refs.input.addEventListener('input', debounce (onFilterCountries, DEBOUNCE_DELAY));


function onFilterCountries(evt) {
  evt.preventDefault();
  const filter = evt.target.value;

  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

  API.fetchCountries(filter)
.then(renderCountryCard)
.catch(error =>console.log(error))
}


function renderCountryCard (countries) {
  if (countries.status === 404) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
} else if (countries.length === 1) {
  refs.countryInfo.insertAdjacentHTML('beforeend', countryDescr(countries));
} else if (countries.length >= 2 && countries.length <= 10) {
    refs.countryList.insertAdjacentHTML('beforeend', countriesList(countries));
} else if (countries.length > 10){
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');  
}
}
