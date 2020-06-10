
export const setupUrlTracking = (getPushEvent, options) => (router) => {
  const pushEvent = getPushEvent(options.eventKeyUrl)

  router.afterEach(to => pushEvent(`${location.origin}${to.path}`))
}
