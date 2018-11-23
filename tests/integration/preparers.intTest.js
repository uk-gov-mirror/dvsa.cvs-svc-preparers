/* global describe it context */
const supertest = require('supertest')
const expect = require('expect')

const url = 'http://localhost:3003/preparers'
const request = supertest(url)

describe('preparers', () => {
  context('GET', () => {
    context('all preparers', () => {
      it('should return all preparers', (done) => {
        request
          .get('/')
          .set('Context-Type', 'application/json')
          .set('authorization', 'allow')
          .expect(200)
          .expect('Content-Type', 'application/json; charset=utf-8')
          .end((err, res) => {
            if (err) throw err
            expect(res.body.length).toBeGreaterThan(0)
            done()
          })
      })
    })
  })
})
