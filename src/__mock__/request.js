import merge from 'deepmerge'

class Request {
  constructor() {
    this.props = {
      version: '1.0',
      session: {
        new: true
      },
      request: {
        type: 'LaunchRequest'
      }
    }
  }

  new(isNew) {
    this.props = merge(
      this.props,
      { session: { new: isNew } }
    )
    return this
  }

  intent(intentName) {
    this.props = merge(
      this.props,
      { request: { type: 'IntentRequest', intent: { name: intentName } } }
    )
    return this
  }

  slot(name, value, id) {
    let slotItem = {
      name
    }
    if (value && id) {
      slotItem = merge(
        slotItem,
        {
          value,
          resolutions: {
            resolutionsPerAuthority: [
              {
                status: { code: 'ER_SUCCESS_MATCH' },
                values: [{ value: { id } }]
              }
            ]
          }
        }
      )
    }
    this.props = merge(
      this.props,
      {
        request: {
          intent: {
            slots: {
              [name]: slotItem
            }
          }
        }
      }
    )
    return this
  }

  dialogState(dialogState) {
    this.props = merge(
      this.props,
      { request: { dialogState } }
    )
    return this
  }

  state(stateAttribute) {
    this.props = merge(
      this.props,
      { session: { attributes: { STATE: stateAttribute } } }
    )
    return this
  }

  invokeAsLambda(lambdaHandler, contextFactory) {
    return () => {
      const ctx = contextFactory()
      lambdaHandler(this.valueOf(), ctx)
      return ctx.Promise
    }
  }

  valueOf() {
    return this.props
  }
}

export function request() {
  return new Request()
}
