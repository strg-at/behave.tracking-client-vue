import { createScrollTracking } from '@strg/behave-tracking-client-plugins'

export const setupScrollTracking = (getPushEvent, options) => (vm, eventKey, contentId) => {
  const pushEvent = getPushEvent(eventKey || options.eventKeyScroll, contentId)

  const scrollTracking = createScrollTracking()
  const scrollMeter = scrollTracking.scrollDepth(vm.$el, {})
  scrollTracking.on('breakpoint', ({ value }) => pushEvent(value))

  vm.$once('hook:destroyed', () => scrollMeter.unbind())
}
