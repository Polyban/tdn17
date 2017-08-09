import {
  INTRO_UTTERANCE,
  INTRO_PROMPT_UTTERANCE,
  INTRO_CARD_TITLE,
  INTRO_CARD_CONTENT,
} from '../constants'
import { wrapIn } from '../util'

export default function introHandler() {
  const version = '1.0'
  const sessionAttributes = {}
  const speechOutput = [
    INTRO_UTTERANCE,
    INTRO_PROMPT_UTTERANCE,
  ].map(wrapIn('p')).join('')
  const repromptText = INTRO_PROMPT_UTTERANCE

  const response = {
    outputSpeech: {
      type: 'SSML',
      ssml: `<speak>${speechOutput}</speak>`,
    },
    card: {
      type: 'Simple',
      title: INTRO_CARD_TITLE,
      content: INTRO_CARD_CONTENT,
    },
    reprompt: {
      outputSpeech: {
        type: 'SSML',
        ssml: `<speak>${repromptText}</speak>`,
      },
    },
    shouldEndSession: false,
  }

  return {
    version,
    sessionAttributes,
    response,
  }
}
