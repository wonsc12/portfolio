 //header li메뉴들 나오게
 let Menu = document.querySelectorAll(".gnb >li");

 let brand = document.querySelectorAll(".brand");


 for(let j =0 ; j< Menu.length; j++){
     Menu[j].addEventListener("mouseenter",function(){

         Menu[j].querySelector(".brand").style.display = "block";

     });

     Menu[j].addEventListener("mouseleave",function(){

         Menu[j].querySelector(".brand").style.display = "none";
     });
 }