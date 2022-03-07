const images_item = document.querySelector('.images-item')
const img_show = document.querySelector('#img-show')

images_item.parentElement.addEventListener('click',(e)=>{
    let imgSRC = img_show.getAttribute('src');
    if(e.target.getAttribute("src") !== null){
        img_show.src= e.target.getAttribute("src");
        e.target.setAttribute("src",imgSRC)
    }
})

const Order_No = document.getElementById('Order_No')
    Order_No.setAttribute('value','OD'+Date.now());
const resetchoice = document.getElementById('resetchoice');
    resetchoice.addEventListener('click',()=>{window.location.reload()})



