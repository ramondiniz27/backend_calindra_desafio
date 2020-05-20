'use-strict'
const { Client, Status } = require('@googlemaps/google-maps-services-js')
const axios = require('axios').default
const axiosInstance = axios.create();
const client = new Client({ axiosInstance })
const _ = require('lodash')
require('dotenv/config');
let myaddress = []
let finalAddress = []
let addressDistances = []

const getGeolocation = async (addresses) => {
  myaddress = []
   await addresses.forEach( async address => {
    let i = 0
    await client.geocode({
      params:{
        address: address,
        key: process.env.GOOGLE_MAPS_KEY
      },
      timeout: 3000
    }).then((res) => {
      if (res.data.status === Status.OK) {
        locale = res.data.results[i].geometry.location;
        myaddress.push(locale)
        i+=1
      } else {
        console.log(r.data.error_message);
      }
    }).then(() => {
      finalAddress = myaddress
      return finalAddress
    })
    .catch((e) => {
      console.log(e);
    });
  })

    return finalAddress
}

const checkDistance = async (locales) => {
  await client.distancematrix({
    params: {
      origins:locales,
      destinations: _.reverse(_.clone(locales)),
      key:process.env.GOOGLE_MAPS_KEY
    },
    timeout: 3000
  }).then(results => {
    let distances = []
    let i = 0
    results.data.origin_addresses.forEach(add => {
      origem = add
      destino = results.data.destination_addresses[i]
      distancia = results.data.rows[i].elements[i].distance.text
      tempoViagem = results.data.rows[i].elements[i].duration.text
      distances.push({ origem,destino,distancia,tempoViagem })
      addressDistances = distances
      i+=1

      return addressDistances
    })
  })

  return addressDistances
}

module.exports = {
  getGeolocation,
  checkDistance
}
