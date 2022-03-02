 //slide popular li

const popular_li = document.querySelectorAll('.popular-li')

window.addEventListener('scroll',slideli())

function slideli(){
    const calcutetHeight = window.innerHeight-200;
 
        popular_li.forEach(lis=>{
                const topPosition = lis.getBoundingClientRect().top;
                if(topPosition){
                        lis.classList.add('showpop');
                     
                }else{
                        lis.classList.remove('showpop');
                }
        });

}


const review_image1 = document.getElementById('review-image1')
const review_image2 = document.getElementById('review-image2')
const review_image3 = document.getElementById('review-image3')
const review_image4 = document.getElementById('review-image4')


function showReview(){
        review_image1.src= `/image/home/cardReview/${Math.floor(Math.random() *5)}.jpg`;
        review_image2.src= `/image/home/cardReview/${Math.floor(Math.random() *5)}.jpg`;
        review_image3.src =`/image/home/cardReview/${Math.floor(Math.random() *5)}.jpg`;
        review_image4.src =`/image/home/cardReview/${Math.floor(Math.random() *5)}.jpg`;
}

setInterval(showReview,5000);




