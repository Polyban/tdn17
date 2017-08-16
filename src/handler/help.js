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
        'Standard',
        HELP_CARD_TITLE,
        HELP_CARD_CONTENT,
        'https://tdn17.s3-eu-west-1.amazonaws.com/card-help.1x.png',
        'https://tdn17.s3-eu-west-1.amazonaws.com/card-help.2x.png'
      )
      .end(false)
      .valueOf()
  }
}
