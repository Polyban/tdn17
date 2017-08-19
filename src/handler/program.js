import createLogger from 'debug'
import {
  PROGRAM_INTRO_UTTERANCE,
  PROGRAM_DAY_PROMPT_UTTERANCE,
  PROGRAM_DAY_REPROMPT_UTTERANCE,
  PROGRAM_DAY_INTRO_UTTERANCE_FRIDAY,
  PROGRAM_DAY_INTRO_UTTERANCE_SATURDAY,
  PROGRAM_DAY_INTRO_UTTERANCE_SUNDAY
} from '../constants'
import { wrapIn } from '../util'
import { elicit, getSlot } from '../alexa'
import { PROGRAM_CARD_FRIDAY, PROGRAM_CARD_SATURDAY, PROGRAM_CARD_SUNDAY } from './cards'

const debug = createLogger('alexa:GetProgram')

const daySpecificUtterances = {
  FRIDAY: PROGRAM_DAY_INTRO_UTTERANCE_FRIDAY,
  SATURDAY: PROGRAM_DAY_INTRO_UTTERANCE_SATURDAY,
  SUNDAY: PROGRAM_DAY_INTRO_UTTERANCE_SUNDAY
}

const daySpecificCards = {
  PROGRAM_CARD_FRIDAY,
  PROGRAM_CARD_SATURDAY,
  PROGRAM_CARD_SUNDAY
}

export default function programHandler({ request }) {
  const { slots } = request.intent
  const slot = getSlot(slots, 'Tag')

  debug('slots=%o', slots)
  debug('slots.Tag: %s', JSON.stringify(slot))

  if (!slot && request.dialogState === 'STARTED') {
    const speechOutput = [
      PROGRAM_INTRO_UTTERANCE,
      PROGRAM_DAY_PROMPT_UTTERANCE
    ].map(wrapIn('p')).join('')
    return {
      response: elicit(speechOutput, 'Tag')
        .reprompt(PROGRAM_DAY_REPROMPT_UTTERANCE)
        .valueOf()
    }
  }

  if (!slot) {
    return {
      response: elicit(PROGRAM_DAY_PROMPT_UTTERANCE, 'Tag')
        .reprompt(PROGRAM_DAY_PROMPT_UTTERANCE)
        .valueOf()
    }
  }

  debug('Requested canonicalSlot=%o', slot)

  // build output and emit
  const speechOutput = daySpecificUtterances[slot.id]
    .concat(PROGRAM_DAY_PROMPT_UTTERANCE)
    .map(wrapIn('p')).join('')

  const cardProps = daySpecificCards[`PROGRAM_CARD_${slot.id}`]

  return {
    response: elicit(speechOutput, 'Tag')
      .card(cardProps)
      .reprompt(PROGRAM_DAY_REPROMPT_UTTERANCE)
      .valueOf()
  }
}
