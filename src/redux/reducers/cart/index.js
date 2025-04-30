const initialState = {
  cartData: [],
  counts: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "CART_DATA":
      return { ...state, cartData: action.payload }
    case "CART_COUNTS":
      return { ...state, counts: action.payload }
    default:
      return state
  }
}