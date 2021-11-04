import Header from '../Main/TitleSearch/header';
import Item from './ItemPage/Item';
import "./MainItems.scss";
import HistoryMain from '../History/History_Main/History_Main';
import HistoryExpand from '../History/History_Expand/HistoryExpand';
import Analytics from '../Analytics/Analytics';
function Mainitem(){
    return (
        <div className="Main_items">
        <Header/>
        <Item/>

        {/* <HistoryMain/> */}
        {/* <HistoryExpand/> */}

        {/* <Analytics/> */}
        </div>
    )
}

export default Mainitem