import { introHandler, sessionEndedHandler } from '../'
import launchRequest from '../../__mock__/launch-request.json'
import sessionEndedRequest from '../../__mock__/session-ended-request.json'

describe('Request handler', () => {
  const mockSession = {}

  it('should run introHandler', () => {
    const response = introHandler(mockSession, launchRequest)
    expect(response).toMatchSnapshot()
  })

  it('should run sessionEndedHandler', () => {
    const response = sessionEndedHandler(mockSession, sessionEndedRequest)
    expect(response).toMatchSnapshot()
  })
})
