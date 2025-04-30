import { combineReducers } from "redux"
import auth from "./auth"
import appData from "./appData"
import brands from "./brands"
import cart from "./cart"
import categories from "./categories"
import memberships from "./memberships"
import products from "./products"
import shops from "./shops"
import discounts from "./discounts"
import qrcodes from "./qrcodes"

export default combineReducers({
    auth,
    appData,
    brands,
    cart,
    categories,
    memberships,
    products,
    shops,
    discounts,
    qrcodes,
})