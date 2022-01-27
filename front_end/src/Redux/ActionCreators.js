import { Actiontypes } from "./ActionConstant"
import {redux_store} from './Store'
import axios from 'axios'
import {cart_get,History_get,cart_post} from './utils/Redux_utils';
import config from "../config/default.json";

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
    }
}




export const ChangeCheckedState=(payload)=>{
    return {
        type:Actiontypes.CHANGE_CHECKED_STATE,
        payload:payload
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



const ModifyCartData= async (load)=>{
return await cart_get(load);
}

export const GetCartDataAsync=()=>{
    return async dispatch=>{
        dispatch(CartLoading());
        await axios.get(`${config.APIurl}/cart`,{params:{userID:localStorage.getItem("access_Id")}}).then(data=>{
             if(data.data){
                console.log(data.data.cart);
                dispatch(UpdateCartName(data.data.cart[0].listName));
                ModifyCartData(data.data).then(a=>{console.log(a);
                dispatch(GetCartData({
                    a:a,
                    b:data.data.cart[0]._id
                }))
            });
             }else{
                   console.log("No Data");
             }
        })
    }
}

export const PostCartDataAsync=(payload)=>{ //
    return async dispatch=>{

        let data_=redux_store.getState().cartItems;
        let dat_=await cart_post(data_.data);
        console.log(dat_);
        
        await axios.post(`${config.APIurl}/cart`,{
            listName :data_.name,
            status : payload.toString(),
            userID : localStorage.getItem("access_Id") ,
            items : dat_,
            cartID :data_.CartID
        }).then(data=>{
            console.log(data);
                   dispatch(GetCartDataAsync());
        })

        
        console.log({
            listName :data_.name,
            status : payload,
            userID : localStorage.getItem("access_Id") ,
            items : dat_,
            cartID :data_.CartID
        });
         
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

export const GetItemDataAsync=()=>{
    return async dispatch=>{
        dispatch(ItemLoading());
        await axios.get(`${config.APIurl}/items`,{params:{userID:localStorage.getItem("access_Id")}}).then(data=>{
             if(data.data){

                

                dispatch(GetItemData(data.data.Item));
             }else{
                console.log("No Data");
             }
        })
    }
}

export const PostItemDataAsync=(payload)=>{
    return async dispatch=>{
        await axios.post(`${config.APIurl}/items`,{
            name:payload.name,
            note:payload.note,
            imageURL:payload.url,
            category:payload.category,
            userID:localStorage.getItem("access_Id"),
            categoryID:payload.categoryID??null
        }).then(data=>{
            // console.log(data);
           dispatch(GetItemDataAsync());
       })
    


    }
}



export const setFiltering=(payload)=>{
 return {
        type:Actiontypes.GET_FILTER_DATA,
        payload:payload
    }
}

export const noFilter=()=>{
    return {
        type:Actiontypes.SET_NO_FILTER
    }
}

export const selectedItem=(payload)=>{
return {
    type:Actiontypes.SET_SELECTED_ITEM,
    payload:payload
  }
}

export const select_no_item=()=>{
    return {
        type:Actiontypes.NO_SELECTED_ITEM,
    }
}

//API GET ALL ITEMS
// API GET SPECIFIC DETAILS



//-----------------------------------------------------------------------


export const GetHistoryData=(payload)=>{
    return {
        type:Actiontypes.GET_HISTORY_ALL,
        payload:payload
    }
}

export const SetHistoryLoading=()=>{
  return {
      type:Actiontypes.SET_HISTORY_LOADING
  }
}


//MAKE A function 

const History_change=async (payload)=>{
return await History_get(payload);
}

//DISPATCH the output

export const GetHistoryDataAsync=()=>{
    return async dispatch=>{
        dispatch(SetHistoryLoading());
        await axios.get(`${config.APIurl}/history`,{params:{userID:localStorage.getItem("access_Id")}}).then(data=>{
             if(data.data){
                console.log(data.data.Cart);
                History_change(data.data.Cart).then((a)=>dispatch(GetHistoryData(a)));
             }else{
                console.log("No Data");
             }
        })
    }
}

export const DeleteCartItemAsync=()=>{
    let payload=redux_store.getState().MainItems.SelectedItem.data;

    console.log(payload);

    return async dispatch=>{
        console.log({
            userID:localStorage.getItem("access_Id"),
            categoryID:payload.categoryID,
            itemID:payload.itemID
        });
        await axios.delete(`${config.APIurl}/items`,{
            data:{
            userID:localStorage.getItem("access_Id"),
            categoryID:payload.categoryID,
            itemID:payload.itemID
            }
        }).then(data=>{
            dispatch(GetItemDataAsync());
        })
    }
}


