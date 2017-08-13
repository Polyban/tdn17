import createLogger from 'debug'

const debug = createLogger('alexa:sdk')

export function createRequestHandler(requestHandlers, selector) {
  return (event) => {
    const selectedHandler = selector(requestHandlers, event)

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
        { new: event.session.new, attributes: event.session.attributes }
      )
    )
    debug('Request: %s',
      JSON.stringify(
        {
          type: event.request.type,
          intent: event.request.intent,
          dialogState: event.request.dialogState
        }
      )
    )

    return selectedHandler(event)
  }
}

function cardSimple(title, content) {
  return {
    type: 'Standard',
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
  let output = outputSpeech
  if (/[<>]+/.exec(outputSpeech)) {
    type = 'SSML'
    output = `<speak>${outputSpeech}</speak>`
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
    this.props.card = {
      cardSimple,
      cardStandard,
    }[`card${type}`](...cardProps)
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
      response.card = card
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
