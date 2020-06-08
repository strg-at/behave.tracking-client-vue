export const setupReferrerTracking = (getPushEvent, options) => (router) => {
  const pushEvent = getPushEvent(options.eventKeyReferrer)

  router.afterEach((to, from) => {
    const referrer = (from.path !== to.path) ? `${location.origin}${from.path}` : global.document.referrer
    pushEvent(referrer || null)
  })
}
