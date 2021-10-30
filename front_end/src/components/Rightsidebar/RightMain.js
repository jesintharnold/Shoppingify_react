import './RightMain.scss';
import bottle from '../../Assests/bottle.svg';
import Exbtn from './ExpandaleBtn/ExBtn';
import Savecontainer from './Bottombar/Savecontainer';
import Optioncontainer from './Bottombar/Optioncontainer';
import Additem from './AddItem/Additem';
import {useState} from 'react';

function Rightmainbar(){

    const [tab,setTab]=useState('');
 
return(
<div className='_main_bar'>       

<div className="RightMain" >
<div className="width_90">
<div className="bottle_left">
<div>
<img src={bottle} width="100%"  alt="Not found"/>
</div> 
<div>
<p>Didn’t find what you need?</p>
<button onClick={()=>setTab('AddItem')}>Add item</button>
</div>
</div>
<div className="shopping_list_name">
    <p>Shopping list</p>
    <button>
    <span class="material-icons">edit</span>
    </button>
</div>
<div className="category">
    <span className="cat_name">Fruit and vegetables</span>
    <Exbtn name={'Avocodosssdsssssssssssssssss'} itm_cnt={3}/>
    <Exbtn name={'Avocodo'} itm_cnt={3}/>
</div>
</div>
<Optioncontainer save_bt={`Complete`} className={`_complete`}/>
</div>

<Additem style={tab==='AddItem'?{right:'0%'}:{right:'-105%'}} set={setTab}/>

</div>



    );
}

export default Rightmainbar;