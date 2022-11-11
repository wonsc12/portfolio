const circle = document.querySelectorAll(".circle li");
const view = document.querySelector(".view");
        
    circle.forEach(function(item,index){
        // console.log(item);
        item.addEventListener("click",function(e){  //e = event
        e.preventDefault(); // 페이지 이동방지 (a,button)
        // 슬라이드 움직이는 계산식
        view.style.marginLeft = -100 * index + "%";
        })

    });