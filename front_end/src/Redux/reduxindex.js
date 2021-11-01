import {CartReducer} from './CartReducer';
import {combineReducers} from 'redux';

export const reducers=combineReducers({
    items:CartReducer
});





// map(({category,items},index) => {
//     <span className="cat_name" key={index}>{category}</span>
//     {items.map((Itm)=><Exbtn name={Itm.name} itm_cnt={Itm.quantity} key={Itm.name} />)}
// })