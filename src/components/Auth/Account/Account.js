import React from 'react';
import style from './Account.module.scss';

import { Redirect } from 'react-router';

import { signOut } from '../../../store/actions/authActions';

import {connect} from 'react-redux';

const Account = props => {
    const signOut = () => {
        props.signOut()
    }

    return (
        <div className={style.Account}>
            {!props.uid && <Redirect to='/' />}
            <span>Hello {props.name},</span>
            <div>
                <span>Latest Order</span>
            </div>
            <button onClick={() => signOut()}>SIGN OUT</button>
        </div>
    );
};

const mapPropsToProps = state => {
    return {
        uid: state.auth.userId,
        name: state.auth.name,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapPropsToProps, mapDispatchToProps)(Account);