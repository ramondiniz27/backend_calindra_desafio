const distancesService = require('../services/distancesService')
const { getGeolocation, checkDistance } = distancesService
const _ = require('lodash')
const checkDistances = async (req, res, next) => {
  const { addresses } = req.body
  
  try {
    await getGeolocation(addresses)
    .then(async result => {
      await checkDistance(_.unionWith(result, _.uniqEqual)).then(res => {
        endereco = res
      })
      
    })
  } catch(e) {
    console.log(e.message)
    res.sendStatus(e.response.status) && next(error)
    res.send(e.message)
  }

  res.send(endereco)
}
module.exports = {
  checkDistances
}