const Express = require("express");
const { Country, Activity } = require("../db.js");
const axios = require("axios");
const app = Express();
const { Op } = require("sequelize");

app.get("/", async (req, res, next) => {
  const { name } = req.query;
  console.log(req.query);
  try {
    if (name) {
      const countries = await axios.get(
        `https://restcountries.com/v3/name/${name}`
      );
      const countriesName = countries.data.map((result) => {
        return {
          id: result.cca3,
          name: result.name.common,
          flag: result.flags[0],
          continent: result.continents[0],
          capital: result.capital ? result.capital[0] : undefined,
          subregion: result.subregion,
          area: result.area,
          population: result.population,
        };
      });
      return res.send(countriesName);
    }
    return Country.findAll().then((result) => res.send(result));
  } catch (error) {
    next(error);
  }
});

app.get("/order", (req, res, next) => {
  const { order } = req.query;
  try {
    if (order === "nameAsc")
      return Country.findAll({ order: ["name"] }).then((result) =>
        res.send(result)
      );
    if (order === "nameDes")
      return Country.findAll({ order: [["name", "DESC"]] }).then((result) =>
        res.send(result)
      );
    if (order === "populationAsc")
      return Country.findAll({ order: ["population"] }).then((result) =>
        res.send(result)
      );
    if (order === "populationDes")
      return Country.findAll({ order: [["population", "DESC"]] }).then(
        (result) => res.send(result)
      );
  } catch (error) {
    next(error);
  }
});

app.get("/continents", (req, res, next) => {
  return Country.findAll({
    attributes: ["continent"],
    group: ["continent"],
    order: ["continent"],
  })
    .then((result) => res.send(result))
    .catch((error) => next(error));
});

app.get("/filterCountry", (req, res, next) => {
  const { name } = req.query;

  function firstLetterUpperCase(sentence) {
    let word = sentence
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1);
      });
    return word.join(" ");
  }

  const nameModify = firstLetterUpperCase(name);

  return Country.findAll({
    attributes: ["name"],
    where: {
      [Op.or]: [
        {
          name: {
            [Op.startsWith]: nameModify,
          },
        },
        {
          continent: {
            [Op.startsWith]: nameModify,
          },
        },
      ],
    },
    group: ["name"],
    order: ["name"],
  })
    .then((result) => {
      if (result.length == 0) throw "no result";
      res.send(result);
    })
    .catch((error) => next(error));
});


// para cargar la base de datos;
// app.get("/recargar", async (req, res, next) => {
// try {
// let countriesApi =  await axios.get('https://restcountries.com/v3/all')
// // res.send(countriesApi.data)
//   let database = countriesApi.data.map(async (country) => {
//   await Country.create({
//   id: country.cca3,
//   name: country.name.common,
//   flag: country.flags[0],
//   continent: country.continents[0],
//   capital: country.capital?country.capital[0]:undefined,
//   subregion: country.subregion,
//   area: country.area,
//   population: country.population,
// })
// })
//   res.send(database)
// // console.log(database)
// } catch (error) {
//   next(error);
// }
// })

app.get("/:id", (req, res, next) => {
  const id = req.params.id.toUpperCase();
  try {
    const country = axios.get(`https://restcountries.com/v3/alpha/${id}`);

    const activity = Activity.findAll({
      include: {
        model: Country,
        where: { id },
        attributes: [],
      },
    });
    return Promise.all([country, activity]).then((result) => {
      const countryDetail = {
        id: result[0].data[0].cca3,
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
    next(error);
  }
});

module.exports = app;
