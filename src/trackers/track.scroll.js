import { ContentEventProvider } from '../modules/EventProvider'
import { createScrollTracking } from '@strg-behave/tracking-client-plugins'

export function trackScrolling (vm, contentId) {
  const eventProvider = new ContentEventProvider('scroll', contentId)

  const scrollTracking = createScrollTracking()
  const scrollMeter = scrollTracking.scrollDepth(vm.$el, {})
  scrollTracking.on('breakpoint', ({ value }) => eventProvider.push(value))

  vm.$once('hook:destroyed', () => scrollMeter.unbind())
}
