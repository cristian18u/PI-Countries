const Express = require("express");
const { Country, Activity } = require("../db.js");
const axios = require("axios");
const app = Express();
const { Op } = require("sequelize");
const { firstLetterUpperCase } = require("../functions.js");

app.get("/", async (req, res, next) => {
  const { name } = req.query;
  console.log(req.query);
  try {
    if (name) {
      return Country.findAll({
        where: {
          name: {
            [Op.startsWith]: name.toLowerCase(),
          },
        },
      }).then((result) =>
        res.send(
          result.slice(0, 9).map((country) => {
            country.name = firstLetterUpperCase(country.name);
            return country;
          })
        )
      );
    }
    // return Country.findAll().then((result) =>
    //   res.send(
    //     result.slice(0, 10).map((country) => {
    //       country.name = firstLetterUpperCase(country.name);
    //       return country;
    //     })
    //   )
    // );
  } catch (error) {
    next(error);
  }
});
app.post("/", async (req, res, next) => {
  // const { name } = req.query;
  console.log(req.body);
  const init = req.body.page * 9 - 9;
  const end = init + 9;
  const { continent, activity, orderAlphabet, orderPopulation, name } =
    req.body;
  let order = false;
  if (orderAlphabet || orderPopulation) order = true;
  try {
    // if (req.body.sname) {
    //   console.log("entre", req.body.name);
    //   return Country.findAll({
    //     where: {
    //       name: {
    //         [Op.startsWith]: req.body.name.toLowerCase(),
    //         // [Op.startsWith]: "c",
    //       },
    //     },
    //   }).then((result) =>
    //     res.send({
    //       pageTotal: Math.ceil(result.length / 9),
    //       result: result.slice(init, end).map((country) => {
    //         country.name = firstLetterUpperCase(country.name);
    //         return country;
    //       }),
    //     })
    //   );
    // }
    // return Country.findAll({
    //   where: {
    //     if (continent) continent: "Africa",
    //   },
    // }).then((result) =>
    //   res.send({
    //     pageTotal: Math.ceil(result.length / 9),
    //     result: result.slice(init, end).map((country) => {
    //       country.name = firstLetterUpperCase(country.name);
    //       return country;
    //     }),
    //   })
    // );
    let result = [];
    if (continent && activity && order) {
      if (orderAlphabet && orderAlphabet === "az") {
        result = await Country.findAll({
          where: {
            continent,
          },
          include: {
            model: Activity,
            where: { activity },
            attributes: [],
          },
          order: ["name"],
        });
      } else if (orderAlphabet && orderAlphabet === "za") {
        result = await Country.findAll({
          where: {
            continent,
          },
          include: {
            model: Activity,
            where: { activity },
            attributes: [],
          },
          order: [["name", "DESC"]],
        });
      } else if (orderPopulation && orderPopulation === "asc") {
        result = await Country.findAll({
          where: {
            continent,
          },
          include: {
            model: Activity,
            where: { activity },
            attributes: [],
          },
          order: ["population"],
        });
      } else if (orderPopulation && orderPopulation === "desc") {
        result = await Country.findAll({
          where: {
            continent,
          },
          include: {
            model: Activity,
            where: { activity },
            attributes: [],
          },
          order: [["population", "DESC"]],
        });
      }
    } else if (continent && activity) {
      result = await Country.findAll({
        where: {
          continent,
        },
        include: {
          model: Activity,
          where: { activity },
          attributes: [],
        },
      });
    } else if (continent && order) {
      if (orderAlphabet && orderAlphabet === "az") {
        result = await Country.findAll({
          where: {
            continent,
          },
          order: ["name"],
        });
      } else if (orderAlphabet && orderAlphabet === "za") {
        result = await Country.findAll({
          where: {
            continent,
          },
          order: [["name", "DESC"]],
        });
      } else if (orderPopulation && orderPopulation === "asc") {
        result = await Country.findAll({
          where: {
            continent,
          },
          order: ["population"],
        });
      } else if (orderPopulation && orderPopulation === "desc") {
        result = await Country.findAll({
          where: {
            continent,
          },
          order: [["population", "DESC"]],
        });
      }
    } else if (continent) {
      result = await Country.findAll({
        where: {
          continent,
        },
      });
    } else if (activity && order) {
      if (orderAlphabet && orderAlphabet === "az") {
        result = await Country.findAll({
          where: {
            activity,
          },
          order: ["name"],
        });
      } else if (orderAlphabet && orderAlphabet === "za") {
        result = await Country.findAll({
          where: {
            activity,
          },
          order: [["name", "DESC"]],
        });
      } else if (orderPopulation && orderPopulation === "asc") {
        result = await Country.findAll({
          where: {
            activity,
          },
          order: ["population"],
        });
      } else if (orderPopulation && orderPopulation === "desc") {
        result = await Country.findAll({
          where: {
            activity,
          },
          order: [["population", "DESC"]],
        });
      }
    } else if (activity) {
      result = await Country.findAll({
        where: {
          activity,
        },
      });
    } else if (order) {
      if (orderAlphabet && orderAlphabet === "az") {
        result = await Country.findAll({
          order: ["name"],
        });
      } else if (orderAlphabet && orderAlphabet === "za") {
        result = await Country.findAll({
          order: [["name", "DESC"]],
        });
      } else if (orderPopulation && orderPopulation === "asc") {
        result = await Country.findAll({
          order: ["name"],
        });
      } else if (orderPopulation && orderPopulation === "desc") {
        result = await Country.findAll({
          order: [["name", "DESC"]],
        });
      }
    } else if (name) {
      console.log("entrename", name);
      result = await Country.findAll({
        where: {
          name: {
            [Op.startsWith]: name.toLowerCase(),
          },
        },
      });
    } else result = await Country.findAll();
    res.send({
      pageTotal: Math.ceil(result.length / 9),
      result: result.slice(init, end).map((country) => {
        country.name = firstLetterUpperCase(country.name);
        return country;
      }),
    });
  } catch (error) {
    next(error);
  }
});

