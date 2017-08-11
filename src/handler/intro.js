import {
  INTRO_UTTERANCE,
  INTRO_PROMPT_UTTERANCE,
  INTRO_CARD_TITLE,
  INTRO_CARD_TEXT,
} from '../constants'
import { wrapIn } from '../util'
import { say } from '../alexa'

export default function introHandler(type = 'full') {
  const typedIntroHandler = () => {
    const speechOutput = [
      INTRO_PROMPT_UTTERANCE,
    ]
    if (type === 'full') {
      speechOutput.unshift(INTRO_UTTERANCE)
    }
    const repromptText = INTRO_PROMPT_UTTERANCE

    return {
      response: say(speechOutput.map(wrapIn('p')).join(''))
        .card(
          'Standard',
          INTRO_CARD_TITLE,
          INTRO_CARD_TEXT,
          'https://s3-eu-west-1.amazonaws.com/tdn17/01-home.2x.png',
          'https://s3-eu-west-1.amazonaws.com/tdn17/01-home.3x.png'
        )
        .reprompt(repromptText)
        .end(false)
        .valueOf()
    }
  }
  typedIntroHandler.displayName = `${type}IntroHandler`
  return typedIntroHandler
}
