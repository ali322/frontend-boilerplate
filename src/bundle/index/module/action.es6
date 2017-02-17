import axios from "axios"
import * as constants from "./constant.es6"

export function changeField(name, value) {
    return {
        type: constants.CHANGE_FIELD,
        name,
        value
    }
}

function requestRepo(param) {
    return {
        type: constants.REQUEST_REPO,
        param
    }
}

function responseRepo(param, res) {
    return {
        type: constants.RESPONSE_REPO,
        param,
        res
    }
}

function failResponse(err) {
    return {
        type: constants.FAIL_RESPONSE,
        err
    }
}

export function fetchRepo(param) {
    return dispatch => {
        dispatch(requestRepo(param))
        return axios.get(`https://api.github.com/events`).then(ret => {
            dispatch(responseRepo(param, ret.data))
        }).catch(err=>dispatch(failResponse(err)))
    }
}
