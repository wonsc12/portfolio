let listDate = [
    { 
        spanSrc:"/img/fo6.jpg",
        title:"발마칸",
        title2 :"프리미어 퓨어 캐시미어 발마칸[Black]."
    },
    { 
        spanSrc:"/img/fo9.jpg",
        title:"15호 신규입고",
        title2 :"PLAIN SILVER-17 ."
    },
    { 
        spanSrc:"/img/fo10.jpg",
        title:"화이트 스니커즈",
        title2 :"SP22FTS WHITE SNEAKERS. "
    },
    { 
        spanSrc:"/img/fo11.jpg",
        title:"와이드 데님 팬츠",
        title2 :" Easy wide denim pants. "
    },
];


let textWrap = document.querySelector(".textWrap2");
let list = "";

listDate.forEach(function(element){

    list += `<div class="text23">
                <div class="src22">
                    <img src=${element.spanSrc}>
                </div>
                <div class="text32">
                    <h2>${element.title}</h2>
                    <p>${element.title2}</p>
                </div>
            </div>`
});

textWrap.innerHTML = list;
