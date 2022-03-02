const input_Checkorder = document.getElementById('input-checkorder')
const check_order = document.getElementById('check-order')

check_order.addEventListener('submit',function(e){
        
        if(input_Checkorder.value ===''){
                e.preventDefault();
        input_Checkorder.classList.add('addredline')
        }
})


// css show modal-checkparcel

const show_modal = document.getElementById('open-modal')
const btn_close_modal = document.querySelector('.close-btn')
const checkparcel = document.getElementById('checkparcel')

show_modal.addEventListener('click',()=>{
        checkparcel.classList.add('show-modal')
});

btn_close_modal.addEventListener('click',()=>{
        checkparcel.classList.remove('show-modal')
})
window.addEventListener('click',(e)=>{e.target == checkparcel ? checkparcel.classList.remove('show-modal'):false})


//  script --------- Product select ---------------
function chooseAmount(btn,id){ 
        const amountInput = document.getElementById(`amountChoose${id}`)
        if(id){
            let inclass = btn.getAttribute("class");
            let min = amountInput.getAttribute("min");
            let max = amountInput.getAttribute("max");
            let step = amountInput.getAttribute("step");
            let val = amountInput.getAttribute("value");
            let calcStep = (inclass == "increment") ? (step * 1):(step * -1);
            let newValue = parseInt(val)+calcStep;
    
            if(newValue >= min && newValue <= max){
                amountInput.setAttribute("value",newValue);
                }  
        }
    }



//------------------------ chooce this product ----------------------
const container_basket =document.getElementById('container-basket')
const ul_basket = document.getElementById('ul-basket')

const Array_amount_P = document.getElementsByName('amount_P')
const sum_Amount = document.getElementById('sum_Amount')
  let sumAmount_vals = 0;

const Array_price_P = document.getElementsByName('priceProducts')
const sum_PriceAll = document.getElementById('sum_Prices')
  let sum_Pv = 0;

const Shipping_Discount = document.getElementById('Shipping_Discount')

function pick(btn,id){
        const name_Product = document.getElementById(`nameProduct${id}`)
        const amount_Product = document.getElementById(`amountChoose${id}`)
        const price_Product = document.getElementById(`priceProduct${id}`)
        const li_buythis = document.getElementById(`li_buythis${id}`)

        const amount_Pv = amount_Product.getAttribute('value')
        const name_Pv = name_Product.getAttribute('value')
        const price_Pv = price_Product.getAttribute('value')

        if(amount_Pv > 0){
           if(li_buythis == null){
                creatBasket(id,name_Pv,amount_Pv,price_Pv)         
           }else if(li_buythis){
                editBasket(id,amount_Pv,price_Pv)
           }
           container_basket.classList.add('show-basket')
            SumSet();
        }else if(amount_Pv == 0 && li_buythis !== null){
                editBasket(id,amount_Pv,price_Pv)
                delete_libuythis(id)
                SumSet();
        }
}

function creatBasket(id,name_Pv,amount_Pv,price_Pv){
        const creat_li = document.createElement('li');
        const input_id = document.createElement('input')
        const input_name = document.createElement('input')
        const input_price = document.createElement('input')
        const input_amount = document.createElement('input')
                input_id.setAttribute('value',id)
                        input_id.name = `product_IDs`;
                        input_id.value = id;
                        input_id.hidden = true;
                input_name.setAttribute('value',name_Pv)
                        input_name.name = `nameProducts`;
                        input_name.type = `text`;
                        input_name.readOnly = true;
                input_price.setAttribute('value',price_Pv*amount_Pv)
                        input_price.name = `priceProducts`
                        input_price.type = 'number'
                        input_price.id = `priceProducts${id}`
                        input_price.readOnly = true;
                input_amount.setAttribute('value',amount_Pv)
                        input_amount.name = `amountProducts`
                        input_amount.type = 'number'
                        input_amount.id = `amountProducts${id}`
                        input_amount.readOnly = true;
        const p_amount = document.createElement('p')
        const p_piece = document.createElement('p')
        const p_sum = document.createElement('p')
        const p_bath = document.createElement('p')
                p_amount.innerText = 'จำนวน';
                p_piece.innerText = 'ชิ้น';
                p_sum.innerText = 'รวม';
                p_bath.innerText = 'บาท';
        const button_delete = document.createElement('button')
                button_delete.type = 'button';
                button_delete.innerHTML = '<i class="fas fa-check-circle"></i>'
                button_delete.id = `deleteli`;
                

        ul_basket.appendChild(creat_li)
        creat_li.appendChild(input_id)
        creat_li.id = `li_buythis${id}`;
        creat_li.classList.add('li-buy');
        creat_li.appendChild(input_name)
        creat_li.appendChild(p_amount)
        creat_li.appendChild(input_amount)
        creat_li.appendChild(p_piece)
        creat_li.appendChild(p_sum)
        creat_li.appendChild(input_price)
        creat_li.appendChild(p_bath)
        creat_li.appendChild(button_delete)

}

function editBasket(id,amount_Pv,price_Pv){
        const priceSum_edit = document.getElementById(`priceProducts${id}`)
        const amount_edit = document.getElementById(`amountProducts${id}`)
                priceSum_edit.setAttribute('value',amount_Pv*price_Pv)
                amount_edit.setAttribute('value',amount_Pv)
}

function SumSet(){
        sumAmount_vals=0;
        sum_Pv =0 ;

        Array_amount_P.forEach(e=>{
                sumAmount_vals += parseInt(e.getAttribute('value'))
        })
        Array_price_P.forEach(e=>{
                sum_Pv += parseInt(e.getAttribute('value'))
        })

        sum_PriceAll.setAttribute('value',sum_Pv)
        sum_Amount.setAttribute('value',sumAmount_vals);
}
  
function delete_libuythis(id){
        const li_this = document.getElementById(`li_buythis${id}`)
              li_this.remove();
}









