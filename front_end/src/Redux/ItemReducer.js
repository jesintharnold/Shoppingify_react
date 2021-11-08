import {Actiontypes} from './ActionConstant';

const InitialState={
    Loading:false,
    Error:null,
    SelectedItem:{
        status:false,
        data:{
            imageURL:null,
            name:null,
            category:null,
            note:null
        }
    },
    filter:{
     status:false,
     data:null
    },
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
                "name":"The Commuter",
                "_Id":"000000000000000002345"
            },
            "items":[
                {
                "name":"Plan-A",
                "_Id":"00000000000000256"
                },
                {
                    "name":"Plan-B",
                    "_Id":"00000000000000256"
                },
                {
                    "name":"Plan-C",
                    "_Id":"00000000000000256"
                },
                {
                    "name":"Plan-D",
                    "_Id":"00000000000000256"
                },
                {
                    "name":"Plan-E",
                    "_Id":"00000000000000256"
                },
                {
                    "name":"Plan-F",
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
           SelectedData:null,
           filter:{
            status:false,
            data:null
           }
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

       case Actiontypes.GET_FILTER_DATA:{
           return {
               ...state,
               filter:{
                   status:true,
                   data:state.data.map(cat=>Object.assign({},cat,{
                       items:cat.items.filter(o=>o.name.toLowerCase().includes(payload.toLowerCase()))
                   }))
               }
           }
       }


       case Actiontypes.SET_NO_FILTER:{
           return {
               ...state,
               filter:{
                status:false,
                data:null
               }
           }
       }

       case Actiontypes.SET_SELECTED_ITEM:{
           return {
               ...state,
               SelectedItem:{
                status:true,
                data:payload
            }
           }
       }

       case Actiontypes.NO_SELECTED_ITEM:{
        return {
            ...state,
            SelectedItem:{
             status:false,
             data:{
                imageURL:null,
                name:null,
                category:null,
                note:null
            }
         }
        }
    }

       default:
           return state;
    }
};