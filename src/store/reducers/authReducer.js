import * as actionTypes from '../actions/actionTypes';

const authReducer = (state={}, action) => {
    switch(action.type) {
        case actionTypes.LOG_IN:
            //console.log(action.data.user.uid)
            localStorage.setItem("uid", action.data.user.uid);
            state = {
                userId: action.data.user.uid,
            }
            return state;

        case actionTypes.LOG_IN_ERR:
            state = {
                err: action.data,
            }
            return state;

        case actionTypes.SIGN_OUT:
            localStorage.removeItem("uid")
            state = {
            }
        return state;

        case actionTypes.SIGN_UP:
            localStorage.setItem("uid", action.data.user.uid);
            state = {
                userId: action.data.user.uid,
                //display name
            }
        return state;

        case actionTypes.SIGN_UP_ERR:
            
            state = {
                err: action.data
            }
        return state;

        default: 
        state = {};
        const id = localStorage.getItem("uid");
            if(id) {
                state = {
                    userId: id
                }
            }
        return state
    }
}

export default authReducer;