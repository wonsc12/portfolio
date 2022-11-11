let listDate10 = [
    { 
        spanSrc:"/img/fo51.jpg",
        title:"나이키",
        title1 :"10대20대30대",
        title2 :"스포츠",
        title3 :"상세보기",
        title4 :"찜하기"
    },
    { 
        spanSrc:"/img/fo52.jpg",
        title:"유니클로",
        title1 :"10대20대30대",
        title2 :"SPA",
        title3 :"상세보기",
        title4 :"찜하기"
    },
    { 
        spanSrc:"/img/fo53.jpg",
        title:"루이비통",
        title1 :"20대30대",
        title2 :"컨템포러리,몀품 ,슈즈,가방 ",
        title3 :"상세보기",
        title4 :"찜하기"
    },
    { 
        spanSrc:"/img/fo54.jpg",
        title:"탑텐",
        title1 :"10대20대30대 ",
        title2 :"SPA",
        title3 :"상세보기",
        title4 :"찜하기"
    },
    { 
        spanSrc:"/img/fo55.jpg",
        title:"뉴발란스",
        title1 :"10대20대30대",
        title2 :"스포츠",
        title3 :"상세보기",
        title4 :"찜하기"
    },
    { 
        spanSrc:"/img/fo56.jpg",
        title:"배럴",
        title1 :"10대20대30대",
        title2 :"스포츠",
        title3 :"상세보기",
        title4 :"찜하기"
    },
    { 
        spanSrc:"/img/fo57.jpg",
        title:"자라",
        title1 :"10대20대30대",
        title2 :"SPA",
        title3 :"상세보기",
        title4 :"찜하기"
    },
    { 
        spanSrc:"/img/fo58.jpg",
        title:"아디다스",
        title1 :"10대20대30대 ",
        title2 :"스포츠",
        title3 :"상세보기",
        title4 :"찜하기"
    },
    { 
        spanSrc:"/img/fo59.jpg",
        title:"노스페이스",
        title1 :"10대20대30대",
        title2 :"스포츠,골프,아웃도어",
        title3 :"상세보기",
        title4 :"찜하기"
    },
    { 
        spanSrc:"/img/fo60.jpg",
        title:"내셔럴지오그래픽 ",
        title1 :"10대20대30대",
        title2 :"스포츠,골프,아웃도어",
        title3 :"상세보기",
        title4 :"Duis semper"
    },
    { 
        spanSrc:"/img/fo61.jpg",
        title:"크리스찬디올",
        title2 :"20대30대   ",
        title2 :"컨템포러리,몀품 ,슈즈,가방 ",
        title3 :"상세보기",
        title4 :"찜하기"
    },
    { 
        spanSrc:"/img/fo62.jpg",
        title:"스파오",
        title1 :"10대20대30대",
        title2 :"SPA    ",
        title3 :"상세보기",
        title4 :"찜하기"
    },
];


let listbox = document.querySelector(".listWrap");
let list10 = "";

listDate10.forEach(function(element){

    list10 += `<div class="listbox">
                    <div class="image"><img src=${element.spanSrc}></div>
                    <h2>${element.title}</h2>
                    <p>${element.title1},<br>
                    ${element.title2}</p>
                    <a href="#" class="more">Read More</a>
                    <div class="listBot">
                        <div class="left">
                            <a href="#"><span class="material-symbols-outlined">arrow_drop_down_circle</span></a>
                            <span class="stmay">${element.title3}</span>
                        </div>
                        <div class="right">
                            <a href="#"><span class="material-symbols-outlined">swipe_left</span></a>
                            <span class="stmay2">${element.title4}</span>
                        </div>
                    </div>
                </div>`
});

listbox.innerHTML = list10;