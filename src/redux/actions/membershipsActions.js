import { Request } from "../services"
import { setToken } from "../services/index"

export const membershipsLoad = () => async (dispatch) => {
  return await Request('get', "memberships/")
    .then((res) => {
      const payload = res.filter(data => data.status === "Active")
      dispatch({ type: "MEMBERSHIPS_DATA", payload })
    }).catch(err => {
      setToken('')
      dispatch({ type: "LOGOUT" })
    })
}