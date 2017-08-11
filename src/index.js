import { config as dotenv } from 'dotenv'
import createLogger from 'debug'
import {
  introHandler,
  sessionEndedHandler,
  informationHandler,
  programHandler
} from './handler'
import { createRequestHandler } from './alexa'

dotenv()
const debug = createLogger('alexa:index')

export function selectHandler(handlers, event) {
  const { session, request } = event

  if (session.new || request.type === 'LaunchRequest') {
    return handlers.LaunchRequest
  }

  if (request.type === 'SessionEndedRequest') {
    return handlers.SessionEndedRequest
  }

  if (request.type === 'IntentRequest') {
    if (!handlers[request.intent.name]) {
      throw new Error(`Could not find a handler for intent '${request.intent.name}'`)
    }
    return handlers[request.intent.name]
  }

  // unhandled default
  return handlers.sessionEndedHandler
}

const requestHandler = createRequestHandler(
  {
    LaunchRequest: introHandler('full'),
    SessionEndedRequest: sessionEndedHandler,
    GetInformation: informationHandler,
    GetProgram: programHandler,
    'AMAZON.StopIntent': sessionEndedHandler,
    'AMAZON.CancelIntent': introHandler('short')
  },
  selectHandler
)

export function handler(event, context) {
  try {
    const response = {
      version: '1.0',
      sessionAttributes: {},
      ...requestHandler(event)
    }

    debug('Response: %s', JSON.stringify(response))

    context.succeed(response)
  } catch (err) {
    context.fail(err)
  }
}
