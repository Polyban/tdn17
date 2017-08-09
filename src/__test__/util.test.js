// import interactionModel from '../interaction-model.json'
import { getCanonicalSlotResolution } from '../util'

describe('util', () => {
  it('should getCanonicalSlotResolution', () => {
    const mockSlot = {
      name: 'Tag',
      value: 'freitag',
      resolutions: {
        resolutionsPerAuthority: [
          { values: [{ value: { id: 'FRIDAY' } }] }
        ]
      }
    }
    const slot = getCanonicalSlotResolution(mockSlot)
    expect(slot).toMatchSnapshot()
    expect(getCanonicalSlotResolution({})).toMatchSnapshot()
  })
})
