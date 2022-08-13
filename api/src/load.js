// const Express = require("express");
const { get } = require ("axios");
const { Country } = require ('./db.js');
// const app = Express();
// const { Op } = require("sequelize");

async function load () {
  console.log('loading database...')
    const countriesApi =  await get('https://restcountries.com/v3/all')
      const database = countriesApi.data.map(async (country) => {
      await Country.create({
      id: country.cca3,
      name: country.name.common.toLowerCase(),
      flag: country.flags[0],
      continent: country.continents[0],
      capital: country.capital?country.capital[0]:undefined,
      subregion: country.subregion,
      area: country.area,
      population: country.population,
    })
})
console.log('database loaded successfully')
}

module.exports = {load};
