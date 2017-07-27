import index from '../index'
import context from 'aws-lambda-mock-context'
import lauchRequest from '../__mock__/launch-request'
import getInformationRequest from '../__mock__/get-information-request'
import getProgramRequest from '../__mock__/get-program-request'
import merge from 'deepmerge'

process.env.APP_ID = lauchRequest.session.application.applicationId

describe('Alexa TDN17 lamdba', () => {
  it('should respond to a LaunchRequest', () => {
    const ctx = context()
    index.handler(lauchRequest, ctx)
    return ctx.Promise.then(({ response }) => {
      expect(response).toMatchSnapshot()
    })
  })

  it('should respond to GetInformation request', () => {
    const ctx = context()
    index.handler(getInformationRequest, ctx)
    return ctx.Promise.then(({ response }) => {
      expect(response).toMatchSnapshot()
    })
  })

  it('should respond to GetProgram request', () => {
    const ctx = context()
    index.handler(getProgramRequest, ctx)
    return ctx.Promise.then(({ response }) => {
      expect(response).toMatchSnapshot()
    })
  })

  it('should respond to GetProgram request with day parameter', () => {
    const ctx = context()
    index.handler(
      merge(getProgramRequest, {
        request: {
          intent: { slots: { Tag: { name: 'Tag', value: 'freitag' } } }
        }
      }),
      ctx
    )
    return ctx.Promise.then(({ response }) => {
      expect(response).toMatchSnapshot()
    })
  })
})