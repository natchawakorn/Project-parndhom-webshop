const form_buyer = document.getElementById('form_buyer');
const buyer_name = document.getElementById('buyer_name');
const buyer_lastname = document.getElementById('buyer_lastname')
const buyer_phone = document.getElementById('buyer_phone');
const buyer_email = document.getElementById('buyer_email');
const buyer_address = document.getElementById('buyer_address');
const buyer_provine = document.getElementById('buyer_provine');
const buyer_district = document.getElementById('buyer_district');
const buyer_subdistrict = document.getElementById('buyer_subdistrict');
const buyer_zipcode = document.getElementById('buyer_zipcode');
const buyer_slip = document.getElementById('buyer_slip');
const buyer_sex = document.getElementById('buyer_sex')



form_buyer.addEventListener('submit',function(e){

    checkInput([buyer_name,buyer_lastname,buyer_phone,buyer_email,buyer_address,buyer_provine,buyer_district,buyer_subdistrict,buyer_zipcode,buyer_slip])
   //buyer_email
   if(!validateEmail(buyer_email.value.trim())){
        showError(buyer_email,'อีเมลไม่ถูกต้อง');
        e.preventDefault();
   }
   else{
       showSuccess(buyer_email);
   }

   if(!checkPhone(buyer_phone.value.trim())){
        showError(buyer_phone,'เบอร์โทรไม่ถูกต้อง');
        e.preventDefault();
   }
   if(buyer_slip.value===''){
        showError(buyer_slip,'กรุณาแนบสลิปเงินโอน');
        e.preventDefault();
   }
    if(!checkZipcode(buyer_zipcode.value.trim())){
    showError(buyer_zipcode,'กรุณาใส่รหัสไปรษณีย์ให้ถูกต้อง')
    e.preventDefault();
  }

  let maxFileSize = 300000;
  let file = document.querySelector('[type="file"]')
 
    if(file.files[0].size > maxFileSize){
        alert('ไฟล์เกินขนาด กรุณาเลือกใหม่')
        e.preventDefault();
    }

});


function showError(input,message) {
    const formcontrol = input.parentElement;
    formcontrol.className = 'form-control error';
    const small = formcontrol.querySelector('small');
    small.innerText = message;
   
}

function showSuccess(input) {
    const formcontrol = input.parentElement;
    formcontrol.className = 'form-control success';
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  };


  function checkInput(inputArray) {
      inputArray.forEach(function(input) {
          if(input.value.trim()===''){
              showError(input,'กรุณาป้อนข้อมูล');
          }else{
              showSuccess(input);
          }
      })
  }

function checkZipcode(input) {
    var regExp = /[0-9]{5}$/i;
    return regExp.test(input);
}

  function checkPhone(input){
    var regExp = /^0[0-9]{9}$/i;
    return regExp.test(input);
}


