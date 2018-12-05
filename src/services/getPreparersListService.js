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

// const fs = require('fs')
// const path = require('path')
// const HttpResponseStatus = require('../models/HTTPResponseStatus')

// const getPreparersList = (dirName, jsonPath) => {
//   return new Promise((resolve, reject) => {
//     const result = JSON.parse(fs.readFileSync(path.resolve(dirName, jsonPath), 'utf8'))
//     if (result.length === 0) {
//       reject(new HttpResponseStatus(404, 'Preparers not found'))
//     } else {
//       try {
//         resolve(result)
//       } catch (error) {
//         reject(new HttpResponseStatus(500, error.stack))
//       }
//     }
//   })
// }

// module.exports = getPreparersList
