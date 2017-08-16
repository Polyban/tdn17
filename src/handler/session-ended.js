import {
  SESSION_ENDED_UTTERANCE,
} from '../constants'
import { say } from '../alexa'

export default function sessionEndedHandler() {
  return {
    response: say(SESSION_ENDED_UTTERANCE).end(true).valueOf(),
    sessionAttributes: { STATE: '' }
  }
}
