import {
  INTRO_UTTERANCE,
  INTRO_PROMPT_UTTERANCE,
  INTRO_CARD_TITLE,
  INTRO_CARD_TEXT,
} from '../constants'
import { wrapIn, say } from '../util'

export default function introHandler() {
  const version = '1.0'
  const sessionAttributes = {}
  const speechOutput = [
    INTRO_UTTERANCE,
    INTRO_PROMPT_UTTERANCE,
  ].map(wrapIn('p')).join('')
  const repromptText = INTRO_PROMPT_UTTERANCE

  const response = say(speechOutput)
    .card(
      'Standard',
      INTRO_CARD_TITLE,
      INTRO_CARD_TEXT,
      'https://s3-eu-west-1.amazonaws.com/tdn17/01-home.2x.png',
      'https://s3-eu-west-1.amazonaws.com/tdn17/01-home.3x.png',
    )
    .reprompt(repromptText)
    .end(false)
    .valueOf()

  return {
    version,
    sessionAttributes,
    response,
  }
}
