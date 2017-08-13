import { say } from '../alexa'

describe('Alexa', () => {
  it('should build a response using say()', () => {
    const response = say('Test utterance')
    expect(response.valueOf()).toMatchSnapshot()
  })

  it('should build a response using say() in SSML', () => {
    const response = say('<p>Test utterance</p>')
    expect(response.valueOf()).toMatchSnapshot()
  })

  it('should reprompt()', () => {
    const response = say('Test utterance').reprompt('<p>Reprompt utterance</p>')
    expect(response.valueOf()).toMatchSnapshot()
  })

  it('should add Simple card()', () => {
    const response = say('Test utterance')
      .card('Simple', 'Card title', 'Card content')
    expect(response.valueOf()).toMatchSnapshot()
  })

  it('should add Standard card()', () => {
    const response = say('Test utterance')
      .card(
        'Standard',
        'Card title',
        'Card text',
        'http://small-image-url',
        'http://large-image-url'
      )
    expect(response.valueOf()).toMatchSnapshot()
  })

  it('should build a response using end()', () => {
    const response = say('Test utterance').end(false)
    expect(response.valueOf()).toMatchSnapshot()
  })
})
