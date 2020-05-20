const express  = require('express')
const distancesController = require('../../controllers/distancesController')

const router = express.Router()

router.post('/distancias', distancesController.checkDistances)

module.exports = router