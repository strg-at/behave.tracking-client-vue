import { ContentEventProvider } from '../modules/EventProvider'
import { createScrollTracking } from '@strg-behave/tracking-client-plugins'

export function trackView (vm, contentId) {
  const eventProvider = new ContentEventProvider('view', contentId)

  const scrollTracking = createScrollTracking()
  const visibilityMeter = scrollTracking.visibility(vm.$el, {})
  scrollTracking.on('visibility', ({ value }) => eventProvider.push(value))

  vm.$once('hook:destroyed', () => visibilityMeter.unbind())
}
