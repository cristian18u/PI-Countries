const { Router } = require('express');
// Importar todos los routers;
const countriesRouter = require('./countries.js');
const activityRouter = require('./activity.js')

const router = Router();

// Configurar los routers
router.get('/', (req, res) => {
  res.send('soy el mejor')
})

router.use('/countries', countriesRouter);

router.use('/activity', activityRouter);

module.exports = router;
