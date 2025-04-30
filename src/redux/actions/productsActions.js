import { DEV } from "../../constants"
import { Request } from "../services"

export const productsLoad = (id) => async (dispatch, getState) => {
  return await Request('get', "products/")
    .then(res => {
      let data = res.filter(data => data.status === "Active")
      let products = []
      for (let i in data) {
        let files = data[i].files.split(" @@@@@ ")
        let file = []
        for (let j in files) {
          file.push(DEV.IMAGE_URL + files[j])
        }
        let product = Object.assign({}, data[i], { files: file })
        products.push(product)
      }
      if (id === 'MyOffers') {
        dispatch({ type: "PRODUCT_DATA", data: products.filter(data => parseInt(data.seller) === getState().auth.user.id) })
      } else if (id === 'featured') {
        dispatch({ type: "PRODUCT_DATA", data: products.filter(data => data.featured === true) })
      } else if (id === 'last') {
        products = products.sort(function (a, b) {
          return new Date(a.createdAt) - new Date(b.createdAt)
        })
        dispatch({ type: "PRODUCT_DATA", data: (products.length > 5 ? products.slice(0, 5) : products) })
      } else {
        dispatch({ type: "PRODUCT_DATA", data: products.filter(data => parseInt(data.category) === id) })
      }
    })
    .catch(err => console.log(err))
}

export const productsDelete = (id) => async (dispatch, getState) => {
  var products = getState().products.productsData
  return await Request('delete', `products/${id}`)
    .then(res => {
      products = products.filter(function (obj) {
        return obj.id !== id
      })
      dispatch({ type: "PRODUCT_DATA", data: products })
    })
    .catch(err => console.log(err))
}

export const productsCreate = (req) => async (dispatch) => {
  return await Request('post', 'products/', req)
    .then(res => {
      alert('Waiting for administrator approval.')
    })
    .catch(err => console.log(err))
}

export const productsUpdate = (req, id) => async (dispatch) => {
  return await Request('put', `products/${id}`, req)
    .then(res => {
      dispatch({ type: "PRODUCT_DATA", data: res })
      alert('Success')
    })
    .catch(err => console.log(err))
}