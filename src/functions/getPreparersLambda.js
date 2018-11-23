const getPreparersList = require('../services/getPreparersListService')

const getPreparers = async () => {
  return getPreparersList(__dirname, '../../tests/resources/mock-preparers.json')
    .then((preparers) => {
      return {
        statusCode: 200,
        body: JSON.stringify(preparers)
      }
    })
    .catch((error) => {
      return {
        statusCode: error.statusCode,
        body: JSON.stringify(error.body)
      }
    })
}

module.exports = getPreparers
