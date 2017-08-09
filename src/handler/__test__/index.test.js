import { introHandler } from '../'
import launchRequest from '../../__mock__/launch-request.json'

describe('Request handler', () => {
  const mockSession = {}

  describe('introHandler', () => {
    it('should return the right response', () => {
      const response = introHandler(mockSession, launchRequest)
      expect(response).toMatchSnapshot()
    })
  })
})
