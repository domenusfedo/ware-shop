import { db } from "../../firebase";
import * as actionTypes from '../actions/actionTypes';

export const signIn = creds => {
    return dispatch => {
        db
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password)
        .then((data) => {
            dispatch({type: actionTypes.LOG_IN, data: data})
        })
        .catch((err) => {
            dispatch({type: actionTypes.LOG_IN_ERR, data: err.message})
        })
    }
}

export const signOut = () => {
    return dispatch => {
        db
        .auth()
        .signOut()
        .then((data) => {
            dispatch({type: actionTypes.SIGN_OUT, data: data})
        })
    }
}

export const signUp = creds => {
    return dispatch => {
        db
        .auth()
        .createUserWithEmailAndPassword(creds.email, creds.password)
        .then(() => {
            db.auth().currentUser.updateProfile({
                displayName: creds.name
            })
        })
        .then(() => {
            return dispatch({type: actionTypes.SIGN_UP})
        })
        .catch(err => {
            return dispatch({type: actionTypes.SIGN_UP_ERR, data: err})
        })
    }
}