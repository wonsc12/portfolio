const bigImg = document.querySelector(".picc img");
const smallImg = document.querySelectorAll(".src22 img");


smallImg.forEach(function(item,index){

    item.addEventListener("click",function(){

        let srcValue = item.getAttribute("src");
        bigImg.setAttribute("src",srcValue)
        bigImg.style.backgroundImage = "url("+srcValue+")";
        
    });

});