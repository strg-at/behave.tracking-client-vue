import { createScrollTracking } from '@strg-behave/tracking-client-plugins'

export const setupViewTracking = (getPushEvent, options) => (vm, contentId) => {
  const pushEvent = getPushEvent(options.eventKeyView, contentId)

  const scrollTracking = createScrollTracking()
  const visibilityMeter = scrollTracking.visibility(vm.$el, {})
  scrollTracking.on('visibility', ({ value }) => pushEvent(value))

  vm.$once('hook:destroyed', () => visibilityMeter.unbind())
}
