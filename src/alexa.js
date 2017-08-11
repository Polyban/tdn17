import createLogger from 'debug'

const debug = createLogger('alexa')

export function handleRequest(requestHandlers, selector) {
  return (event) => {
    const selectedHandler = selector(requestHandlers, event)

    debug(
      'Calling handler \'%s\'\n  Session: %o\n  Request: %o',
      /^function (\w+)/.exec(selectedHandler)[1],
      { new: event.session.new, attributes: event.session.attributes },
      { type: event.request.type, intent: event.request.intent }
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
      shouldEndSession: true,
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

  valueOf() {
    const { outputSpeech, card, reprompt, shouldEndSession } = this.props
    const response = {
      outputSpeech,
      shouldEndSession,
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

export function say(outputResponse) {
  return new AlexaResponse().say(outputResponse)
}
