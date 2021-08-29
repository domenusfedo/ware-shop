import React, {useState} from 'react';

import styles from './Orders.module.scss'

const Orders = props => {
    const [stage, setStage] = useState('address')

    const adress = (
        <div>
            <h1>address</h1>
            <form>
                <input placeholder='street name'></input>
                <input placeholder='street number'></input>
                <input placeholder='city'></input>
                <input placeholder='zip-code'></input>
                <select>
                    <option value="" selected disabled hidden>choose country</option>
                    <option>Poland</option>
                    <option>Germany</option>
                </select>
            </form>
        </div>
    )

    const delivery = (
        <div>
            <h1>delivery</h1>
            <form>
                <select>
                    <option value="" selected disabled hidden>choose</option>
                    <option>Poland</option>
                    <option>Germany</option>
                </select>
            </form>
        </div>
    )

    const payment = (
        <div>
            <h1>payment</h1>
            <form>
                <select>
                    <option value="" selected disabled hidden>choose</option>
                    <option>Poland</option>
                    <option>Germany</option>
                </select>
            </form>
        </div>
    )

    const summary = (
        <div>
            <h1>summary</h1>
            <span>//cart data</span>
            <span>//adress data</span>
            <span>//payment & delievery data</span>
            <span>//payment & delievery data</span>
        </div>
    )


    return (
        <div className={styles.Orders}>
            <div className={styles.Cancel} onClick={() => props.close()}>X</div>
            {stage === 'address' && adress}
            {stage === 'delivery' && delivery}
            {stage === 'payment' && payment}
            {stage === 'summary' && summary}
            <button onClick={() => setStage('address')}>adress</button>
            <button onClick={() => setStage('delivery')}>delivery</button>
            <button onClick={() => setStage('payment')}>payment</button>
            <button onClick={() => setStage('summary')}>summary</button>

            <div>
                <h1>{stage === 'summary' ? 'place order' : 'next'}</h1>
                {/* and cno error will appear make order */}
            </div>
        </div>
    );
};

export default Orders;