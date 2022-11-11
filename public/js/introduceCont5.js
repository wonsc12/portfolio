let listDatecont5 = [
    { 
        spanSrc:"/img/fo63.jpg",
        title:"실버태그 FW 신상품 발매",
        title2:"FW 신상품 할인전",
        title3:"turnapple123@naver.com",
        title4:"010-1111-1111",
        title5:"SALE",
        
    },
    { 
        spanSrc:"/img/fo64.jpg",
        title:"R TRUNK 세트 ",
        title2:"단독할인 및 인기상품 할인전",
        title3:"dorsdg@gmail.com",
        title4:"-010-2222-1111",
        title5:"EVENT",
        
    },
    { 
        spanSrc:"/img/fo65.jpg",
        title:"비스크 22 WINTER ",
        title2:"신상 발매전",
        title3:"twowe123@gmail.com",
        title4:"010-1444-4444-4444",
        title5:"SALE,EVENT",
       
    },
];


let centerMaria = document.querySelector(".centerMaria");
let list9 = "";

listDatecont5.forEach(function(element){

    list9 += `<div class="suppbox">
                <div class="supimage">
                    <img src=${element.spanSrc}>
                </div>
                <div class="textbox">
                    <p>${element.title}</p>
                    <h2>${element.title2}</h2>
                    <p><span><i class="fa-regular fa-envelope"></i></span><span> ${element.title3}</span></p>
                    <p><span><i class="fa-solid fa-phone"></i></span><span> ${element.title4}</p>
                    <p><span><i class="fa-solid fa-certificate"></i></span><span> ${element.title5}</span></p>
                </div>
            </div>`
});

centerMaria.innerHTML = list9;