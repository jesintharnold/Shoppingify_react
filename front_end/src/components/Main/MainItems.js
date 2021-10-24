import Header from '../Main/TitleSearch/header';
import Item from './ItemPage/Item';
import "./MainItems.scss";
import HistoryMain from '../History/History_Main/History_Main';
function Mainitem(){
    return (
        <div className="Main_items">
        {/* <Header/>
        <Item/> */}

        <HistoryMain/>
        </div>
    )
}

export default Mainitem