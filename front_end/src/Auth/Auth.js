import './Auth.scss';
import ReactDOM from "react-dom";
import hearts from '../Assests/heart.svg';



function googleOauth(){
  const _url="https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: process.env.REACT_APP_REDIRECT_URL,
    client_id: process.env.REACT_APP_CLIENTID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs = new URLSearchParams(options);
  return `${_url}?${qs.toString()}`;
};

function Auth() {
  return ReactDOM.createPortal(
  
 <div className="App">
    <div className='App__center'>
    <h5>
      <img src={hearts} alt='Not Found'/>
      Shoppingify
    </h5>

  <a className="google-btn" rel="noreferrer" onClick={()=>console.log(`Hello this is Big Bang theory`)} href={googleOauth()}>
  <div className="google-icon-wrapper">
    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='Not Found'/>
  </div>
  <p className="btn-text">Login with google</p>
</a>

    </div>
 </div>
,
 document.getElementById('auth_root')
  )
}

export default Auth;


