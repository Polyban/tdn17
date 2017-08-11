import createLogger from 'debug'
import {
  programDayUtterances,
  PROGRAM_INTRO_UTTERANCE,
  PROGRAM_DAY_PROMPT_UTTERANCE,
  PROGRAM_DAY_REPROMPT_UTTERANCE,
  INTRO_PROMPT_UTTERANCE
} from '../constants'
import { wrapIn, getCanonicalSlotResolution } from '../util'
import { say, elicit } from '../alexa'

const debug = createLogger('alexa:GetProgram')

export default function programHandler({ request }) {
  const { slots } = request.intent

  debug('slots=%o', slots)

  if (request.dialogState === 'STARTED') {
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

  let canonicalSlot
  let selectedSlotUtterance

  // figure out canonical slot
  if (slots && slots.Tag && slots.Tag.value) {
    canonicalSlot = getCanonicalSlotResolution(slots.Tag)
    selectedSlotUtterance = programDayUtterances[canonicalSlot.id]
  }

  // if any slot was filled, perform an intermediate step
  // if (!selectedSlotUtterance) {
  //   debug('Requested without canonical slot')
  //   // const slotToElicit = 'Tag'
  //   const speechOutput = [
  //     PROGRAM_INTRO_UTTERANCE,
  //     PROGRAM_DAY_PROMPT_UTTERANCE
  //   ].map(wrapIn('p')).join('')
  //   const repromptSpeech = wrapIn('p')(PROGRAM_DAY_REPROMPT_UTTERANCE)
  //   // return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech)
  //   response = elicit(speechOutput).reprompt(repromptSpeech).valueOf()
  // } else {
    debug('Requested canonicalSlot=%o', canonicalSlot)

    // build output and emit
    const speechOutput = selectedSlotUtterance
      .concat(INTRO_PROMPT_UTTERANCE)
      .map(wrapIn('p')).join('')

    return {
      response: say(speechOutput).valueOf()
    }
  // }

}
