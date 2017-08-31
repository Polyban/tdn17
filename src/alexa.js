import createLogger from 'debug'
import merge from 'deepmerge'
import { wrapIn } from './util'

const debug = createLogger('alexa:sdk')

export function createRequestHandler(requestHandlers, selector) {
  return (event) => {
    const canonizedEvent = merge(
      {
        session: { attributes: {}, new: true },
        request: { type: 'LaunchRequest' }
      },
      event
    )
    const selectedHandler = selector(requestHandlers, canonizedEvent)

    let handlerName = '<Unknown handler name>'
    const match = /^function (\w+)/.exec(selectedHandler)
    if (match) {
      handlerName = match[0]
    } else if (selectedHandler.displayName) {
      handlerName = selectedHandler.displayName
    }

    debug(`Calling handler '${handlerName}'`)
    debug('Session: %s',
      JSON.stringify(
        { new: canonizedEvent.session.new, attributes: canonizedEvent.session.attributes }
      )
    )
    debug('Request: %s',
      JSON.stringify(
        {
          type: canonizedEvent.request.type,
          intent: canonizedEvent.request.intent,
          dialogState: canonizedEvent.request.dialogState
        }
      )
    )

    const result = selectedHandler(canonizedEvent)
    return typeof canonizedEvent.session.attributes.STATE !== 'undefined'
      ? merge(
        {
          sessionAttributes: {
            STATE: canonizedEvent.session.attributes.STATE
          }
        },
        result
      )
      : result
  }
}

function cardSimple(title, content) {
  return {
    type: 'Simple',
    title,
    content,
  }
}

function cardStandard(title, text, smallImageUrl, largeImageUrl) {
  return {
    type: 'Standard',
    title,
    text,
    image: {
      smallImageUrl,
      largeImageUrl,
    },
  }
}

function createUtterance(outputSpeech) {
  let type = 'PlainText'
  let output = Array.isArray(outputSpeech)
    ? outputSpeech.map(wrapIn('p')).join('')
    : outputSpeech
  if (/[<>]+/.exec(output)) {
    type = 'SSML'
    output = `<speak>${output}</speak>`
  }
  return {
    type,
    [type === 'PlainText' ? 'text' : 'ssml']: output,
  }
}

class AlexaResponse {
  constructor() {
    this.props = {
      outputSpeech: null,
      card: null,
      reprompt: {
        outputSpeech: null,
      },
      shouldEndSession: false,
      directives: []
    }
  }

  say(outputSpeech) {
    this.props.outputSpeech = createUtterance(outputSpeech)
    return this
  }

  reprompt(outputSpeech) {
    this.props.reprompt.outputSpeech = createUtterance(outputSpeech)
    return this
  }

  card(type = 'Simple', ...cardProps) {
    /* eslint prefer-rest-params: 0 */
    const cardObject = arguments[0]
    if (typeof cardObject === 'object') {
      // set card props directly
      this.props.card = cardObject
    } else {
      // use card creator function to create card from arguments
      this.props.card = {
        cardSimple,
        cardStandard,
      }[`card${type}`](...cardProps)
    }
    return this
  }

  end(shouldEndSession) {
    this.props.shouldEndSession = shouldEndSession
    return this
  }

  elicitSlot(slotToElicit) {
    this.props.directives = [
      {
        type: 'Dialog.ElicitSlot',
        slotToElicit
      }
    ]
    return this
  }

  valueOf() {
    const { outputSpeech, card, reprompt, shouldEndSession, directives } = this.props
    const response = {
      outputSpeech,
      shouldEndSession,
      directives
    }
    if (reprompt.outputSpeech !== null) {
      response.reprompt = reprompt
    }
    if (card !== null) {
      const cardProps = {
        ...card
      }
      /* eslint no-array-constructor: 0 */
      Array('content', 'text').forEach((key) => {
        if (cardProps[key] && Array.isArray(cardProps[key])) {
          cardProps[key] = cardProps[key].join('\n')
        }
      })
      response.card = cardProps
    }
    return response
  }
}

export function say(speechOutput) {
  return new AlexaResponse().say(speechOutput)
}

export function elicit(speechOutput, slotToElicit) {
  return new AlexaResponse().say(speechOutput).elicitSlot(slotToElicit)
}

function getCanonicalSlotResolution(slot) {
  if (!slot.resolutions || !slot.resolutions.resolutionsPerAuthority
    || !slot.resolutions.resolutionsPerAuthority.length) {
    return null
  }
  const resolution = slot.resolutions.resolutionsPerAuthority[0]
  if (resolution.status.code !== 'ER_SUCCESS_MATCH') {
    return null
  }
  return resolution.values[0].value
}

export function getSlot(slots, slotName) {
  if (!slots || !slots[slotName] || typeof slots[slotName].value === 'undefined') {
    return null
  }
  return getCanonicalSlotResolution(slots[slotName])
}

export function withState(handler, state) {
  return (...args) => {
    const result = handler(...args)
    return merge(
      result,
      { sessionAttributes: { STATE: state } }
    )
  }
}
