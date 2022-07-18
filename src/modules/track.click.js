export const setupClickTracking = (getPushEvent, options) => (vm, eventKey, contentId) => {
  const pushEvent = getPushEvent(eventKey | options.eventKeyClick, contentId)

  const onClick = () => {
    pushEvent(1)
    vm.$el.removeEventListener('click', onClick)
  }

  vm.$el.addEventListener('click', onClick)
  vm.$once('hook:destroyed', () => vm.$el.removeEventListener('click', onClick))
}
