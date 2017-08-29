import {
  INTRO_PROMPT_UTTERANCE
} from '../constants'
import { wrapIn } from '../util'
import { say } from '../alexa'
import { information } from '../data.json'

export default function informationHandler() {
  const speechOutput = information.utterances
    .concat(INTRO_PROMPT_UTTERANCE)
    .map(wrapIn('p')).join('')
  const response = say(speechOutput)
    .reprompt(INTRO_PROMPT_UTTERANCE)
    .end(false)
    .valueOf()

  return {
    response
  }
}
