let listDatef = [
    { 
        spanSrc:"/img/fo12.jpg",
        title:"야구모자 무지 볼캡",
        title2:"야구모자 무지 볼캡",
        title3:"검정",
        title4:"야구모자 ",
        title5:"한국",
        
        
    },
    { 
        spanSrc:"/img/fo13.jpg",
        title:" 1495-red 무지볼캡",
        title2:" 1495-red 무지볼캡",
        title3:"빨강",
        title4:"야구모자 ",
        title5:"미국",
       
        
    },
    {
        spanSrc:"/img/fo14.jpg",
        title:" 무지 볼캡 야구모자 ",
        title2:" 무지 볼캡 야구모자 ",
        title3:"흰색",
        title4:"야구모자 ",
        title5:"일본",
       
       
    },
    { 
        spanSrc:"/img/fp15.jpg",
        title:"베이직 비니 보라",
        title2:"베이직 비니 보라",
        title3:"보라",
        title4:"야구모자 ",
        title5:"영국",
        
       
    },{ 
        spanSrc:"/img/fo16.jpg",
        title:"베이직 비니 ",
        title2:"베이직 비니 ",
        title3:"오렌지",
        title4:"무지 ",
        title5:"독일",
        
        
    },
    { 
        spanSrc:"/img/fo17.jpg",
        title:" 귀달이모자",
        title2:" 귀달이모자",
        title3:"베이지",
        title4:"무지 ",
        title5:"프랑스",
       
        
    },
    {
        spanSrc:"/img/fo18.jpg",
        title:"무지 버킷햇",
        title2:"무지 버킷햇",
        title3:"흰색",
        title4:"무지 ",
        title5:"스페인",
       
       
    },
    { 
        spanSrc:"/img/fo19.jpg",
        title:"무지 면볼캡[카멜]",
        title2:"무지 면볼캡[카멜]",
        title3:"감색",
        title4:"무지 ",
        title5:"이탈리아",
        
       
    },
    
];


let ca_move2 = document.querySelector(".ca_move");
let list3 = "";

listDatef.forEach(function(element){

    list3 += `<div class="ca_child">
                    <div class="image">
                        <img src=${element.spanSrc}>
                    </div>
                    <div class="bgimage">
                        <p class="ford">FOR RENT</p>
                    </div>
                    <div class="textt">
                        <h2>${element.title}</h2>
                        <p><span><i class="fa-solid fa-location-dot"></i></span>${element.title2}</p>
                    </div>
                    <div class="boxbrd">
                        <span>${element.title3}</span></i><span>${element.title4}</span><span>${element.title5}</span>
                    </div>
              </div>`
              
});

ca_move2.innerHTML = list3;


