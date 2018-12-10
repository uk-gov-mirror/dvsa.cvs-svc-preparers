
'use strict'
const fs = require('fs')
const PreparersDAOMock = require('../models/PreparersDAOMock')
const PreparersService = require('../services/PreparersService')
const path = require('path')

const getPreparers = () => {
  const preparersDAOMock = new PreparersDAOMock()
  preparersDAOMock.preparersRecordsMock = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../resources/mock-preparers.json')))
  preparersDAOMock.numberOfRecords = preparersDAOMock.preparersRecordsMock.length
  preparersDAOMock.numberOfScannedRecords = preparersDAOMock.preparersRecordsMock.length
  const preparersService = new PreparersService(preparersDAOMock)

  return preparersService.getPreparersList()
    .then((response) => {
      return {
        statusCode: response.statusCode,
        headers: response.headers,
        body: JSON.stringify(response.body)
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
