import React, {useState, useRef} from 'react';

import Orders from '../Orders/Orders';

import style from './Cart.module.scss';
import {gsap} from 'gsap';

import {connect} from 'react-redux';
import { removeProduct } from '../../store/actions';
import { Redirect } from 'react-router';

const Cart = props => {
    const [toggleOrder, setToggleOrder] = useState(false);
    const [redirect, setRedirect] = useState(false) //will be deleted

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
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 5000,
            opacity: 1
        })
        await orderAnimation.play();
        setToggleOrder(!toggleOrder)
    }

    const closeOrder = async (a) => {
        await setToggleOrder(!toggleOrder)
        await orderAnimation.reverse();
        if(a) {
            console.log(a)
            setRedirect(true)   
        }
    }

    console.log(props.products)

    return (
        <div className={style.Cart}>
            {redirect && <Redirect to='/acc'/>}
            {/* {redirect && <div style={{position: 'absolute', color: 'red', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <h1>products ordered</h1>
                <span>close</span>
                <span>account</span>
            </div>} */}
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
                    {toggleOrder && <Orders close={(a) => closeOrder(a)}></Orders>}
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