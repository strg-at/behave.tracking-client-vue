import { EventProvider } from '../modules/EventProvider'

export function trackUrls (router) {
  const eventProvider = new EventProvider('url')

  router.afterEach(to => eventProvider.push(`${location.origin}${to.path}`))
}
