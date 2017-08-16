import {
  HELP_UTTERANCE,
  HELP_CARD_TITLE,
  HELP_CARD_CONTENT
} from '../constants'
import { say } from '../alexa'

export default function helpHandler() {
  return {
    response: say(HELP_UTTERANCE)
      .card(
        'Simple',
        HELP_CARD_TITLE,
        HELP_CARD_CONTENT
      )
      .end(false)
      .valueOf()
  }
}
