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
import axios from 'axios';

export const listuser2s = () => async (dispatch, getState) => {

    try {
        dispatch({ type: user2_LIST_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.get("/api/notes", config);

        dispatch({ type: user2_LIST_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: user2_LIST_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}

export const createuser2s = (title, content, category ) => async (dispatch, getState) => {

    try {
        dispatch({ type: user2_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.post("/api/notes/create", { title, content, category }, config);

        dispatch({ type: user2_CREATE_SUCCESS, payload: data });

    } catch (error) {

        dispatch({ type: user2_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}

export const updateuser2s = (id, title, content, category) => async (dispatch, getState) => {

    try {
        dispatch({ type: user2_UPDATE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.put(`/api/notes/${id}`, { title, content, category }, config);

        dispatch({ type: user2_UPDATE_SUCCESS, payload: data });

    } catch (error) {

        dispatch({ type: user2_UPDATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}

export const deleteuser2 = (id) => async (dispatch, getState) => {

    try {
        dispatch({ type: user2_DELETE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const { data } = await axios.delete(`/api/notes/${id}`, config);

        dispatch({ type: user2_DELETE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: user2_DELETE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}