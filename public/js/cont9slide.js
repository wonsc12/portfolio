const prevbtnfo = document.querySelector(".prevbtnfo");

const nextbtnfo = document.querySelector(".nextbtnfo");

const silderest = document.querySelector(".est");

const theme4 = document.querySelectorAll(".theme4");

 sNumber3 = 0 ;

nextbtnfo.addEventListener("click",function(){
        if(sNumber3 == theme4.length-1){
            sNumber3 = 0;
        }
        else{
            sNumber3++;
        }

        silderest.style.marginLeft = -100 * sNumber3 + "%";

    });
    prevbtnfo.addEventListener("click",function(){

        if(sNumber3 == 0){
            sNumber3 = theme4.length-1;
        }
        else{
            sNumber3--;
        }
       
        silderest.style.marginLeft = -100 * sNumber3 + "%";

    });