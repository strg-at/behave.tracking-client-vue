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

    // merge static configuration with the provided websocket entry point
    const config = {
      ...configuration,
      ENTRYPOINT: options.webSocket
    }

    const dao = new TrackerWS(config)
    const clientStorage = new ClientStorage(config)
    const service = new TrackerService(dao, clientStorage, config)
    // eslint-disable-next-line no-unused-vars
    const tracker = new TrackerAPI(service, config)

    options = {
      ...defaultOptions,
      ...options
    }

    if (!router) {
      options.urlTracking = false
      options.referrerTracking = false
    }

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
