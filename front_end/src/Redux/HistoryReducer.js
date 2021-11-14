import {Actiontypes} from './ActionConstant';

const InitialState={
    Loading:false,
    Error:null,
    SelectedHisData:{
        DateOfCreation:"",
        Name:"",
        cat_item:[]
    },
    data:[
        {   
            DOM:"August 2021",
            data:[
                {   
                    DateOfCreation:"24 Mon 2021",
                    Name:"Eero's farefwell party",
                    Status:"completed",
                    cat_item:[
                        {  
                          category:{
                            name:"Fruits and vegetables",
                            _Id:"000000000000000002345"
                                },

                          items:[
                               {
                                  name:"Avocodo",
                                  quantity:3,
                                  _Id:"00000000000000256",
                                  "checked":false
                               },
                               {
                                   name:"cod",
                                   quantity:3,
                                   _Id:"00000000000000256",
                                   "checked":false
                                }
                                
                                ]
                        }
                    ]
                }
            ] 
        }
    ]
};



export const HistoryReducer=(state=InitialState,{type,payload})=>{
switch(type){

    case Actiontypes.GET_HISTORY_ALL:{
        return {
            ...state,
            data:payload,
            Loading:false
        }
    }

    case Actiontypes.SET_HISTORY_LOADING:{
        return {
            ...state,
            Loading:true
        }
    }

    default :
       return state;
}
};
