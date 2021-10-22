import { useEffect } from "react";

const Wrapper100vh=({children})=>{

useEffect(()=>{

    function resize(){
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
   
    window.addEventListener('resize',resize);
     
 return ()=>{
    window.removeEventListener('resize',resize);
 }
},[])    


return <>{children}</>;
}

export default Wrapper100vh;