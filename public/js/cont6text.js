let listDate6 = [
    { 
        spanSrc:"/img/fo25.jpg",
        title:"오리지널무지[기모] ",
        title2 :"루즈핏 후드 블랙"
    },
    { 
        spanSrc:"/img/fo26.jpg",
        title:"후드 티셔츠",
        title2 :"베이직라인 무지 후드"
    },
    { 
        spanSrc:"/img/fo27.jpg",
        title:" 무지 조거 후드 ",
        title2 :"트레이닝세트"
    },
    { 
        spanSrc:"/img/fo28.jpg",
        title:"후드 티셔츠",
        title2 :"무지 쭈리 후드 워터멜론"
    },
];


let box6 = document.querySelector(".box6");
let list6 = "";

listDate6.forEach(function(element){

    list6 += `<div class="offic">
                    <div class="maria">
                        <img src=${element.spanSrc}>
                    </div>
                    <div class="textbox">
                        <h2>${element.title}</h2>
                        <p>${element.title2}</p>
                        <span><i class="fa-brands fa-twitter"></i></span>
                        <span><i class="fa-brands fa-facebook"></i></span>
                        <span><i class="fa-brands fa-google-plus-g"></i></span>
                        <span><i class="fa-brands fa-instagram"></i></span>
                    </div>
                </div>`
});

box6.innerHTML = list6;