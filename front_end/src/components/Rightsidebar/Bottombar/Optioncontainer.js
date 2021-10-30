import './Bottombar.scss';

function Optioncontainer({save_bt,className,onfunc1,onfunc2}){
    return (
        <div className="container">
        <div className="Option_flex">
            <button className="cancel" onClick={()=>onfunc2()}>cancel</button>
            <button className={className} onClick={(e)=>onfunc1(e)}>{save_bt}</button>
        </div>
        </div>
    )
}

export default Optioncontainer;
