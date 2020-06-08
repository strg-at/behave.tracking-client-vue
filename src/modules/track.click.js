export const setupClickTracking = (getPushEvent, options) => (vm, contentId) => {
  const pushEvent = getPushEvent(options.eventKeyClick, contentId)

  const onClick = () => {
    pushEvent(1)
    vm.$el.removeEventListener('click', onClick)
  }

  vm.$el.addEventListener('click', onClick)
  vm.$once('hook:destroyed', () => vm.$el.removeEventListener('click', onClick))
}
