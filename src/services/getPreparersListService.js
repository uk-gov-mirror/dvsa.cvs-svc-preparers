const fs = require('fs')
const path = require('path')
const HttpResponseStatus = require('../models/HTTPResponseStatus')

const getPreparersList = () => {
  return new Promise((resolve, reject) => {
    const result = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../tests/resources/mock-preparers.json'), 'utf8'))
    if (result.length === 0) {
      reject(new HttpResponseStatus(404, 'Preparers not found'))
    } else {
      try {
        resolve(result)
      } catch (error) {
        reject(new HttpResponseStatus(500, error.stack))
      }
    }
  })
}

module.exports = getPreparersList
