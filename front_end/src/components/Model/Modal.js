import ReactDOM from "react-dom";
import './Modal.scss';

function Modal({cancel,yes}) {

    return ReactDOM.createPortal(
    
   <div className="modal">
    <div className="modal_center">
     <span>Are you sure that you want to cancel this list?</span>
     <div className="opt_">
         <button className="red" onClick={yes}>yes</button>
         <button className="transp_" onClick={cancel}>cancel</button>
     </div>
    </div>
   </div>
  ,
   document.getElementById('model_root')
    )
  }

  export default Modal;