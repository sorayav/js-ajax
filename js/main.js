'use strict';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

fetch(endpoint)
  .then(response => response.json())
  .then(data => { cities = data })

  function filterPlaces(wordMatching, cities) {
    return cities.filter(place => {
      const regex = new RegExp(wordMatching, 'gi');
      return place.city.match(regex) || place.state.match(regex);
    });
  }

function displayPlaces() {
  const matchPlace = filterPlaces(this.value, cities);
  const html = matchPlace.map(place => {
    return `
    <li>
      <span class="name">${place.city}, ${place.state}</span>
      <span class="population">${place.population}</span>
    </li>
    `
  }).join('');
  suggestions.innerHTML = html;
}

searchInput.addEventListener('keyup', displayPlaces);