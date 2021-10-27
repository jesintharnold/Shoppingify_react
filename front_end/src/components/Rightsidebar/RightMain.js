import './RightMain.scss';
import bottle from '../../Assests/bottle.svg';
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
    <div className="category_item">
        <p>Acocado  </p>

        <div className="pcs">
        <button className="delete">
        <span class="material-icons">delete_outline</span>
        </button>

        <button>
        <span class="material-icons">remove</span>
        </button>

        <div className="No_pcs">3 pcs</div>
  
        <button>
        <span class="material-icons">add</span>
        </button>

        </div>
    </div>
</div>

</div>
</div>
    );
}

export default Rightmainbar;