const Express = require("express");
const { Country, Activity } = require("../db.js");
const axios = require("axios");
const { Op } = require("sequelize");
const app = Express();

app.get("/", async (req, res) => {
  try {
    const name = req.query.name ? req.query.name.toLowerCase() : "";
    const countries = await Country.findAll({
      where: {
        name: { [Op.startsWith]: name },
      },
    });
    const countriesAll = countries.map((e) => e.toJSON());
    if (countriesAll.length === 0)
      throw `the country ${req.query.name}, is not in our database`;
    res.send(countriesAll);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/:id", async (req, res) => {
  const ID = req.params.id.toUpperCase();
  try {
    const country = axios.get(`https://restcountries.com/v3/alpha/${ID}`);

    const activity = Activity.findAll({
      include: {
        model: Country,
        where: { ID },
        attributes: [],
      },
    });
    Promise.all([country, activity]).then((result) => {
      const countryDetail = {
        ID: result[0].data[0].cca3,
        name: result[0].data[0].name.common,
        flag: result[0].data[0].flags[0],
        continent: result[0].data[0].continents[0],
        capital: result[0].data[0].capital
          ? result[0].data[0].capital[0]
          : undefined,
        subregion: result[0].data[0].subregion,
        area: result[0].data[0].area,
        population: result[0].data[0].population,
      };
      countryDetail.activities = result[1];
      res.send(countryDetail);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = app;

// app.get("/:id", async (req, res) => {
//   const ID = req.params.id.toUpperCase()
//   try {
//     const country = await Country.findOne({
//     where: {ID},
//     include: [{
//     model: Activity,
//     }],
//   })
//   console.log(country);
//   if (!country) throw 'ID not valid'
//   res.send(country.toJSON());
//   } catch (error) {
//   res.status(400).send(error)
//   }
// });

// para cargar la base de datos;

// try {
// let countriesApi =  await axios.get('https://restcountries.com/v3/all')
// let countriesDb = countriesApi.data.map(async (country) => {

// await Country.create({
//   ID: country.cca3,
//   name: country.name.common.toLowerCase(),
//   flag: country.flags[0],
//   continent: country.continents[0],
//   capital: country.capital?country.capital[0]:undefined,
//   subregion: country.subregion,
//   area: country.area,
//   population: country.population,
// })
// })

// } catch (error) {
//   res.send(error);
// }
// })

// app.get("/:id", async (req, res) => {
//   try {
//     let countryID = await axios.get(
//       `https://restcountries.com/v3/alpha/${req.params.id}`
//     );
//     const countryDetail = {
//       ID: countryID.data[0].cca3,
//       name: countryID.data[0].name.common,
//       flag: countryID.data[0].flags[0],
//       continent: countryID.data[0].continents[0],
//       capital: countryID.capital ? countryID.capital[0] : undefined,
//       subregion: countryID.data[0].subregion,
//       area: countryID.data[0].area,
//       population: countryID.data[0].population,
//     };
//     // const countryActivities = await
//     const join = await Country.findOne({
//     where: {ID: 'COL'},
//     include: [{
//     model: Activity,
//     // attributes: {exclude: 'country_activity'}
//     // attributes: ['name']
//     }]
//   })
//     console.log(join);
//     console.log(countryDetail);
//   const resultado = await join.concat(countryDetail)
//   console.log(resultado);
//     res.send(resultado);
//   } catch (error) {
//     console.log(error);
//   }
// });
// app.get('/', async (req, res) => {

// try {
// let colombia =  await axios.get('https://restcountries.com/v3/name/colombia')
// const country = await Country.create({
//   // const country = {
//   ID: colombia.data[0].cca3,
//   name: colombia.data[0].name.common,
//   flag: colombia.data[0].flags[1],
//   continent: colombia.data[0].continents[0],
//   capital: colombia.data[0].capital[0],
//   subregion: colombia.data[0].subregion,
//   area: colombia.data[0].area,
//   population: colombia.data[0].population,
// // }
// })
// // console.log('tabla', country)
// //   res.send(country)
// console.log('tabla', country.toJSON());
//   res.send(country.toJSON())
// } catch (error) {
//   res.send(error);
// }
// })

