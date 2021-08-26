import * as actionTypes from '../actions/actionTypes';

const authReducer = (state={}, action) => {
    switch(action.type) {
        case actionTypes.LOG_IN:
            //console.log(action.data.user.uid)
            localStorage.setItem("uid", action.data.uid);
            localStorage.setItem("name",action.data.name);
            state = {
                userId: action.data.uid,
                name: action.data.name,
            }
            return state;

        case actionTypes.LOG_IN_ERR:
            console.log('err')
            state = {
                err: action.data,
            }
            return state;

        case actionTypes.SIGN_OUT:
            localStorage.removeItem("uid")
            localStorage.removeItem("name")
            state = {
            }
        return state;

        case actionTypes.SIGN_UP:
            localStorage.setItem("uid", action.data);
            localStorage.setItem("name", action.data.name);
            state = {
                userId: action.data.uid,
                name: action.data.name,
            }
        return state;

        case actionTypes.SIGN_UP_ERR:
            console.log('ERR', action)
            state = {
                err: action.data
            }
        return state;

        default: 
        const id = localStorage.getItem("uid");
        const name = localStorage.getItem("name");
            if(name) {
                state = {
                    userId: id,
                    name: name
                }
            }
        return state
    }
}

export default authReducer;