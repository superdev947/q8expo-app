import { Request } from "../services"
import { setToken } from "../services/index"

export const shopsLoad = () => async (dispatch) => {
  return await Request('get', "shops/")
    .then((res) => {
      const payload = res.filter(data => data.status === "Active")
      dispatch({ type: "SHOPS_DATA", payload })
    }).catch(err => {
      setToken('')
      dispatch({ type: "LOGOUT" })
    })
}