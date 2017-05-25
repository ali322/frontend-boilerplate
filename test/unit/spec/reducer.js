import test from "ava"

import eventReducer from "../../../src/bundle/index/module/reducer"
import * as constants from "../../../src/bundle/index/module/constant"

test("should handle RESPONSE_EVENTS", t => {
    let action = {
        type: constants.RESPONSE_EVENTS,
        payload: []
    }
    let nextState = eventReducer({ events: [] }, action)
    t.is(nextState.eventsFetched, true)
})
