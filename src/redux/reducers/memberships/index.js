var initdata = {
    membershipsData: null,
}
export default (state = initdata, action) => {
    switch (action.type) {
        case "MEMBERSHIPS_DATA": {
            return { ...state, membershipsData: action.payload }
        }
        default: {
            return state
        }
    }
}