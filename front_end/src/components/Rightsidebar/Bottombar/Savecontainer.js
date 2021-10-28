import './Bottombar.scss';

function Savecontainer(){
return (
    <div className="container">
    <div className="save_flex">
    <input type="text" placeholder="Enter a name"/>
    <div className="search_cont_bt">
    <button>Save</button>
    </div>
    </div>
</div>
)
}

export default Savecontainer;