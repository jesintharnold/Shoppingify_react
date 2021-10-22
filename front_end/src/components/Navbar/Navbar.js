import './Navbar.scss';
import Heart from '../../Assests/heart.svg';
import {NavLink,Link} from "react-router-dom";
import NavData from "./Navbar_data.json";

function Navbar() {

    return (
      <div className="navbar">
       <Link to={"/"} className='img'>
       <img src={Heart} className="Heart_img" alt="Not found"/>
       </Link>
       <ul className="options_center">
         {
           NavData.map(({path,icon,tooltip},index)=>(
            <NavLink className="nav_tab" exact to={path} activeClassName='tab_active' key={index}>
            <span className="orange_border"></span>  
            <span className="material-icons">{icon}</span>
            <span className="tooltip">{tooltip}</span> 
            </NavLink>
           ))
         }
       </ul>
       <div className="cart">
       <span className="material-icons-outlined">shopping_cart</span>
       <span className="cart_count">5</span>  
       </div>
      </div>
    );
  }

export default Navbar;  