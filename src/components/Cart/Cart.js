import React from 'react';

import style from './Cart.module.scss';

import {connect} from 'react-redux';
import { removeProduct } from '../../store/actions';

const Cart = props => {
    return (
        <div className={style.Cart}>
            <h1>Your cart</h1>
            {props.products.length > 0 ? 
            <div>
                {props.products.map(prod => (
                    <div key={prod.id}>
                        <div>{prod.name}</div>
                        <button onClick={() => props.removeProduct(prod.id)}>x</button>
                    </div>
                ))}
                <h2>Total: ${props.total} (+shipping)</h2>
                <button>Make order!</button>
            </div>
            :
            <div>
                <h3>cart is empty</h3>
                <h6>browse our store to find cool products</h6>
            </div>}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        products: state.cart.products,
        total: state.cart.total
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeProduct: (id) => dispatch(removeProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);