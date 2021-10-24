import './HistoryExpand.scss';

function HistoryExpand(){
return (
<div className="History_expand">

<a>
<span class="material-icons">
keyboard_backspace
</span>
<span>back</span>
</a>   

<div className="List_name">Eero’s farewell party</div>
<div className="date_list">
<span class="material-icons">calendar_today</span>
<span>Mon 27.8.2020</span>
</div>


<div className="History_items">
<div className="container_name">Cookies</div>
<div className="his_itm"> 

<div className="his_itm_container">
<span>CookiesChocolate </span>
<span>2pcs</span>
</div>

</div>
</div>


</div>
)
}


export default HistoryExpand;