import React, {useState} from 'react';

import styles from './Orders.module.scss'

import {connect} from 'react-redux';

import { makeOrder } from '../../store/actions/cartActions';
import { Redirect } from 'react-router';

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
        //split cart reducer and order
        //and make if conditions
        //if order ordered then close summary and redirect
        await setTimeout(() => {
            e.target.innerText = 'done';
        }, 500)
        await setTimeout(() => {
            props.makeOrder(props.userId, deliveryObject);
            props.close(true)
        }, 800)
    }

    const adress = (
        <div>
            <h1>address</h1>
            <form>
                <input placeholder='street name' value={street} onChange={(e) => setStreet(e.target.value)}></input>
                <input placeholder='street number' type='number' value={streetNumber} onChange={(e) => setStreetNumber(e.target.value)}></input>
                <input placeholder='city'  value={city} onChange={(e) => setCity(e.target.value)}></input>
                <input type="text" placeholder="zip-code" pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"  value={zip} onChange={(e) => setZip(e.target.value)}/>
                <select onChange={(e) => setCountry(e.target.value)}>
                    <option value="">choose country</option>
                    <option value="poland">Poland</option>
                    <option value="germany">Germany</option>
                </select>
            </form>
            <div className={styles.Holder}>
            <div className={styles.Buttons} onClick={() => props.close()}>cancel</div>
            {stage !== 4 && <div className={styles.Buttons} onClick={() => setStage(stage + 1)}>next</div>}
            </div>
        </div>
    )

    const delivery = (
        <div>
            <h1>delivery</h1>
            <form>
                <select onChange={(e) => setDeliveryMethod(e.target.value)}>
                    <option value="">delivery options</option>
                    <option value="inpost">inpost</option>
                    <option value="dhl">DHL</option>
                </select>
            </form>
            <div className={styles.Holder}>
            <div className={styles.Buttons} onClick={() => props.close()}>cancel</div>
            {stage !== 4 && <div className={styles.Buttons} onClick={() => setStage(stage + 1)}>next</div>}
            </div>
        </div>
    )

    const payment = (
        <div>
            <h1>payment</h1>
            <form>
                <select onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="" >payment methods</option>
                    <option value="blik">blik</option>
                    <option value="cash on delievery">cash on delivery</option>
                </select>
            </form>
            <div className={styles.Holder}>
            <div className={styles.Buttons} onClick={() => props.close()}>cancel</div>
            {stage !== 4 && <div className={styles.Buttons} onClick={() => setStage(stage + 1)}>next</div>}
            </div>
        </div>
    )

    const summary = (
        <div>
            <h1>summary</h1>
            <h4 style={{opacity: '.8'}}>Products</h4>
            {props.cart.products.map(e => (
                <div key={e.name} style={{opacity: '.8'}}>{e.name}</div>
            ))}
            <h4 style={{opacity: '.8'}}>Total: ${props.cart.total}</h4>
            <div className={styles.Holder}>
            <div className={styles.Buttons} onClick={() => props.close()}>cancel</div>
            {stage === 4 && <div className={styles.Buttons} onClick={() => props.orderHandler()}>confirm</div>}
            </div>
        </div>
    )

    return (
        <div className={styles.Orders}>
            {/* <div className={styles.Random}> */}
                {stage === 1 && adress}
                {stage === 2 && delivery}
                {stage === 3 && payment}
                {stage === 4 && summary}
                {/* and cno error will appear make order */}
            {/* </div> */}
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