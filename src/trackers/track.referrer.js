import { EventProvider } from '../modules/EventProvider'

export function trackReferrers (router) {
  const eventProvider = new EventProvider('referrer')

  router.afterEach((to, from) => {
    const referrer = (from.path !== to.path) ? `${location.origin}${from.path}` : global.document.referrer
    eventProvider.push(referrer || null)
  })
}
