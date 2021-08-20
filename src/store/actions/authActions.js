import { db } from "../../firebase";
import * as actionTypes from '../actions/actionTypes';

export const signIn = creds => {
    return dispatch => {
        db
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password)
        .then((data) => {
            console.log(data);
            const user = {
                uid: data.user.uid,
                name: data.user.displayName
            }
            console.log(user)
            dispatch({type: actionTypes.LOG_IN, data: user})
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
        .then(data => {
            db.auth().currentUser.updateProfile({
                displayName: creds.name
            })
            const user = {
                uid: data.user.uid,
                name: creds.name
            }
            return user
        })
        .then(data => {
            return dispatch({type: actionTypes.SIGN_UP, data: data})
        })
        .catch(err => {
            return dispatch({type: actionTypes.SIGN_UP_ERR, data: err})
        })
    }
}