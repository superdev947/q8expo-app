var initdata = {
    qrcodes: [],
}
export default (state = initdata, action) => {
    switch (action.type) {
        case "QRCODES_DATA": {
            return { ...state, qrcodes: action.payload }
        }
        default: {
            return state
        }
    }
}