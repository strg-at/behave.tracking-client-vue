import { TrackerAPI, TrackerService, TrackerWS, ClientStorage } from '@strg/behave-tracking-client-lib'
import { setupVueTracking } from './modules'
import defaultOptions from './defaultOptions'

export default {
  install(Vue, { router, options }) {
    options = {
      ...defaultOptions,
      ...options,
      config: {
        ...defaultOptions.config,
        ...options.config,
      },
    }

    if (global.document.cookie.match(`${options.config.COOKIE_NAME}=1`)) {
      return
    }

    if (!router) {
      options.urlTracking = false
      options.referrerTracking = false
    }

    // start websocket connection
    const trackerAPI = connect(options)

    // closures for tracking methods
    const { trackUrls, trackReferrers, trackClicks, trackView, trackScrolling } = setupVueTracking(trackerAPI, options)

    // initialize navigation tracking
    options.urlTracking && trackUrls(router)
    options.referrerTracking && trackReferrers(router)

    // expose content tracking
    Vue.prototype.$behave = {
      trackerAPI,
      trackScrolling,
      trackClicks,
      trackView,
    }
  },
}

function connect(options) {
  const { config, debugMode } = options

  if (debugMode) {
    return {
      push(event) {
        console.log('STRG.BeHave', event)
      },
    }
  }

  if (!config.ENDPOINT) {
    return console.error('BeHave end point not defined!')
  }

  const dao = new TrackerWS(config)
  const clientStorage = new ClientStorage(config)
  const service = new TrackerService(dao, clientStorage, config)
  return new TrackerAPI(service, config)
}
