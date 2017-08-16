import {
  INTRO_UTTERANCE,
  INTRO_PROMPT_UTTERANCE,
  INTRO_CARD_TITLE,
  INTRO_CARD_TEXT,
  SESSION_ENDED_UTTERANCE
} from '../constants'
import { wrapIn } from '../util'
import { say } from '../alexa'

export default function introHandler(type = 'full') {
  const typedIntroHandler = ({ session }) => {
    // exit if we're at the top
    if (session.attributes.STATE === 'INTRO') {
      return {
        response: say(SESSION_ENDED_UTTERANCE).end(true).valueOf()
      }
    }

    const speechOutput = [
      INTRO_PROMPT_UTTERANCE,
    ]
    const repromptText = INTRO_PROMPT_UTTERANCE

    if (type === 'full') {
      speechOutput.unshift(INTRO_UTTERANCE)
    }

    let response = say(speechOutput.map(wrapIn('p')).join(''))
      .reprompt(repromptText)
      .end(false)

    if (type === 'full') {
      response = response.card(
        'Standard',
        INTRO_CARD_TITLE,
        INTRO_CARD_TEXT,
        'https://tdn17.s3-eu-west-1.amazonaws.com/card.1x.png',
        'https://tdn17.s3-eu-west-1.amazonaws.com/card.2x.png'
      )
    }

    return { response: response.valueOf() }
  }
  typedIntroHandler.displayName = `${type}IntroHandler`
  return typedIntroHandler
}
