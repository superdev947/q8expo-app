import { Request } from "../services"

export const discountsLoad = () => async (dispatch, getState) => {
  return await Request('post', "discounts/finds", {})
    .then(async (res) => {
      dispatch({ type: "DISCOUNT_DATA", payload: res })
    })
}

export const discountUse = (data) => async (dispatch, getState) => {
  let authToken = getState().appData.authToken
  if (authToken) {
    return dispatch({ type: "DISCOUNT_USE", payload: data })
  } else {
    navigate('LoginScreen')
  }
}