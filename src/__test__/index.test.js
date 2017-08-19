import context from 'aws-lambda-mock-context'
import merge from 'deepmerge'
import { handler as lambda } from '../'
import launchRequest from '../__mock__/launch-request.json'
import informationRequest from '../__mock__/information-request.json'
import helpRequest from '../__mock__/help-request.json'
import cancelRequest from '../__mock__/cancel-request.json'
import { request } from '../__mock__/request'

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

  it('should flow into Information and back', () => {
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

  it('should invoke help intent', () => {
    const ctx = context()
    lambda(helpRequest, ctx)
    return ctx.Promise.then((response) => {
      expect(response).toMatchSnapshot()
    })
  })

  it('should exit when canceled from intro', () => {
    const stepOne = () => {
      const ctx = context()
      lambda(launchRequest, ctx)
      return ctx.Promise
    }
    const stepTwo = () => {
      const ctx = context()
      lambda(
        merge(
          cancelRequest,
          { session: { attributes: { STATE: 'INTRO' } } }
        ),
        ctx
      )
      return ctx.Promise
    }
    stepOne().then(stepTwo).then((response) => {
      expect(response).toMatchSnapshot()
    })
  })

  it('should not exit when canceled from intro', () => {
    const stepOne = () => {
      const ctx = context()
      lambda(informationRequest, ctx)
      return ctx.Promise
    }
    const stepTwo = () => {
      const ctx = context()
      lambda(
        merge(
          cancelRequest,
          { session: { attributes: { STATE: 'INFORMATION' } } }
        ),
        ctx
      )
      return ctx.Promise
    }
    stepOne().then(stepTwo).then((response) => {
      expect(response).toMatchSnapshot()
    })
  })

  it('should handle dialog in and out program', () => {
    const stepOne = request()
      .invokeAsLambda(lambda, context)
    const stepTwo = request()
      .new(false)
      .state('INTRO')
      .intent('GetProgram')
      .slot('Tag')
      .dialogState('STARTED')
      .invokeAsLambda(lambda, context)
    const stepThree = request()
      .new(false)
      .state('PROGRAM')
      .intent('GetProgram')
      .slot('Tag', 'sonntag', 'SUNDAY')
      .dialogState('IN_PROGRESS')
      .invokeAsLambda(lambda, context)
    const stepFour = request()
      .new(false)
      .state('PROGRAM')
      .intent('GetProgram')
      .slot('Tag', 'freitag', 'FRIDAY')
      .dialogState('IN_PROGRESS')
      .invokeAsLambda(lambda, context)
    const stepFive = request()
      .new(false)
      .state('PROGRAM')
      .intent('GetProgram')
      .slot('Tag', 'samstag', 'SATURDAY')
      .dialogState('IN_PROGRESS')
      .invokeAsLambda(lambda, context)
    const stepSix = request()
      .new(false)
      .state('PROGRAM')
      .intent('AMAZON.CancelIntent')
      .dialogState('STARTED')
      .invokeAsLambda(lambda, context)
    const stepSeven = request()
      .new(false)
      .state('INTRO')
      .intent('AMAZON.CancelIntent')
      .dialogState('STARTED')
      .invokeAsLambda(lambda, context)

    stepOne()
      .then(response => expect(response).toMatchSnapshot())
      .then(stepTwo)
      .then(response => expect(response).toMatchSnapshot())
      .then(stepThree)
      .then(response => expect(response).toMatchSnapshot())
      .then(stepFour)
      .then(response => expect(response).toMatchSnapshot())
      .then(stepFive)
      .then(response => expect(response).toMatchSnapshot())
      .then(stepSix)
      .then(response => expect(response).toMatchSnapshot())
      .then(stepSeven)
      .then(response => expect(response).toMatchSnapshot())
  })
})
