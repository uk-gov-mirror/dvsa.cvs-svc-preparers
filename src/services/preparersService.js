
'use strict'
const HTTPResponseStatus = require('../models/HTTPResponseStatus')

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
        if (data.Count === 0) { throw new HTTPResponseStatus(404, 'No resources match the search criteria.') }
        return data.Items
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500
          error.body = 'Internal Server Error'
        }

        throw new HTTPResponseStatus(error.statusCode, error.body)
      })
  }
}

module.exports = PreparersService
