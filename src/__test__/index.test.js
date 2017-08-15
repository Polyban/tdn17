import context from 'aws-lambda-mock-context'
import merge from 'deepmerge'
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

  it('should invoke IntentRequest on new session', () => {
    const ctx = context()
    lambda(
      merge(
        informationRequest,
        { session: { new: true } }
      ),
      ctx
    )
    return ctx.Promise.then((response) => {
      expect(response).toMatchSnapshot()
    })
  })

  it.only('should flow into Information and back', () => {
    const stepOne = () => {
      const ctx = context()
      lambda(launchRequest, ctx)
      return ctx.Promise
    }
    const stepTwo = () => {
      const ctx = context()
      lambda(informationRequest, ctx)
      return ctx.Promise
    }
    stepOne().then(stepTwo).then((response) => {
      expect(response).toMatchSnapshot()
    })
  })
})