app.get("/input", async (req, res, next) => {
  const { name } = req.query;
  // console.log(req.query);
  try {
    if (name) {
      return Country.findAll({
        where: {
          name: {
            [Op.startsWith]: name.toLowerCase(),
          },
        },
      }).then((result) =>
        res.send(
          result
            .slice(0, 5)
            .map((element) => firstLetterUpperCase(element.name))
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// app.get("/prueba", async (req, res, next) => {
//   // const { name } = req.query;
//   // console.log(req.query);
//   try {
//     // if (name) {
//     //   return Country.findAll({
//     //     where: {
//     //       name: {
//     //         [Op.startsWith]: name.toLowerCase(),
//     //       },
//     //     },
//     //   }).then((result) =>
//     //     res.send(
//     //       result
//     //         .slice(0, 5)
//     //         .map((element) => firstLetterUpperCase(element.name))
//     //     )
//     //   );
//     // }
//     Country.findAll({
//       where: {
//         continent: "Africa",
//       },
//     }).then((result) => res.send(result.slice(0, 10)));
//   } catch (error) {
//     next(error);
//   }
// });

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
    .then((result) => res.send(result.map((element) => element.continent)))
    .catch((error) => next(error));
});

app.get("/filterCountry", (req, res, next) => {
  const { name } = req.query;

  // function firstLetterUpperCase(sentence) {
  //   const word = sentence
  //     .toLowerCase()
  //     .split(" ")
  //     .map((word) => {
  //       return word[0].toUpperCase() + word.slice(1);
  //     });
  //   return word.join(" ");
  // }

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
      // eslint-disable-next-line eqeqeq, no-throw-literal
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
//   name: country.name.common.toLowerCase(),
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
