 //slide popular li

const popular_li = document.querySelectorAll('.popular-li')
function slideli(){
        const calcutetHeight = window.innerHeight-200;
     
            popular_li.forEach(lis=>{
                    const topPosition = lis.getBoundingClientRect().top;
                    if(topPosition){
                            lis.classList.add('showpop')}
            })
    
    }

window.addEventListener('scroll',slideli())




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




