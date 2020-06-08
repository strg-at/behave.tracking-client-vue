import { setupUrlTracking } from './track.url'
import { setupReferrerTracking } from './track.referrer'
import { setupClickTracking } from './track.click'
import { setupViewTracking } from './track.view'
import { setupScrollTracking } from './track.scroll'

export const setupVueTracking = (trackerAPI, options) => {
  const getPushEvent = (eventKey, contentId) => (eventValue) =>
    trackerAPI.push({
      key: eventKey,
      value: eventValue,
      contentId: contentId,
      time: Date.now()
    })

  const trackUrls = setupUrlTracking(getPushEvent, options)
  const trackReferrers = setupReferrerTracking(getPushEvent, options)
  const trackClicks = setupClickTracking(getPushEvent, options)
  const trackView = setupViewTracking(getPushEvent, options)
  const trackScrolling = setupScrollTracking(getPushEvent, options)

  return {
    trackUrls,
    trackReferrers,
    trackClicks,
    trackView,
    trackScrolling
  }
}
