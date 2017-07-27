import launchRequest from './launch-request'

export default {
  ...launchRequest,
  request: {
    ...launchRequest.request,
    type: 'IntentRequest',
    intent: {
      name: 'GetInformation',
      slots: {}
    }
  }
}
