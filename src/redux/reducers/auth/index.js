var initdata = {
    isWelcome: false,
    user: null,
    email: null,
}
export default (state = initdata, action) => {
    switch (action.type) {
        case "WELCOME": {
            return { ...state, isWelcome: action.payload }
        }
        case "LOGIN": {
            return { ...state, user: action.payload }
        }
        case "MEIL_DATA": {
            return { ...state, email: action.payload }
        }
        default: {
            return state
        }
    }
}