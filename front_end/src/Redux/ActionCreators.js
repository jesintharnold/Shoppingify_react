import { Actiontypes } from "./ActionConstant"

//---------CART-ACTION-CREATORS --------------
export const GetCartData=(payload)=>{
    return {
      type:Actiontypes.GET_CART_ALL,
      payload:payload
    }
}
export const DecCartQty=(payload)=>{
    return {
      type:Actiontypes.DECREMENT_CART_QTY,
      payload:payload
    }
}
export const IncCartQty=(payload)=>{
    return {
      type:Actiontypes.INCREMENT_CART_QTY,
      payload:payload
    }
}
export const CartLoading=()=>{
    return {
        type:Actiontypes.SET_CART_LOADING
    }
}

// GETCARTASYNC
// SAVECARTASYNC



//-----------MAKE-TOAST----------------

export const MakeToast=(payload)=>{
    return {
        type:Actiontypes.MAKE_TOAST,
        payload:payload
    }
}
