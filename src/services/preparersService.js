
'use strict'
const HTTPErrorResponse = require('../models/HTTPErrorResponse')
const HTTPStatusResponse = require('../models/HTTPStatusResponse')

/**
 * Fetches the entire list of preparers from the database.
 * @returns Promise
 */
class PreparersService {
  constructor (preparersDAO) {
    this.preparersDAO = preparersDAO
  }

  getPreparersList () {
    return this.preparersDAO.getAll()
      .then(data => {
        if (data.Count === 0) {
          throw new HTTPErrorResponse(404, 'No resources match the search criteria.')
        }

        return new HTTPStatusResponse(200, data.Items)
      })
      .catch((error) => {
        console.log(error)
        if (!error.statusCode) {
          error.statusCode = 500
          error.body = 'Internal Server Error'
        }

        throw new HTTPErrorResponse(error.statusCode, error.body)
      })
  }
}

module.exports = PreparersService
