import './Navbar.scss';
import Heart from '../../Assests/heart.svg';
import {NavLink,Link} from "react-router-dom";

function Navbar() {

    return (
      <div className="navbar">
       <Link to={"/"} className='img'>
       <img src={Heart} className="Heart_img" alt="Not found"/>
       </Link>
       <ul className="options_center">
         <NavLink className="nav_tab" exact to="/" activeClassName='tab_active'>
         <span className="orange_border"></span>  
         <span className="material-icons">list</span>
         {/* <span className="tooltip">items</span>  */}
         </NavLink>
         <NavLink className="nav_tab" exact to="/history" activeClassName='tab_active'>
         <span className="orange_border"></span> 
         <span className="material-icons">history</span>
         {/* <span className="tooltip">history</span>  */}
         </NavLink>
         <NavLink  className="nav_tab" exact to="/analytics" activeClassName='tab_active'>
         <span className="orange_border"></span> 
         <span className="material-icons">insert_chart_outlined</span>
         {/* <span className="tooltip">Analytics</span>  */}
         </NavLink>
       </ul>
       <div className="cart">
       <span className="material-icons-outlined">shopping_cart</span>
       <span className="cart_count">5</span>  
       </div>
      </div>
    );
  }

export default Navbar;  