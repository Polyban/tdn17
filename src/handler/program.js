import createLogger from 'debug'
import {
  PROGRAM_INTRO_UTTERANCE,
  PROGRAM_DAY_PROMPT_UTTERANCE,
  PROGRAM_DAY_REPROMPT_UTTERANCE
} from '../constants'
import { wrapIn } from '../util'
import { elicit, getSlot } from '../alexa'
import { program } from '../data.json'

const debug = createLogger('alexa:GetProgram')

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
  const speechOutput = program[slot.id].utterances
    .concat(PROGRAM_DAY_PROMPT_UTTERANCE)
    .map(wrapIn('p')).join('')

  const { card: cardProps } = program[slot.id]

  return {
    response: elicit(speechOutput, 'Tag')
      .card(cardProps)
      .reprompt(PROGRAM_DAY_REPROMPT_UTTERANCE)
      .valueOf()
  }
}
