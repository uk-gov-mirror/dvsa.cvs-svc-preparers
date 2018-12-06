
'use strict'
const fs = require('fs')
const PreparersDAOMock = require('../models/PreparersDAOMock')
const PreparersService = require('../services/PreparersService')
const path = require('path')

const getPreparers = () => {
  const preparersDAOMock = new PreparersDAOMock()
  preparersDAOMock.preparersRecordsMock = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/resources/mock-preparers.json')))
  preparersDAOMock.numberOfRecords = 29
  preparersDAOMock.numberOfScannedRecords = 29
  const preparersService = new PreparersService(preparersDAOMock)

  return preparersService.getPreparersList()
    .then((data) => {
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    })
    .catch((error) => {
      console.log(error)
      return {
        statusCode: error.statusCode,
        headers: error.headers,
        body: JSON.stringify(error.body)
      }
    })
}

module.exports = getPreparers
