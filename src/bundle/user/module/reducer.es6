import * as constants from './constant.es6'

function userReducer(state = {}, action) {
    switch (action.type) {
        case constants.REQUEST_USER:
            return {
                ...state,
                userFetching: true
            }
        case constants.RESPONSE_USER:
            return {
                ...state,
                userFetching: false,
                userFetched: true,
                user: action.payload
            }
        default:
            return state
    }
}

export default userReducer
