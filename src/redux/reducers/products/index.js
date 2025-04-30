const initialState = {
  productsData: [],
}
export default (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_DATA":
      return { ...state, productsData: action.data }
    default:
      return state
  }
}