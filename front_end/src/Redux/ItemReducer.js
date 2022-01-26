import {Actiontypes} from './ActionConstant';


//Set content using JSON.parse(JSON.stringify(object));

const InitialState={
    Loading:false,
    Error:null,
    SelectedItem:{
        status:false,
        data:{
            imageURL:null,
            name:null,
            category:null,
            note:null,
            itemID:null,
            categoryID:null
        }
    },
    filter:{
     status:false,
     data:null
    },
    data:[
        {
            _id: "61ace482ad7a52ad882aa3aa",
            User_ID: "619a5bd0a01ef280b3b92bd4",
            name: "Non-veg",
            Items: [
                {
                    name: "Chicken Soup",
                    Itm_id: "61ace482256ebf05f3150904",
                    note: "A good is required",
                    imageURL: "www.google.com/jesintharnold"
                },
                {
                    name: "ChickenLeg",
                    Itm_id: "61ace639fb926b664a9f8182",
                    note: "A good is required",
                    imageURL: "www.google.com/jesintharnold"
                },
                {
                    name: "Chicken Burger",
                    Itm_id: "61d45c0eed886fb975803bd2",
                    note: "A Chicken Burger grown in our own garden of Eden , served directly to your plater",
                    imageURL: "www.google.com/jesintharnold"
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
           data:payload,
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
                       items:cat.Items.filter(o=>o.name.toLowerCase().includes(payload.toLowerCase()))
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
             data:state.data
         }
        }
    }

       default:
           return state;
    }
};