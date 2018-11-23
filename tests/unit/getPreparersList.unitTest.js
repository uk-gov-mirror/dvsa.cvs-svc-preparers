/* global describe it */
const expect = require('expect')
const getPreparersList = require('../../src/services/getPreparersListService')
const HTTPResponseStatus = require('../../src/models/HTTPResponseStatus')

describe('getATFList', () => {
  it('Correct source path', () => {
    return getPreparersList(__dirname, '../../tests/resources/mock-preparers.json')
      .then((ATFs) => {
        expect(ATFs.length).toEqual(29)
      })
  })
  it('Wrong source path', () => {
    return getPreparersList(__dirname, '../../')
      .then(() => {
      }).catch((errorResponse) => {
        expect(errorResponse).toBeInstanceOf(HTTPResponseStatus)
      })
  })
})
