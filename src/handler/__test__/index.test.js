import merge from 'deepmerge'
import {
  introHandler,
  sessionEndedHandler,
  informationHandler,
  programHandler
} from '../'
import launchRequest from '../../__mock__/launch-request.json'
import sessionEndedRequest from '../../__mock__/session-ended-request.json'
import informationRequest from '../../__mock__/information-request.json'
import programRequest from '../../__mock__/program-request.json'

describe('Request handler', () => {
  it('should run introHandler', () => {
    const response = introHandler('full')(launchRequest)
    expect(response).toMatchSnapshot()
  })

  it('should run sessionEndedHandler', () => {
    const response = sessionEndedHandler(sessionEndedRequest)
    expect(response).toMatchSnapshot()
  })

  it('should run informationHandler', () => {
    const response = informationHandler(informationRequest)
    expect(response).toMatchSnapshot()
  })

  it('should run programHandler', () => {
    const response = programHandler(programRequest)
    expect(response).toMatchSnapshot()
  })

  it('should run programHandler with filled slot', () => {
    const mockSlotBack = {
      name: 'Tag',
      value: 'freitag',
      resolutions: {
        resolutionsPerAuthority: [
          {
            status: { code: 'ER_SUCCESS_MATCH' },
            values: [{ value: { id: 'FRIDAY' } }]
          }
        ]
      }
    }
    const response = programHandler(
      merge(
        programRequest,
        { request: { intent: { slots: { Tag: mockSlotBack } } } }
      )
    )
    expect(response).toMatchSnapshot()
  })
})
