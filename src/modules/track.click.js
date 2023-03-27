export const setupClickTracking = (getPushEvent, options) => (vm, eventKey, eventValue, contentId) => {
  const pushEvent = getPushEvent(eventKey || options.eventKeyClick, contentId)

  const onClick = () => {
    pushEvent(eventValue)
    vm.$el.removeEventListener('click', onClick)
  }

  vm.$el.addEventListener('click', onClick)
  vm.$once('hook:destroyed', () => vm.$el.removeEventListener('click', onClick))
}
