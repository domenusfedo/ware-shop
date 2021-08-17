import React, {useState} from 'react';
import style from './Login.module.scss'

import { NavLink, Redirect } from 'react-router-dom';

import { signIn } from '../../../store/actions/index';

import {connect} from 'react-redux';

const Login = props => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        props.signIn({
            email,
            password
        })
    }

    return (
        <div className={style.Login}>
        {props.uid && <Redirect to='/acc' />}
        <form>
        <h1>Log in!</h1>
            <div>
               <span>email</span>
                <input name='email' value={email} type='email' onChange={(e) => setEmail(e.target.value)}></input> 
            </div>
            <div>
                <span>password</span>
                <input name='password' value={password} type='password' onChange={(e) => setPassword(e.target.value)}></input>
            </div>

            {props.err && <span className={style.Error}>{props.err}</span>}
            
            <div>
                <button type='submit' onClick={(e) => submitHandler(e)}>Log in</button>
                <span>Want to create an account? <NavLink to='/signup' className={style.link}>Sign up!</NavLink></span>
            </div>
        </form>
    </div>
    );
};

const mapPropsToProps = state => {
    const uid = state.auth.userId;
    if(uid) {
        return {
            uid: uid
        }
    } else {
        return {
            err: state.auth.err
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapPropsToProps, mapDispatchToProps)(Login);