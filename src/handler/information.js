import { say } from '../alexa'
import { information } from '../data.json'

export default function informationHandler() {
  const speechOutput = information.utterances
    .concat(information.reprompt)
  const response = say(speechOutput)
    .reprompt(information.reprompt)
    .card(information.card)
    .end(false)
    .valueOf()

  return {
    response
  }
}
