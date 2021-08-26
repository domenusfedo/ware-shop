export const updateObject = (state, newProperties) => {
    return {
        products: [...state.products, newProperties],
        total: +state.total + +newProperties.price
    }
}
