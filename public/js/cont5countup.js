let listDatesd = [
    { 
        spanSrc:"fa-solid fa-tag",
        title:"세일",
        title2:"countUp count1",
    },
    { 
        spanSrc:"fa-brands fa-creative-commons-nc-jp",
        title:"고객",
        title2:"countUp count2",
    },
    { 
        spanSrc:"fa-solid fa-people-line",
        title:"방문자 ",
        title2:"countUp count3",
    },
    { 
        spanSrc:"fa-solid fa-file-lines",
        title:"판매수",
        title2:"countUp count4",
        
    },
];


let centerfd = document.querySelector(".centerfd");
let list4 = "";

listDatesd.forEach(function(element){

    list4 += `<div class="box">
                <ul class="element">
                    <li><i class="${element.spanSrc}"></i></li>
                </ul>
                <div class="coutk">
                    <div class="${element.title2}">
                        <p>0</p>
                    </div> 
                    <p>${element.title}</p>
                </div>
            </div>`
});

centerfd.innerHTML = list4;




let countValue = [
    {
    plus:10,
    tag:".count1 p",
    complete:967,
    loop:50   
},
{
    plus:10,
    tag:".count2 p",
    complete:1276,
    loop:50
},
{
    plus:10,
    tag:".count3 p",
    complete:396    ,
    loop:100
},
{
    plus:10,
    tag:".count4 p",
    complete:804,
    loop:50
},


];

let contStart = document.querySelector(".cont5").offsetTop;

let moveCheck = true;

window.addEventListener("scroll",function(){

    let scTop = window.scrollY;
    
    if(scTop >= contStart){

        if(moveCheck == true){

            countValue.forEach(function(el){

                countUp(el.plus,el.tag,el.complete,el.loop);
            });
        }
    }
});       

function countUp(inc,sel,des,speed){
moveCheck = false;

let num = 0;

let autoCount = setInterval(function(){

    num += inc;
    if(num >= des){
        clearInterval(autoCount);
        document.querySelector(sel).innerHTML = des; // 다 올라간 숫자
        
    }
    else{
        document.querySelector(sel).innerHTML = num; // 다 증가된 숫자
    }
},speed);
}
