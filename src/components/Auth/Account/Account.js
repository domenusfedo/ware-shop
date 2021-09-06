import React, { useEffect, useState } from 'react';
import style from './Account.module.scss';

import { Redirect } from 'react-router';

import { signOut } from '../../../store/actions/authActions';

import {connect} from 'react-redux';
import useOrders from '../../../hooks/useOrders';

const Account = props => {
    const [orders, setOrders] = useState([])
    const signOut = () => {
        props.signOut()
    }

    const {getActiveOrder} = useOrders()

    useEffect(() => {
        getActiveOrder(props.uid).then(e => setOrders(e))
    }, [])

    console.log(orders)

    return (
        <div className={style.Account}>
            {!props.uid && <Redirect to='/' />}
            <div className={style.userCircle}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="168"
                height="168"
                fill="none"
                viewBox="0 0 148 148"
                >
                <g clipPath="url(#clip0)">
                    <path
                    fill="#243040"
                    d="M98.22 100.298c9.214-7.208 15.142-18.427 15.142-31.021 0-21.725-17.637-39.362-39.362-39.362-21.724 0-39.362 17.637-39.362 39.362 0 12.594 5.928 23.813 15.142 31.021l-.36.625-10.413 18.034c-7.82 13.546-1.47 24.543 14.17 24.543H94.823c15.641 0 21.991-10.997 14.171-24.543l-10.412-18.034-.361-.625z"
                    ></path>
                </g>
                <circle
                    cx="74"
                    cy="74"
                    r="67.5"
                    stroke="#243040"
                    strokeWidth="13"
                ></circle>
                <defs>
                    <clipPath id="clip0">
                    <path
                        fill="#fff"
                        d="M0 0H78.723V113.585H0z"
                        transform="translate(34.638 29.915)"
                    ></path>
                    </clipPath>
                </defs>
                </svg>
            </div>
            <span className={style.name}>{props.name}</span>
            <button className={style.LogOut} onClick={() => props.signOut()}>logout</button>

            {orders.length > 0 ? <h1>active orders</h1> : <h1>no active orders</h1>}

            {orders.map(e => (
                <div className={style.Orders} key={e.number}>
                    <div className={style.Top}>
                        <h1>#{e.number}</h1>
                        <span className={style.status}>status: {e.data.status}</span>
                    </div>
                    <div className={style.Mid}>
                        <h2>Products: ${e.data.cart.total}</h2>
                        {e.data.cart.products.map(prods => (
                            <span className={style.Prods} key={prods.name}>{prods.name} x{prods.quantity}</span>
                        ))}
                    </div>
                    <div className={style.Bottom}>
                        <h2>Delivery: $10</h2>
                        <span className={style.Prods}>{e.data.deliveryMethod}</span>
                    </div>

                    <div className={style.Total}>
                        <h2>Total: ${+e.data.cart.total + 10}</h2>
                        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="27"
      fill="none"
      viewBox="0 0 313 27"
    >
      <path
        fill="#243040"
        d="M0 4.606a4.5 4.5 0 014.5-4.5h304a4.5 4.5 0 010 9H4.5a4.5 4.5 0 01-4.5-4.5z"
      ></path>
      <path
        fill="#243040"
        d="M161.196 23.106c-2.309 4-8.083 4-10.392 0l-7.794-13.5c-2.31-4 .577-9 5.196-9h15.588c4.619 0 7.506 5 5.196 9l-7.794 13.5z"
      ></path>
    </svg>
                    </div>
                </div>
            ))}
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