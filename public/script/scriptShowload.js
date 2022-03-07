const loadshow = document.querySelector('.loadshow');
const link_select= document.getElementById('link_select');
const link_home = document.getElementById('link_home');

function f_loadshowIn(){
    loadshow.style.display = 'none' ;
}
window.addEventListener('load',f_loadshowIn);

function f_loadshowOut(){
    loadshow.style.display = 'block';
}

link_select.addEventListener('click',f_loadshowOut);
link_home.addEventListener('click',f_loadshowOut);


