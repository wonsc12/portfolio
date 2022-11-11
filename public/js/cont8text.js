let listDate8 = [
    { 
        spanSrc:"/img/fo38.png",
        title:"Alex Teseiaa",
        title2:"/img/fo37.jpg",
        title3:"그린 캔버스 스니커즈",
        title4:"스타일도 살고 오랫동안 신고싶은 국내산인데도 가격인 싼 운동화"
    },
    { 
        spanSrc:"/img/fo39.jpg",
        title:"John Doe",
        title2:"/img/fo34.jpg",
        title3:"블랙 풀업",
        title4:"Garage rock밴드의 부활과 더불어 타이트한 스키니진, 인디밴드로 상징되는새로운 젊음의 감성을 담아 다양한 소재와 컬러로 표현하고 있습니다.",
    },
    { 
        spanSrc:"/img/fo35.jpg",
        title:"Amy Agatha",
        title2:"/img/fo35.jpg",
        title3:"써머 캔버스 R-H20",
        title4:"아크코펜 운동화는 100%덴마크 코펜하겐에서 디자인되며,북유럽 건축과 디자인에서 영감을 얻습니다.",
    },
];


let janbox = document.querySelector(".janbox");
let list8 = "";

listDate8.forEach(function(element){

    list8 += `<div class="jan">
                        <div class="image">
                            <img class="emel" src=${element.spanSrc}>
                        </div>
                        <div class="bg">
                            <span class="feos">17<br>jan</span>
                        </div>
                        <div class="alexbox">
                            <div class="tues">
                                <img src=${element.title2}>
                            </div>
                            <h2>${element.title}</h2>
                            <span><i class="fa-regular fa-calendar-days"></i></span><span><i class="fa-solid fa-comments"></i></span>
                        </div>
                        <div class="selling">
                            <h2>${element.title3}</h2>
                            <p>${element.title4}</p>
                        </div>
                    </div>`
});

janbox.innerHTML = list8;