import {Actiontypes} from './ActionConstant';

const InitialState={
    Loading:false,
    Error:null,
    name:"",
    data:[]
};

export const CartReducer=(state=InitialState,{type,payload})=>{
    switch(type){
       case Actiontypes.GET_CART_ALL:{
           return {
               ...state,
               data:payload.Items,      //Refer Sample_data.json for schema
               Loading:false,
               name:payload.name
           }
       }

       case Actiontypes.INCREMENT_CART_QTY:{
             let inc=state.Items.filter(({category})=>category===payload.category_name).items.find((itm)=>itm.name===payload.name);
             inc.quantity+=1;
             break;
       }
        
       case Actiontypes.DECREMENT_CART_QTY:{
           let inc=state.Items.filter(({category})=>category===payload.category_name).items.find((itm)=>itm.name===payload.name);
           inc.quantity-=1;
           break;
        }
        
       case Actiontypes.SET_CART_LOADING:{
           return {
               ...state,
               Loading:true
           }
       }
        
       default:
            return state;
    }
};