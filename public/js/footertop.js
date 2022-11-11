const header = document.querySelector("#header");
const sections = document.querySelector(".section")
const sdtd = document.querySelector(".sdtd");


let secStart = [];
sdtd.addEventListener("click",function(){

    
    let scrollMove =sections.offsetTop;
    window.scrollTo({
        top:scrollMove,
        behavior:"smooth"
    });
    secStart = sections.offsetTop;
    
});



