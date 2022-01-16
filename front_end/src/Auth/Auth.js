import './Auth.scss';
import ReactDOM from "react-dom";
import hearts from '../Assests/heart.svg';


function Auth() {
  return ReactDOM.createPortal(
  
 <div className="App">
    <div className='App__center'>
    <h5>
      <img src={hearts} alt='Not Found'/>
      Shoppingify
    </h5>

  <div className="google-btn" onClick={()=>console.log(`Hello this is Big Bang theory`)}>
  <div className="google-icon-wrapper">
    <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='Not Found'/>
  </div>
  <p className="btn-text">Login with google</p>
</div>

    </div>
 </div>
,
 document.getElementById('auth_root')
  )
}

export default Auth;


