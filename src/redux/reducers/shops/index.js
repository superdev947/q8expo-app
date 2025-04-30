var initdata = {
    shopsData: [],
}
export default (state = initdata, action) => {
    switch (action.type) {
        case "SHOPS_DATA": {
            return { ...state, shopsData: action.payload }
        }
        default: {
            return state
        }
    }
}