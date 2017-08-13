import {
  INFORMATION_MAIN_UTTERANCE,
  INFORMATION_CARD_TITLE,
  INFORMATION_CARD_CONTENT
} from '../constants'
import { say } from '../alexa'

export default function informationHandler() {
  const sessionAttributes = {}
  const response = say(INFORMATION_MAIN_UTTERANCE)
    .card(
      'Simple',
      INFORMATION_CARD_TITLE,
      INFORMATION_CARD_CONTENT
    )
    .end(false)
    .valueOf()

  return {
    sessionAttributes,
    response
  }
}
