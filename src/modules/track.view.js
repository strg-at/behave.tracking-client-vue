import { createScrollTracking } from '@strg/behave-tracking-client-plugins'

export const setupViewTracking = (getPushEvent, options) => (vm, eventKey, eventValue, contentId) => {
  const pushEvent = getPushEvent(eventKey || options.eventKeyView, contentId)

  const scrollTracking = createScrollTracking()
  const visibilityMeter = scrollTracking.visibility(vm.$el, { eventValue })
  scrollTracking.on('visibility', ({ value }) => pushEvent(value))

  vm.$once('hook:destroyed', () => visibilityMeter.unbind())
}
