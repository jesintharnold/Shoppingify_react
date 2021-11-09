import {CartReducer} from './CartReducer';
import {combineReducers} from 'redux';
import {ItemReducer} from './ItemReducer';
import {HistoryReducer} from "./HistoryReducer";

export const reducers=combineReducers({
    cartItems:CartReducer,
    MainItems:ItemReducer,
    HistoryItems:HistoryReducer
});





// map(({category,items},index) => {
//     <span className="cat_name" key={index}>{category}</span>
//     {items.map((Itm)=><Exbtn name={Itm.name} itm_cnt={Itm.quantity} key={Itm.name} />)}
// })