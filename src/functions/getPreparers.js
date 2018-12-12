
'use strict'
const fs = require('fs')
const PreparersDAOMock = require('../models/PreparersDAOMock')
const PreparersService = require('../services/PreparersService')
const HTTPResponse = require('../models/HTTPResponse')
const path = require('path')

const getPreparers = () => {
  const preparersDAOMock = new PreparersDAOMock()
  preparersDAOMock.preparersRecordsMock = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../resources/mock-preparers.json')))
  preparersDAOMock.numberOfRecords = preparersDAOMock.preparersRecordsMock.length
  preparersDAOMock.numberOfScannedRecords = preparersDAOMock.preparersRecordsMock.length
  const preparersService = new PreparersService(preparersDAOMock)

  return preparersService.getPreparersList()
    .then((data) => {
      return new HTTPResponse(200, data)
    })
    .catch((error) => {
      return new HTTPResponse(error.statusCode, error.body)
    })
}

module.exports = getPreparers
