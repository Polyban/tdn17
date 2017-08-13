import context from 'aws-lambda-mock-context'
import { handler as lambda } from '../'
import launchRequest from '../__mock__/launch-request.json'
import informationRequest from '../__mock__/information-request.json'

describe('Alexa TDN', () => {
  it('should handle LaunchRequest', () => {
    const ctx = context()
    lambda(launchRequest, ctx)
    return ctx.Promise.then((response) => {
      expect(response).toMatchSnapshot()
    })
  })

  it('should invoke IntentRequest', () => {
    const ctx = context()
    lambda(informationRequest, ctx)
    return ctx.Promise.then((response) => {
      expect(response).toMatchSnapshot()
    })
  })
})
