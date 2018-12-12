
'use strict'
const HTTPError = require('../models/HTTPError')

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
          throw new HTTPError(404, 'No resources match the search criteria.')
        }

        return data.Items
      })
      .catch((error) => {
        if (!(error instanceof HTTPError)) {
          console.log(error)
          error.statusCode = 500
          error.body = 'Internal Server Error'
        }

        throw new HTTPError(error.statusCode, error.body)
      })
  }
}

module.exports = PreparersService
