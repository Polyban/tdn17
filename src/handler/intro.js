import {
  SESSION_ENDED_UTTERANCE
} from '../constants'
import { wrapIn } from '../util'
import { say } from '../alexa'
import { intro } from '../data.json'

export default function introHandler(type = 'full') {
  const typedIntroHandler = ({ session }) => {
    // exit if we're at the top
    if (session.attributes.STATE === 'INTRO') {
      return {
        response: say(SESSION_ENDED_UTTERANCE).end(true).valueOf()
      }
    }

    let speechOutput = [intro.reprompt]
    const repromptText = intro.reprompt

    if (type === 'full') {
      speechOutput = intro.utterances.concat(speechOutput)
    }

    let response = say(speechOutput.map(wrapIn('p')).join(''))
      .reprompt(repromptText)
      .end(false)

    if (type === 'full') {
      response = response.card(intro.card)
    }

    return { response: response.valueOf() }
  }
  typedIntroHandler.displayName = `${type}IntroHandler`
  return typedIntroHandler
}
