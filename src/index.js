import { configuration, defaultOptions } from './config'
import {
  TrackerAPI,
  TrackerService,
  TrackerWS,
  ClientStorage
} from '@strg-behave/tracking-client-lib'
import {
  trackUrls,
  trackReferrers,
  trackScrolling,
  trackClicks,
  trackView
} from './trackers'

export default {
  install (Vue, { router, options }) {
    if (global.document.cookie.match(`${configuration.COOKIE_NAME}=1`)) {
      return
    }

    options = {
      ...defaultOptions,
      ...options
    }

    if (!router) {
      options.urlTracking = false
      options.referrerTracking = false
    }

    // start websocket connection
    connect(options.webSocket)

    // initialize navigation tracking
    options.urlTracking && trackUrls(router)
    options.referrerTracking && trackReferrers(router)

    // expose content tracking
    Vue.prototype.$behave = {
      trackScrolling,
      trackClicks,
      trackView
    }
  }
}

function connect (entryPoint) {
  if (!entryPoint) {
    return console.error('BeHave entry point not defined!')
  }

  const config = {
    ...configuration,
    ENTRYPOINT: entryPoint
  }

  const dao = new TrackerWS(config)
  const clientStorage = new ClientStorage(config)
  const service = new TrackerService(dao, clientStorage, config)
  return new TrackerAPI(service, config)
}
