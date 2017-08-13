import { say, elicit, getSlot } from '../alexa'

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

  it('should build a response using elicit()', () => {
    const response = elicit('Test elicit utterance', 'SlotName')
    expect(response.valueOf()).toMatchSnapshot()
  })

  describe('util', () => {
    it('should getSlot', () => {
      const mockSlots = {
        Slot: {
          name: 'Slot',
          value: 'slotValue',
          resolutions: {
            resolutionsPerAuthority: [
              {
                status: { code: 'ER_SUCCESS_MATCH' },
                values: [{ value: { id: 'SLOT_ID' } }]
              }
            ]
          }
        }
      }
      const slot = getSlot(mockSlots, 'Slot')
      expect(slot).toMatchSnapshot()
      expect(getSlot(mockSlots, 'AnotherSlot')).toMatchSnapshot()
    })
  })
})
