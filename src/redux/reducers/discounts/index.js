var initdata = {
    discountsData: [],
    discount: {},
}
export default (state = initdata, action) => {
    switch (action.type) {
        case "DISCOUNT_DATA": {
            return { ...state, discountsData: action.payload }
        }
        case "DISCOUNT_USE": {
            return { ...state, discount: action.payload }
        }
        default: {
            return state
        }
    }
}