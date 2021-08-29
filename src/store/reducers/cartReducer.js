import * as actionTypes from '../actions/actionTypes';

const cartReducer = (state = {
    products: [],
    inCart: [],
    total: 0
}, action) => {
    switch(action.type) {
        case actionTypes.ADD_PRODUCT:
            const exist = state.products.findIndex(e => e.id === action.data.id);

            if(+exist !== -1) {
                state.products[exist].quantity += 1;
                state.total += +state.products[exist].price
            } else {
                const product = {
                    name: action.data.title,
                    price: action.data.price,
                    collection: action.data.collection,
                    id: action.data.id,
                    image: action.data.imageUrl,
                    quantity: 1
                }

                state = {
                    products: [...state.products, product],
                    //inCart: [...state.inCart, product.name],
                    total: +state.total + +product.price
                }
            }

            localStorage.setItem("cart", JSON.stringify(state.products));
            localStorage.setItem("total", state.total);
            
            return state;

        case actionTypes.REMOVE_PRODUCT: 
            const array = state.products;
            const id = array.findIndex(e => e.id === action.data.id);

            array.splice(id, 1);
            
            state = {
                products: array,
                //inCart: state.inCart,
                total: +state.total - (+action.data.price * +action.data.quantity)
            }

            localStorage.setItem("cart", JSON.stringify(state.products));
            localStorage.setItem("total", state.total);

            return state;
        default:
            const products = JSON.parse(localStorage.getItem("cart"));
            const total = localStorage.getItem("total");
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