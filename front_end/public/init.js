if( /iPhone|iPad|iPod|Android|webOS|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  
  let vh = window.innerHeight * 0.01;
  console.log(vh);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
 }
 else{
   console.log(`Desktop | Laptop`)
 }