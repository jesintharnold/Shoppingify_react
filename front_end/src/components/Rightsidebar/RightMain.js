import './RightMain.scss';
import bottle from '../../Assests/bottle.svg';
function Rightmainbar(){
    return(
<div className="RightMain">
<div className="width_90">
<div className="bottle_left">
<div>
<img src={bottle} width="100%"  alt="Not found"/>
</div> 
<div>
<p>Didn’t find what you need?</p>
<button>Add item</button>
</div>
</div>
</div>
</div>
    );
}

export default Rightmainbar;