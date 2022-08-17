const Express = require("express");
const { Activity, Country } = require("../db.js");
const { firstLetterUpperCase } = require("../functions.js");
const app = Express();

app.get("/all", (req, res, next) => {
  return Activity.findAll({
    attributes: ["name"],
    order: ["name"],
  })
    .then((result) =>
      res.send(result.map((activity) => firstLetterUpperCase(activity.name)))
    )
    .catch((error) => next(error));
});

app.get("/filter", (req, res, next) => {
  const { name } = req.query;
  return Country.findAll({
    include: {
      model: Activity,
      where: { name },
      attributes: [],
    },
  })
    .then((result) => res.send(result))
    .catch((error) => next(error));
});

app.post("/", async (req, res, next) => {
  console.log("activity create", req.body);
  const { countries, name, difficulty, duration, season } = req.body;

  try {
    await Activity.create({
      name: name.toLowerCase(),
      difficulty,
      duration,
      season,
    });

    const activityDb = await Activity.findOne({
      where: { name },
    });

    countries.map(async (country) => {
      const countryDb = await Country.findOne({
        where: { name: country.toLowerCase() },
      });
      await countryDb.addActivity(activityDb);
    });

    res.send("Actividad Creada exitosamente");
  } catch (error) {
    next(error);
  }
});

module.exports = app;

// async function searchName(name) {
//   const result = await axios.get(`https://restcountries.com/v3/name/${name}`)
//   // console.log(result.data);
//   const countriesName = result.data.map((result) => {
//       return {
//         ID: result.cca3,
//         name: result.name.common,
//         flag: result.flags[0],
//         continent: result.continents[0],
//         capital: result.capital ? result.capital[0] : undefined,
//         subregion: result.subregion,
//         area: result.area,
//         population: result.population,
//       };
//     });
//   // console.log(countriesName);
//     return countriesName;
//   }
//   //   console.log(countriesName);
//   //   return countriesName;
//   // }

// app.get("/", async (req, res) => {
//   console.log(searchName('argentina'));
//   searchName('argentina').then(result=>res.send(result))
//   searchName('argentina').then(result=>console.log(result))
//   // const { name, orderName, orderPopulation } = req.query;
//   // try {
//   //   if (name) {
//   //     console.log('entre');
//   //     console.log(searchName(name));
//   //     return res.send(searchName(name));
//   //   }
//   //   // Country.findAll().then((result) => res.send(result));
//   // } catch (error) {
//   //   res.status(400).send(error);
//   // }
// });

// esta era para probar el filtro

app.get("/prueba", async (req, res) => {
  // const {country, name, difficulty, duration, season} = req.body
  const activity = await Activity.findAll({
    include: {
      model: Country,
      where: { id: "COL" },
      attributes: [],
    },
  });
  console.log(activity);
  res.send(activity);
});

// Payment.findAll({
//     where: {
//         DairyId: req.query.dairyid
//     },
//     attributes: {
//         exclude: ['createdAt', 'updatedAt']
//     },
//     include: {
//         model: Customer,
//         attributes:['customerName', 'phoneNumber']
//     }
// })

// app.get('/', async (req, res) => {
//   const activity = await Activity.findOne({
//     where: {ID: 3}
//   })
//   const country = await Country.findByPk('ARG')
//   console.log(activity.toJSON())
//   console.log(country.toJSON())
//   // console.log(activity.toJSON())
//   // console.log(country.toJSON())
//   var resultado = await country.addActivity(activity)
//   console.log(resultado);
//   res.send(resultado)
// })

// app.post('/', async (req, res) => {
//   // console.log('body', req.body);
// // const {countryID, name, difficulty, duration, season} = req.body;
// const activities = req.body;
// try {
// const activity = activities.map(async ({countryID, name, difficulty, duration, season}) => {
//   await Activity.create({
//   countryID,
//   name,
//   difficulty,
//   duration,
//   season,
// })
// });

// // console.log('tabla', activity.toJSON());
// // res.json(activity)
// res.send('soy crack activy')

// } catch (error) {
//   res.send(error);
// }
// // res.json(req.body);
// })
