import './overview.scss';
import {connect} from 'react-redux';
import * as Creator from '../../../Redux/ActionCreators';
import Optioncontainer from '../Bottombar/Optioncontainer';
function Overview({selectItm,no_select,AddToCart,selectState}){
    return(
<div className='overview' style={selectState?{right:"0%"}:{right:"-100%"}}> 
<div className="width_form_9">

<button className='bkp_btn' onClick={()=>no_select()}>
<span class="material-icons">keyboard_backspace</span>
<span>back</span>
</button>   
<div className='Img_container'>
<img src={selectItm.imageURL??"https://www.w3schools.com/css/lights600x400.jpg"} alt='none'/>
</div>
<label>name</label>
<p>{selectItm.name??"Aurora Lights"}</p>
<label>category</label>
<p>{selectItm.category??"Life"}</p>
<label>note</label>
<div className='note_area'>{selectItm.note??"The lights, which are also called aurora borealis, show up at night when the sky is dark. It’s like a celestial ballet of light dancing across the night sky, with a colour palette of green, blue, and sometimes even pink and violet"}</div>
</div>


<Optioncontainer cancel='delete'  save_bt={`Add to list`} className={`_save`} onfunc1={()=>{AddToCart({
              name:selectItm.name,
              category_ID:"0000000035678",
              category_name:selectItm.category,
              quantity:1,
              Item_Id:"0000000002589"
            });no_select();}}
            onfunc2={()=>no_select()}/>
</div>
);
}

const mapStatetoProps=(state)=>{
    return{
        selectItm:state.MainItems.SelectedItem.data,
        selectState:state.MainItems.SelectedItem.status
    }
  }
    
const mapDispatchtoProps=dispatch=>{
    return {
        no_select:()=>dispatch(Creator.select_no_item()),
        AddToCart:(data)=>dispatch(Creator.AddItemToCart(data))
    }
  } 

export default connect(mapStatetoProps,mapDispatchtoProps)(Overview);
