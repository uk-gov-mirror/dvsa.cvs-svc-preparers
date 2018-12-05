const fs = require('fs')
const HTTPResponseStatus = require('../models/HTTPResponseStatus')
const path = require('path')

const getPreparersList = (dirName, jsonPath) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(fs.readFileSync(path.resolve(dirName, jsonPath), 'utf8')))
    } catch (error) {
      reject(new HTTPResponseStatus(500, error.stack))
    }
  })
}

module.exports = getPreparersList