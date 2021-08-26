import React, {useState, useEffect} from 'react';
import style from './Signup.module.scss'

import { NavLink, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import { signUp } from '../../../store/actions';

const Signup = props => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')


    const signUphandler = async e => {
        e.preventDefault();
        //validation
        await props.signUp({
            name,
            email,
            password
        })
    }

    useEffect(() => {
        return () => {
            //clear error dispatch function
        }
    })

    return (
        <div className={style.Signup}>
            {props.id && <Redirect to='/acc' />}
            <form>
            <h1>Sign up!</h1>
                <div>
                   <span>name</span>
                    <input name='name' type='text' value={name} onChange={(e) => setName(e.target.value)}></input> 
                </div>
                <div>
                   <span>email</span>
                    <input name='email' type='email'  value={email} onChange={(e) => setEmail(e.target.value)}></input> 
                </div>
                <div>
                    <span>password</span>
                    <input name='password' type='password'  value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <span>password confirmation</span>
                    <input name='password2' type='password' value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)}></input>
                </div>

                <span>{props.err && props.err}</span>
                
                <div>
                    <button type='submit' onClick={(e) => signUphandler(e)}>Sign Up</button>
                    <span>Already have an account? <NavLink to='/login' className={style.link}>Log in</NavLink></span>
                </div>
            </form>
        </div>
    );
};

const mapPropsToProps = state => {
    const err = state.auth.err
    if(err) {
        return {
            err: err
        }
    } else {
        return {
            id: state.auth.userId
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(mapPropsToProps, mapDispatchToProps)(Signup);