import {
  SESSION_ENDED_UTTERANCE,
} from '../constants'
import { wrapIn } from '../util'

export default function sessionEndedHandler() {
  const version = '1.0'
  const sessionAttributes = {}
  const speechOutput = wrapIn('p')(SESSION_ENDED_UTTERANCE)

  const response = {
    outputSpeech: {
      type: 'SSML',
      ssml: `<speak>${speechOutput}</speak>`,
    },
    shouldEndSession: true,
  }

  return {
    version,
    sessionAttributes,
    response,
  }
}
