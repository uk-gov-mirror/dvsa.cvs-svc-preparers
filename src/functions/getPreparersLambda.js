const getPreparersList = require('../services/getPreparersListService')

const getPreparers = async () => {
  return getPreparersList().then(
    (preparers) => {
      return {
        statusCode: 200,
        body: JSON.stringify(preparers)
      }
    }, (error) => {
      return {
        statusCode: error.statusCode,
        body: JSON.stringify(error.body)
      }
    })
}

module.exports = getPreparers
