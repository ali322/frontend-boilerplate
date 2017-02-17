import * as constants from './constant.es6'

function eventReducer(state = {}, action) {
    switch (action.type) {
        case constants.CHANGE_FIELD:
            const { name, value } = action;
            return Object.assign({}, state, {
                [name]: value
            });
        case constants.REQUEST_REPO:
            return Object.assign({}, state, {
                repoFetched: false,
                repoFetching: true
            });
        case constants.RESPONSE_REPO:
            const events = action.res;
            return Object.assign({}, state, {
                events,
                repoFetched: true,
                repoFetching: false
            })
        default:
            return state
    }
}

export default eventReducer
