import { setupUrlTracking } from './track.url'
import { setupReferrerTracking } from './track.referrer'
import { setupClickTracking } from './track.click'
import { setupViewTracking } from './track.view'
import { setupScrollTracking } from './track.scroll'
import { crc32 } from '../utils/crc32'

export const setupVueTracking = (trackerAPI, options) => {
  const getPushEvent = (eventKey, contentId) => (eventValue) => {
    const event = {
      key: eventKey,
      value: eventValue,
      time: Date.now(),
    }
    if (contentId) {
      const contentIdKey = options.eventContentIdMode === 'crc32' ? 'crc' : 'contentId'
      const contentIdValue = options.eventContentIdMode === 'crc32' ? crc32(contentId) : contentId
      event[contentIdKey] = contentIdValue
    }
    return trackerAPI.push(event)
  }
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
    trackScrolling,
  }
}
