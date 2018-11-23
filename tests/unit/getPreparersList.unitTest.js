/* global describe it */
const expect = require('expect')
const getPreparersList = require('../../src/services/getPreparersListService')

describe('getPreparersList', () => {
  it('should return a populated list of preparers', () => {
    getPreparersList().then((preparers) => {
      expect(preparers.length).toBeGreaterThan(0)
    })
  })
})
