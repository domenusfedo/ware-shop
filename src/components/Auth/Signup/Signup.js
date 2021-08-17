import React, {useState} from 'react';
import style from './Signup.module.scss'

import { NavLink } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')


    const signUphandler = () => {
        
    }

    return (
        <div className={style.Signup}>
            <form>
            <h1>Sign up!</h1>
                <div>
                   <span>name</span>
                    <input name='name' type='text' value={name} onChange={(e) => setName(e.target.value)}></input> 
                </div>
                <div>
                   <span>email</span>
                    <input name='email' type='email'  value={mail} onChange={(e) => setMail(e.target.value)}></input> 
                </div>
                <div>
                    <span>password</span>
                    <input name='password' type='password'  value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <span>password confirmation</span>
                    <input name='password2' type='password' value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)}></input>
                </div>
                
                <div>
                    <button type='submit' onClick={() => signUphandler()}>Sign Up</button>
                    <span>Already have an account? <NavLink to='/login' className={style.link}>Log in</NavLink></span>
                </div>
            </form>
        </div>
    );
};

export default Signup;