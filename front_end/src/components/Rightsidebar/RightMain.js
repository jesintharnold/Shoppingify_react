import './RightMain.scss';
import bottle from '../../Assests/bottle.svg';
import Exbtn from './ExpandaleBtn/ExBtn';
function Rightmainbar(){
    return(
<div className="RightMain">
<div className="width_90">

{/* Fist_container */}
<div className="bottle_left">
<div>
<img src={bottle} width="100%"  alt="Not found"/>
</div> 
<div>
<p>Didn’t find what you need?</p>
<button>Add item</button>
</div>
</div>
{/*End of  fist_container */}

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
</div>
    );
}

export default Rightmainbar;