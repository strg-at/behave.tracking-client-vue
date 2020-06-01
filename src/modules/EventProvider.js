import { configuration } from '../config'

export class EventProvider {
  constructor (eventKey) {
    global[configuration.NAMESPACE] = global[configuration.NAMESPACE] || []
    this.eventKey = eventKey
  }

  getEventObject (eventValue) {
    return {
      key: this.eventKey,
      value: eventValue,
      time: Date.now()
    }
  }

  push (eventValue) {
    const eventObject = this.getEventObject(eventValue)
    global[configuration.NAMESPACE].push(eventObject)
  }
}

export class ContentEventProvider extends EventProvider {
  constructor (eventKey, contentId) {
    super(eventKey)
    this.contentId = contentId
  }

  getEventObject (eventValue) {
    return {
      key: this.eventKey,
      contentId: this.contentId,
      value: eventValue,
      time: Date.now()
    }
  }
}
