import { Request } from "../services"
import { setToken } from "../services/index"

export const categoriesLoad = (id) => async (dispatch) => {
  if (id) {
    await Request('post', "categories/find", { shop: id })
      .then((res) => {
        const payload = res.filter(data => data.status === "Active")
        dispatch({ type: "CATEGORIES_DATA", payload })
      }).catch(err => {
        setToken('')
        dispatch({ type: "LOGOUT" })
      })
  } else {
    await Request('get', "categories/")
      .then((res) => {
        const payload = res.filter(data => data.status === "Active")
        dispatch({ type: "CATEGORIES_DATA", payload })
      }).catch(err => {
        setToken('')
        dispatch({ type: "LOGOUT" })
      })
  }
}