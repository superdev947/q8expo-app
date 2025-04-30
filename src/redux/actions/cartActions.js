export const Checkout = () => async (dispatch, getState) => {
  dispatch({ type: "CART_DATA", payload: [] })
  dispatch({ type: "DISCOUNT_USE", payload: {} })
  dispatch({ type: "CART_COUNTS", payload: {} })
}

export const SetCount = (count) => async (dispatch) => {
  dispatch({ type: "CART_COUNTS", payload: count })
}

export const AddCart = (data) => async (dispatch, getState) => {
  let cart = getState().cart.cartData
  let discount = getState().discounts.discount
  if (!cart.find(e => e.cart.id == data.id)) {
    if (discount && discount.category == data.category) {
      cart.push({ cart: data, discount })
    } else {
      cart.push({ cart: data, discount: {} })
    }
    return dispatch({ type: "CART_DATA", payload: [...cart] })
  } else {
    const Data = cart.filter(e => e.cart.id != data.id)
    return dispatch({ type: "CART_DATA", payload: [...Data] })
  }
}