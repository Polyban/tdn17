import {
  SESSION_ENDED_UTTERANCE,
} from '../constants'
import { wrapIn } from '../util'
import { say } from '../alexa'

export default function sessionEndedHandler() {
  const version = '1.0'
  const sessionAttributes = {}
  const speechOutput = wrapIn('p')(SESSION_ENDED_UTTERANCE)

  const response = say(speechOutput).end(true).valueOf()

  return {
    version,
    sessionAttributes,
    response,
  }
}
