const body =document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text"),
    main = body.querySelector(".manage-main"),
    button_add = body.querySelector(".button-Add"),
    form_addproduct = body.querySelector(".container-form"),
    value_edit = body.querySelector("#value-edit"),
    container_edit = body.querySelector('.container-edit'),
    shipping_status = body.querySelector('#shipping_status')
   
   
    toggle.addEventListener("click", ()=>{
        sidebar.classList.toggle("close");
    })

    window.addEventListener('click',(e)=>{e.target == main ? sidebar.classList.add('close'):false})
    window.addEventListener('load',()=>{
        if( value_edit.getAttribute('value') !== 'false'){
            container_edit.classList.add('show-edit')
           
        }else{
            container_edit.classList.remove('show-edit')
        }
      
    })

    modeSwitch.addEventListener("click", ()=>{
        body.classList.toggle("dark");
            if(body.classList.contains("dark")){
                modeText.innerText = "Light Mode"
            }else{
                modeText.innerText = "Dark Mode"
            }
    })

    button_add.addEventListener("click",()=>{
        form_addproduct.classList.toggle("close-form");
    })


    console.log(shipping_status.getAttribute('value'))


