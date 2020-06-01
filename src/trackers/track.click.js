import { ContentEventProvider } from '../modules/EventProvider'

export function trackClicks (vm, contentId) {
  const eventProvider = new ContentEventProvider('click', contentId)

  const onClick = () => {
    eventProvider.push(1)
    vm.$el.removeEventListener('click', onClick)
  }

  vm.$el.addEventListener('click', onClick)
  vm.$once('hook:destroyed', () => vm.$el.removeEventListener('click', onClick))
}
