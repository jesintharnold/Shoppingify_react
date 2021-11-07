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

export const DeleteCartItem=(payload)=>{
    return {
        type:Actiontypes.DELETE_CART_ITEM,
        payload:payload
        // payload ---> {name:name,category_name}
        
    }
}

export const UpdateCartName=(payload)=>{
    return {
        type:Actiontypes.UPDATE_CART_NAME,
        payload:payload
    }
}

export const AddItemToCart=(payload)=>{
    return {
        type:Actiontypes.ADD_ITEM_TO_CART,
        payload:payload
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

//------------ITEM-ACTION-CREATOR-------
export const GetItemData=(payload)=>{
    return {
        type:Actiontypes.GET_ALL_ITEM,
        payload:payload
    }
}

export const GetItemDetails=(payload)=>{
    return {
        type:Actiontypes.GET_ITEM_DETAILS,
        payload:payload
    }
}

export const ItemLoading=()=>{
    return {
        type:Actiontypes.SET_ITEM_LOADING
    }
}


//API GET ALL ITEMS
// API GET SPECIFIC DETAILS



