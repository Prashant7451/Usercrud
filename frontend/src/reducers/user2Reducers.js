import {
    user2_LIST_REQUEST,
    user2_LIST_SUCCESS,
    user2_LIST_FAIL,
    user2_CREATE_REQUEST,
    user2_CREATE_SUCCESS,
    user2_CREATE_FAIL,
    user2_UPDATE_FAIL,
    user2_UPDATE_REQUEST,
    user2_UPDATE_SUCCESS,
    user2_DELETE_FAIL,
    user2_DELETE_REQUEST,
    user2_DELETE_SUCCESS
} from "../constants/user2Constant.js";

export const user2ListReducer = (state = { user2s: [] }, action) => {
    switch (action.type) {

        case user2_LIST_REQUEST:
            return { loading: true }

        case user2_LIST_SUCCESS:
            return { loading: false, user2s: action.payload }

        case user2_LIST_FAIL:
            return { loading: true, error: action.payload }

        default:
            return state;
    }
}

export const user2CreateReducer = (state = { user2s: [] }, action) => {
    switch (action.type) {

        case user2_CREATE_REQUEST:
            return { loading: true }

        case user2_CREATE_SUCCESS:
            return { loading: false, success: true }

        case user2_CREATE_FAIL:
            return { loading: true, error: action.payload }

        default:
            return state;
    }
}

export const user2UpdateReducer = (state = {}, action) => {
    switch (action.type) {

        case user2_UPDATE_REQUEST:
            return { loading: true }

        case user2_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case user2_UPDATE_FAIL:
            return { loading: true, error: action.payload, success: false }

        default:
            return state;
    }
}

export const user2DeleteReducer = (state = {}, action) => {
    switch (action.type) {

        case user2_DELETE_REQUEST:
            return { loading: true }

        case user2_DELETE_SUCCESS:
            return { loading: false, success: true }

        case user2_DELETE_FAIL:
            return { loading: true, error: action.payload, success: false }

        default:
            return state;
    }
}