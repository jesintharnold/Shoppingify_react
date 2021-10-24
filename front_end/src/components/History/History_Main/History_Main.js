import './History_Main.scss';


function HistoryMain(){
    return (
<div className="History_main">

    <div className="history_main_name">Shopping history</div>

    <>
    <span className="history_month_year">August 2020</span>
    <div className="history_container">
    <span>Grocery List</span>
    <div className="date_data">
    <span class="material-icons">calendar_today</span>
    <span>Mon 27.8.2020</span>
    <div className="status">completed</div>
    <span class="material-icons navigate">navigate_next</span>
    </div>
    </div>


    <span className="history_month_year">August 2020</span>
    <div className="history_container">
    <span>Grocery List</span>
    <div className="date_data">
    <span class="material-icons">calendar_today</span>
    <span>Mon 27.8.2020</span>
    <div className="status">completed</div>
    <span class="material-icons navigate">navigate_next</span>
    </div>
    </div>

    <div className="history_container">
    <span>Grocery List</span>
    <div className="date_data">
    <span class="material-icons">calendar_today</span>
    <span>Mon 27.8.2020</span>
    <div className="status">completed</div>
    <span class="material-icons navigate">navigate_next</span>
    </div>
    </div>
    </>

</div>
    );
}


export default HistoryMain;