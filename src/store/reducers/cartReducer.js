import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../util';

const cartReducer = (state = {
    products: [],
    total: 0
}, action) => {
    switch(action.type) {
        case actionTypes.ADD_PRODUCT:
            const product = {
                name: action.data.title,
                price: action.data.price,
                collection: action.data.collection,
                id: action.data.id,
            }

            state = {
                products: [...state.products, product],
                total: +state.total + +product.price
            }

            localStorage.setItem("cart", JSON.stringify(state.products));
            localStorage.setItem("total", state.total);

            return state

        case actionTypes.REMOVE_PRODUCT: 
            const array = state.products;
            const id = array.findIndex(e => e.id === action.data);
            const productPrice = array[id].price;
            console.log( productPrice)

            array.splice(id, 1);
            
            state = {
                products: array,
                total: +state.total - productPrice
            }

            localStorage.setItem("cart", JSON.stringify(state.products));
            localStorage.setItem("total", state.total);

            return state;
        default:
            const products = JSON.parse(localStorage.getItem("cart"));
            const total = localStorage.getItem("total");
            console.log(products)
            if(products) {
                state = {
                    products: products,
                    total: +total
                }
            }
            return state
    }
}

export default cartReducer