import { db } from "../../firebase";
import * as actionTypes from '../actions/actionTypes';

export const addProduct = product => {
    return dispatch => {
        dispatch({type: actionTypes.ADD_PRODUCT, data: product})
    }
}

export const removeProduct = (productId, name, quantity, price) => {
    const data = {
        id: productId,
        name: name,
        quantity: quantity,
        price: price
    }
    return dispatch => {
        dispatch({type: actionTypes.REMOVE_PRODUCT, data: data})
    }
}

export const changeValue = productId => {
    return dispatch => {
        
    }
}

export const makeOrder = (id, obj) => {
    const orderNumber = Math.floor(Math.random() * 9000 + 1);
    return dispatch => {
        db.firestore().collection('orders').doc(id).update({
            [orderNumber]: obj
        });
        dispatch({type: actionTypes.ORDER_FINISHED})
    }
    //isSigneIn
    //send to [userId] collections
    //redirect to account
    //will create an object with all details such as payment method, delievery
}