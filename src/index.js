import { config as dotenv } from 'dotenv'
import {
  introHandler,
  sessionEndedHandler,
} from './handler'
import { handleRequest } from './alexa'

dotenv()

export function selectHandler(handlers, event) {
  const { session, request } = event

  if (session.new || request.type === 'LaunchRequest') {
    return handlers.introHandler
  }

  if (request.type === 'SessionEndedRequest') {
    return handlers.sessionEndedHandler
  }

  // if (request.type === 'IntentRequest') {

  // }

  // unhandled default
  return handlers.sessionEndedHandler
}

export function handler(event, context) {
  try {
    const response = handleRequest(
      {
        introHandler,
        sessionEndedHandler,
      },
      selectHandler
    )(event)
    context.succeed(response)
  } catch (err) {
    context.fail(err)
  }
}
