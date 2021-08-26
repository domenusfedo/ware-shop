import { db } from "../../firebase";
import * as actionTypes from '../actions/actionTypes';

export const addProduct = product => {
    return dispatch => {
        dispatch({type: actionTypes.ADD_PRODUCT, data: product})
    }
}

export const removeProduct = productId => {
    return dispatch => {
        dispatch({type: actionTypes.REMOVE_PRODUCT, data: productId})
    }
}

export const makeOrder = () => {
    //isSigneIn
    //send to [userId] collections
    //redirect to account
}