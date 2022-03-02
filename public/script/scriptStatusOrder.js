const val_sts = document.getElementById('val-status')
const icon_sts = document.getElementById('icon-status')

    if(val_sts.value ==""){
        icon_sts.classList.remove('fa-check-circle')
        icon_sts.classList.add('fa-times-circle')
    }

