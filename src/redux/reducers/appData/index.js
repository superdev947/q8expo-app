var initdata = {
    authToken: null,
    isWelcome: false,
}
export default (state = initdata, action) => {
    switch (action.type) {
        case "AUTHTOKEN": {
            return { ...state, authToken: action.payload }
        }
        case "LOGOUT": {
            return { ...state, authToken: null }
        }
        case "WELCOME_DONE": {
            return { ...state, isWelcome: action.payload }
        }
        default: {
            return state
        }
    }
}