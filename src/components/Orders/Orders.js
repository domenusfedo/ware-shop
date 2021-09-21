import React, {useState} from 'react';

import styles from './Orders.module.scss'

import {connect} from 'react-redux';

import { makeOrder } from '../../store/actions/cartActions';

const Orders = props => {
    const [stage, setStage] = useState(1)

    const [street, setStreet] = useState('')
    const [streetNumber, setStreetNumber] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [country, setCountry] = useState('')

    const [deliveryMethod, setDeliveryMethod] = useState('')
    
    const [paymentMethod, setPaymentMethod] = useState('')

    const [config, setConfig] = useState({
        //config maxLength etc.
    })

    const validation = (value, field) => {
        //validation
        //if some error return
        //only if every input is valid we can actually click next
    }

    const orderHandler = async (e) => {
        e.target.innerText = 'finalizing...';
        const cart = props.cart;

        const deliveryObject = {
            address: {
                street,
                streetNumber,
                city,
                zip,
                country
            },
            cart,
            deliveryMethod,
            paymentMethod,
            status: 'new'
        }
        await setTimeout(() => {
            e.target.innerText = 'done';
        }, 500)
        await setTimeout(() => {
            props.makeOrder(props.userId, deliveryObject);
            props.close(true)
        }, 800)
    }

    const adress = (
        <div className={styles.Information}>
            <h3 className={styles.header}>delivery address</h3>
            <form>
                <input placeholder="street"></input>
                <input placeholder="street number" type="number"></input>
                <input placeholder="city"></input>
                <input placeholder="country"></input>
                <input placeholder="zip-code" type="number"></input>
            </form>
        </div>
    )

    const delivery = (
        <div>
            <h1>delivery</h1>
            <span>//delivery inforamtion</span>
        </div>
    )

    const payment = (
        <div>
            <h1>payment</h1>
            <span>//payment inforamtion</span>
        </div>
    )

    const summary = (
        <div>
            <h1>summary</h1>
            <span>//summary inforamtion</span>
        </div>
    )

    return (
        <div className={styles.Orders}>
                <div className={styles.Progress}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 958.09 201.31">
      <path
        fill="#c1cad9"
        d="M100.52 55.69a33.34 33.34 0 00-28.78 50.14l18.17 33.42.5.92a11.8 11.8 0 0016.2 4 12 12 0 004-4l.49-.92 18.16-33.42a33.32 33.32 0 00-28.72-50.14zm.07 13.54a19.83 19.83 0 11-19.82 19.84 19.83 19.83 0 0119.82-19.83z"
      ></path>
      <circle
        cx="100.52"
        cy="100.79"
        r="82.02"
        fill="none"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        strokeWidth="37"
      ></circle>
      <circle
        cx="479.04"
        cy="100.52"
        r="82.02"
        fill="none"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        strokeWidth="37"
      ></circle>
      <path
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        d="M478.73 64.21c-20.94 0-37.91 7.21-37.91 16.11V92a2.07 2.07 0 000 .5h0c1 8.51 17.58 15.29 37.86 15.29s36.84-6.78 37.85-15.29h0V80.32c.1-8.9-16.87-16.11-37.8-16.11zM479 68c16 0 29 5.52 29 12.32a5.42 5.42 0 01-.26 1.65 6.78 6.78 0 01-.33.85 10.27 10.27 0 01-3.08 3.5c-.23.17-.46.35-.71.52-5.13 3.48-14.22 5.8-24.61 5.8s-19.49-2.32-24.6-5.8c-.25-.17-.49-.34-.71-.52a9.69 9.69 0 01-3.18-3.75 5.29 5.29 0 01-.31-.87 5.8 5.8 0 01-.18-1.38C450.06 73.54 463 68 479 68z"
      ></path>
      <path
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        d="M478.73 112c-17.74 0-32.77-4.71-37.91-11.2v5.63a7.54 7.54 0 00.06.82h0c1 8.51 17.57 15.28 37.85 15.28s36.84-6.77 37.85-15.28h0a7.52 7.52 0 000-.82v-5.63c-5.08 6.48-20.11 11.2-37.85 11.2z"
      ></path>
      <path
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        d="M479.36 126.29c-17.75 0-32.77-4.71-37.9-11.2v5.63a5.64 5.64 0 00.05.82h0c1 8.51 17.57 15.31 37.85 15.31s36.84-6.77 37.85-15.28h0a4.63 4.63 0 000-.83v-5.62c-5.08 6.46-20.1 11.17-37.85 11.17z"
      ></path>
      <circle
        cx="857.57"
        cy="100.79"
        r="82.02"
        fill="none"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        strokeWidth="37"
        transform="rotate(-45 857.561 100.796)"
      ></circle>
      <path
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        d="M887.9 63.23h-60.66a7.24 7.24 0 00-7.24 7.24v60.65a7.23 7.23 0 007.23 7.23h60.67a7.23 7.23 0 007.23-7.23V70.47a7.24 7.24 0 00-7.23-7.24zm-4.2 56.47a7.22 7.22 0 01-7.22 7.23h-37.81a7.23 7.23 0 01-7.24-7.23V81.89a7.24 7.24 0 017.24-7.23h37.81a7.23 7.23 0 017.22 7.23z"
      ></path>
      <rect
        width="17.81"
        height="3.87"
        x="848.51"
        y="114.25"
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        rx="1.32"
      ></rect>
      <rect
        width="6.39"
        height="3.87"
        x="848.51"
        y="120.05"
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        rx="1.32"
      ></rect>
      <rect
        width="17.81"
        height="3.87"
        x="848.71"
        y="108.64"
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        rx="1.32"
      ></rect>
      <rect
        width="9.1"
        height="3.87"
        x="857.53"
        y="119.97"
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        rx="1.32"
      ></rect>
      <path
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        d="M181.96 87.07H397.31V114.19999999999999H181.96z"
      ></path>
      <path
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        d="M559.25 87.23H774.6V114.36H559.25z"
      ></path>
      <path
        fill="#c1cad9"
        stroke="#c1cad9"
        strokeMiterlimit="10"
        d="M561.34 87.07H625.9200000000001V114.19999999999999H561.34z"
      ></path>
    </svg>
                </div>
            {stage === 1 && adress}
                {stage === 2 && delivery}
                {stage === 3 && payment}
                {stage === 4 && summary}
            <div className={styles.Buttons}>
            {stage !== 4 ? <div className={styles.NEW} onClick={() => setStage(stage + 1)}>next</div> : <div className={styles.NEW} onClick={e => orderHandler(e)}>confirm</div>}
                <div className={styles.NEW2} onClick={() => props.close(false)}>cancel</div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.cart,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        makeOrder: (id, obj) => dispatch(makeOrder(id, obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);