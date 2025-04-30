var initdata = {
    categoriesData: null,
}
export default (state = initdata, action) => {
    switch (action.type) {
        case "CATEGORIES_DATA": {
            return { ...state, categoriesData: action.payload }
        }
        default: {
            return state
        }
    }
}