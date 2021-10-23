import './header.scss';

function Header(){
    return(
        <div className="header">
         <div className="title">
         <span>Shoppingify</span> allows you take your <br/> shopping list wherever you go
         </div>
         <div className="search">
             <span className="material-icons">search</span>
             <input type="text" placeholder="Search item"/> 
        </div>
        </div>
    )
}


export default Header;