
let loadBtn = document.querySelector(".loadMore"); 
let boxList = document.querySelectorAll(".listWrap > div");  
let startIndex = 4; 


loadBtn.addEventListener("click",function(){
    
    for(let i = startIndex ; i < startIndex + 4 ; i++){
        boxList[i].style.display = "block"

    }
   
    startIndex = startIndex + 4;

   
    if(startIndex >= boxList.length){
        loadBtn.style.display = "none";
    }
   

})