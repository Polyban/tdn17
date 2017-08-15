import {
  INFORMATION_MAIN_UTTERANCE,
  INTRO_PROMPT_UTTERANCE
} from '../constants'
import { wrapIn } from '../util'
import { say } from '../alexa'

export default function informationHandler() {
  const speechOutput = [
    INFORMATION_MAIN_UTTERANCE,
    INTRO_PROMPT_UTTERANCE
  ].map(wrapIn('p')).join('')
  const response = say(speechOutput)
    .reprompt(INTRO_PROMPT_UTTERANCE)
    .end(false)
    .valueOf()

  return {
    response
  }
}
