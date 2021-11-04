import {Actiontypes} from './ActionConstant';

const InitialState={
    Loading:false,
    Error:null,
    SelectedData:null,
    data:[
        {
            "category":{
                "name":"Fruits and vegetables",
                "_Id":"000000000000000002345"
            },
            "items":[
                {
                "name":"Avocodo",
                "_Id":"00000000000000256"
                },
                {
                    "name":"cod-1",
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
                "name":"cod-2",
                "_Id":"00000000000000256"
                }
            ]
        }
    ]
};

export const ItemReducer=(state=InitialState,{type,payload})=>{
    switch(type){
       case Actiontypes.GET_ALL_ITEM:{
           return {
           ...state,
           data:payload.Items,
           Loading:false,
           SelectedData:null
           }
       }

       case Actiontypes.GET_ITEM_DETAILS:{
           return {
               ...state,
               Loading:false,
               SelectedData:payload.data
           }
       }

       case Actiontypes.SET_ITEM_LOADING:{
           return {
               ...state,
               Loading:true
           }
       }

       default:
           return state;
    }
};