import {Actiontypes} from './ActionConstant';

const InitialState={
    Loading:false,
    Error:null,
    name:null,
    data:[
        {
            "category":{
                "name":"Fruits and vegetables",
                "_Id":"000000000000000002345"
            },
            "items":[
                {
                "name":"Avocodo",
                "quantity":3,
                "_Id":"00000000000000256"
                },
                {
                    "name":"cod",
                    "quantity":3,
                    "_Id":"00000000000000256"
                }
            ]
        },
        {
            "category":{
                "name":"Fruits",
                "_Id":"000000000000000002345"
            },
            "items":[
                {
                "name":"cod",
                "quantity":3,
                "_Id":"00000000000000256"
                }
            ]
        }
    ]
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
           console.log(state);
           return {
               ...state,
               data:state.data.map((cat)=>cat.category.name===payload.category_name?Object.assign({},cat,{
                   items:cat.items.map((Pro)=>Pro.name===payload.name?{...Pro,quantity:Pro.quantity+1}:Pro)
               }):cat)
            }
             
       }
        
       case Actiontypes.DECREMENT_CART_QTY:{
          return {
            ...state,
            data:state.data.map((cat)=>cat.category.name===payload.category_name?Object.assign({},cat,{
                items:cat.items.map((Pro)=>Pro.name===payload.name?{...Pro,quantity:((Pro.quantity>1)?Pro.quantity-1:1)}:Pro)
            }):cat)
          }
        }
        
       case Actiontypes.SET_CART_LOADING:{
           return {
               ...state,
               Loading:true
           }
       }

       case Actiontypes.DELETE_CART_ITEM:{

          let Itms=state.data.filter(({category,items})=>(category.name===payload.category_name))[0].items.length;
          if(Itms===1){
            return {
                ...state,
                data:state.data.filter(({category})=>category.name!==payload.category_name)
            }
          }else{
            return {
                ...state,
                data:state.data.map((cat)=>cat.category.name===payload.category_name?Object.assign({},cat,{
                    items:cat.items.filter((Pro)=>Pro.name!==payload.name)
                }):cat)
            }
          }
       }

       case Actiontypes.UPDATE_CART_NAME:{
           return {
               ...state,
               name:payload
           }
       }

       case Actiontypes.ADD_ITEM_TO_CART:{

           let category_exist=state.data.filter((cat)=>cat.category.name===payload.category_name).length===1;
           let Item_exist=(category_exist?state.data.filter((cat)=>cat.category.name===payload.category_name)[0].items.filter((Pro)=>Pro.name===payload.name).length===1:false)?true:false;

           if(category_exist){
                        if(Item_exist){

                            return {
                                ...state,
                                data:state.data.map((cat)=>cat.category.name===payload.category_name?Object.assign({},cat,{
                                 items:cat.items.map((Pro)=>Pro.name===payload.name?{...Pro,quantity:(Pro.quantity+payload.quantity)}:Pro)
                             }):cat)   
                            }
                        }
                        else{
                            return {
                                ...state,
                                data:state.data.map((cat)=>cat.category.name===payload.category_name?Object.assign({},cat,{
                                 items:[...cat.items,{
                                    name:payload.name,
                                    quantity:payload.quantity,
                                    _Id:payload.Item_Id
                                }]
                             }):cat)   
                            }
                        }
                    }else{
                        return {
                            ...state,
                            data:[...state.data,{
                                category:{
                                    name:payload.category_name,
                                    _Id:payload.category_ID
                                },
                                items:[
                                    {
                                    name:payload.name,
                                    quantity:payload.quantity,
                                    _Id:payload.Item_Id
                                    }
                                ]
                            }]
                        }
                    }

       }
        
       default:
            return state;
    }
};