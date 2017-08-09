import { config as dotenv } from 'dotenv'
import {
  introHandler,
  sessionEndedHandler,
} from './handler'

dotenv()

function handleRequest(event) {
  const { session, request } = event
  if (session.new) {
    // currentHandler = introHandler
  }

  if (session.new || request.type === 'LaunchRequest') {
    return introHandler(session, request)
  }

  if (request.type === 'SessionEndedRequest') {
    return sessionEndedHandler(session, request)
  }

  // if (request.type === 'IntentRequest') {

  // }

  // unhandled default
  return sessionEndedHandler(session, request)
}

export function handler(event, context) {
  try {
    const response = handleRequest(event)
    context.succeed(response)
  } catch (err) {
    context.fail(err)
  }
}
