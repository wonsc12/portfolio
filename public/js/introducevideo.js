const viewo = document.querySelectorAll(".viewo");
       

viewo.forEach(function(item,index){

    item.addEventListener("mouseenter",function(e){  //event 태그대상 마우스를 올린대상 

    e.currentTarget.querySelector("video").play(); // 비디오 태그 재생 
    // console.log(e.currentTarget); 

    });

    item.addEventListener("mouseleave",function(e){

    e.currentTarget.querySelector("video").pause();
    });

});