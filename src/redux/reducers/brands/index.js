const initialState = {
  brandsData: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "BRAND_DATA":
      return { ...state, brandsData: action.data }
    default:
      return state
  }
}