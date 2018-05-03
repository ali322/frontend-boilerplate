import { action, runInAction, observable } from 'mobx'
import * as service from './service'

class EventStore {
  @observable event = null
  @observable isFetched = false

  @action.bound
  async fetchDetail (params) {
    let event
    try {
      event = await service.event(params)
    } catch (err) {}
    runInAction(() => {
      this.event = event
      this.isFetched = true
    })
  }
}

export default new EventStore()
