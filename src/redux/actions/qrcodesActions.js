import { Request, setToken } from "../services"

export const qrcodesLoad = () => async (dispatch) => {
  return await Request('get', "qrcodes/", {})
    .then(res => {
      return dispatch({ type: "QRCODES_DATA", payload: res })
    })
    .catch(err => console.log(err))
}