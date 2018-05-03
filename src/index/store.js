import { action, runInAction, observable } from 'mobx'
import * as service from './service'

class EventsStore {
  @observable events = []
  @observable isFetched = false

  @action.bound
  async fetchEvents () {
    let events
    try {
      events = await service.events()
    } catch (err) {}
    runInAction(() => {
      this.events = events
      this.isFetched = true
    })
  }
}

export default new EventsStore()
