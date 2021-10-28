import './ExBtn.scss';

function Exbtn({name,itm_cnt}){
    return (
        <div className="category_item">
        <p>{name}</p>

        <div className="pcs">
            
        <div className="lft_pcs">    
        <button className="delete">
        <span class="material-icons">delete_outline</span>
        </button>

        <button>
        <span class="material-icons">remove</span>
        </button>
        </div>
        <div className="No_pcs">{`${itm_cnt|0} pcs`}</div>
  
        <div className="rght_pcs">
        <button>
        <span class="material-icons">add</span>
        </button>
        </div>

        </div>
    </div>
    );
}
export default Exbtn;