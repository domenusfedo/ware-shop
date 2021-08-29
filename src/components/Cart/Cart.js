import React, {useState, useRef} from 'react';

import Orders from '../Orders/Orders';

import style from './Cart.module.scss';
import {gsap} from 'gsap';

import {connect} from 'react-redux';
import { removeProduct } from '../../store/actions';

const Cart = props => {
    const [toggleOrder, setToggleOrder] = useState(false);

    const orderField = useRef();

    const [orderAnimation] = useState(gsap.timeline({
        paused: true,
        onReverseComplete: () => {
            orderAnimation.clear();
        }
    }))

    const expandOrder = async () => {
        orderAnimation.fromTo([orderField.current.children[0], orderField.current.children[1]], {
            opacity: 1
        }, {
            opacity: 0
        })
        orderAnimation.fromTo([orderField.current.children[0], orderField.current.children[1]], {
            display: 'block'
        }, {
            display: 'none'
        }, '<')
        orderAnimation.fromTo([orderField.current], {
            height: '10rem',
            zIndex: 1
        }, {
            height: '100vh',
            zIndex: 5000,
            opacity: 1
        })
        await orderAnimation.play();
        setToggleOrder(!toggleOrder)
    }

    const closeOrder = async () => {
        await setToggleOrder(!toggleOrder)
        orderAnimation.reverse();
    }

    return (
        <div className={style.Cart}>
            <h1>Your cart</h1>
            {props.products.length > 0 ? 
            <div className={style.Holder}>
                {props.products.map(prod => (
                    <div key={prod.id} className={style.Product}>
                        <div className={style.Photo} style={{backgroundImage: `url(${prod.image})`}}></div>
                        <div>
                        <div className={style.Info}>{prod.name} x{prod.quantity}</div>
                        <div> ${prod.price * prod.quantity} </div>
                        <button className={style.Remove}onClick={() => props.removeProduct(prod.id, prod.name, prod.quantity, prod.price)}>remove</button>
                        </div>
                    </div>
                ))}
                <div className={style.MainButton} ref={orderField}>
                    <h2>Total: ${props.total} (+shipping)</h2>
                    {props.isAuth ? <button onClick={() => expandOrder()}>Make order!</button> : <button>you need to sign in</button>}
                    {toggleOrder && <Orders close={() => closeOrder()}></Orders>}
                </div>
            </div>
            :
            <div>
                <h6>browse our store to find cool products</h6>
            </div>}
            
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.userId,
        products: state.cart.products,
        total: state.cart.total
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeProduct: (id, name, quantity, price) => dispatch(removeProduct(id, name, quantity, price))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);