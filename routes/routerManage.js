const express = require('express');
const routerManage = express.Router();

const fs = require('fs');

//call model
const Model_product = require('../models/MODELproduct');
const Model_profile = require('../models/MODELprofilebrand');
const Model_customer = require('../models/MODELcustomer');
const Model_session = require('../models/MODELsession');



function thisTime() {
    let hours = new Date().getHours();
    let minute = String(new Date().getMinutes()).padStart(2,"0");
    let dd =new Date().getDate();
    let dm = String(new Date().getMonth()+1).padStart(2,"0");
    let dy = new Date().getFullYear();
    let today = `${dd}/${dm}/${dy+543} เวลา ${hours}:${minute}น.`
    return today;
}



routerManage.get('/ManageOrder',(req,res)=>{
    if(req.session.loginParndhom){
        Model_customer.find({"customer_status":{$eq:"requestbuy"}}).exec((err,docCus)=>{
            res.render('ManageOrder.ejs',{doc:docCus})
        })
    }else{
        res.render('ManageLogin.ejs')
    }
  
})

routerManage.get('/ManageProfile',(req,res)=>{

    if(req.session.loginParndhom){
        Model_profile.find().exec((err,docProfile)=>{
            res.render('ManageProfile.ejs',{profile:docProfile})
        })
    }else{
        res.render('ManageLogin.ejs')
    }
})

routerManage.get('/ManageLogin',(req,res)=>{
    res.render('ManageLogin.ejs')
})

routerManage.get('/ManageAddproduct',(req,res)=>{

    if(req.session.loginParndhom){
        Model_product.find().exec((err,product)=>{
            res.render('ManageAddproduct.ejs',{product:product,edit:false})
        })
    }else{
        res.render('ManageLogin.ejs')
    }
})

routerManage.get('/ManageShipping',(req,res)=>{

    if(req.session.loginParndhom){
        Model_customer.find({"customer_status":{$eq:"approve"}}).exec((err,data)=>{

            res.render('ManageShipping.ejs',{orders:data})
        })
    }else{
        res.render('ManageLogin.ejs')
    }
  
})

routerManage.get('/ManageSuccess',(req,res)=>{
    if(req.session.loginParndhom){
        Model_customer.find({"customer_status":{$eq:"success"}}).exec((err,data)=>{
            res.render('ManageSuccess.ejs',{orders:data})
        })
    }else{
        res.render('ManageLogin.ejs')
    }
   
})

routerManage.post('/addProduct',(req,res)=>{

    if(req.session.loginParndhom){
        let prodcut_insert = new Model_product({
            product_ID:req.body.product_ID,
            product_Name:req.body.product_Name,
            product_Price:req.body.product_Price,
            product_Amount:req.body.product_Amount,
            product_Detail:req.body.product_Detail,
            Product_Type:req.body.Product_Type,
           })
           Model_product.saveProduct(prodcut_insert,(err)=>{
               if(err){
                   console.log(err)
               }
               res.redirect('/ManageAddproduct')
           })
    }else{
        res.render('ManageLogin.ejs')
    }
   
})



// ======================== delete Product ======================
routerManage.get('/delete-product/:ID',(req,res)=>{
    
    if(req.session.loginParndhom){
        const param_ID = req.params.ID;
   
        Model_product.findOneAndDelete({product_ID:param_ID}).exec(err=>{
            if(err){
                console.log(err)
            }
            res.redirect('/ManageAddproduct')
        })
    }else{
        res.render('ManageLogin.ejs')
    }

  
})


// ========================= Edite ========================
routerManage.get('/edit-product/:_id',(req,res)=>{

    
if(req.session.loginParndhom){
    const edit_ID = req.params._id;

    Model_product.find().exec((err,product)=>{
        Model_product.findOne({_id:edit_ID}).exec((err,edit)=>{
            res.render('ManageAddproduct.ejs',{product:product,edit:edit})
        })
    })
}else{
    res.render('ManageLogin.ejs')
}


  
})

// ===================== update product ======================
routerManage.post('/update-product',(req,res)=>{

    if(req.session.loginParndhom){
        const update_ID = req.body.product_ID;

        let data_edit = {
            product_ID:req.body.product_ID,
            product_Name:req.body.product_Name,
            product_Price:req.body.product_Price,
            product_Amount:req.body.product_Amount,
            product_Detail:req.body.product_Detail,
            Product_Type:req.body.Product_Type
        }
    Model_product.findOneAndUpdate({product_ID:update_ID},data_edit,{useFindAndModufy:false}).exec(err=>{
        res.redirect('/ManageAddproduct')
    })
    }else{
        res.render('ManageLogin.ejs')
    } 
  
})

// ================================ manage order ========================

routerManage.get('/apove-order/:order',(req,res)=>{

    
    if(req.session.loginParndhom){
        const order = req.params.order;

        let data_update = {
            customer_timeapprove:thisTime(),
            tracking_No: '',
            customer_status:'approve',
            shipping_status:'ยังไม่จัดส่ง'
        }
        Model_customer.findOneAndUpdate({Order_No:order},data_update,{useFindAndModufy:false}).exec(err=>{
            res.redirect('/ManageShipping')
        })
    }else{
        res.render('ManageLogin.ejs')
    }
    
})

routerManage.post('/update-shipping',(req,res)=>{
    if(req.session.loginParndhom){
        const order = req.body;
  
        let data_update = {
            shipping_status:order.shipping_status,
            tracking_No:order.tracking_No
        }
        Model_customer.findOneAndUpdate({Order_No:order.Order_No},data_update,{useFindAndModufy:false}).exec(err=>{
            
            res.redirect('/ManageShipping')
            })
    }else{
        res.render('ManageLogin.ejs')
    }
    
  
})

// --------------------- Delete Order ----------------- 
routerManage.get('/delete-order/:_ID',(req,res)=>{
    
if(req.session.loginParndhom){
    let ID = req.params._ID ;
    Model_customer.findById(ID).exec((err,doc)=>{
        try {
            fs.unlinkSync(`public/image/slip/${doc.customer_slipname}`)
            //file removed
        } catch(err) {
            console.error(err)
        };
        Model_customer.findByIdAndDelete(ID).exec(err=>{
            if(err){
                console.log(err)
            }
            res.redirect('/ManageOrder')
        })
     })
    }else{
    res.render('ManageLogin.ejs')
}

})

routerManage.get('/delete-order-success/:_ID',(req,res)=>{
    
    if(req.session.loginParndhom){
        let ID = req.params._ID ;
        Model_customer.findById(ID).exec((err,doc)=>{
            try {
                fs.unlinkSync(`public/image/slip/${doc.customer_slipname}`)
                //file removed
            } catch(err) {
                console.error(err)
            };
            Model_customer.findByIdAndDelete(ID).exec(err=>{
                if(err){
                    console.log(err)
                }
                res.redirect('/ManageSuccess')
            })
         })
        }else{
        res.render('ManageLogin.ejs')
    }
    
    })




// -------------button manage shipping ------------------
routerManage.get('/shipping-all',(req,res)=>{
    if(req.session.loginParndhom){
        res.redirect('/ManageShipping')
    }else{
        res.render('ManageLogin.ejs')
    }
  
})

routerManage.get('/shipping-No',(req,res)=>{
    if(req.session.loginParndhom){
        Model_customer.find({"shipping_status":{$eq:"ยังไม่จัดส่ง"},"customer_status":{$eq:"approve"}}).exec((err,data)=>{
            res.render('ManageShipping.ejs',{orders:data})
    })
    }else{
        res.render('ManageLogin.ejs')
    }
   
})

routerManage.get('/shipping-finish',(req,res)=>{
    if(req.session.loginParndhom){
        Model_customer.find({"shipping_status":{$eq:"จัดส่งแล้ว"}}).exec((err,data)=>{
            res.render('ManageShipping.ejs',{orders:data})
    })
    }else{
        res.render('ManageLogin.ejs')
    }
    
 
})

routerManage.get('/shipping-reject',(req,res)=>{
    if(req.session.loginParndhom){
        Model_customer.find({"shipping_status":{$eq:"พัสดุตีกลับ"}}).exec((err,data)=>{
            res.render('ManageShipping.ejs',{orders:data})
    })
    }else{
        res.render('ManageLogin.ejs')
    }
  
})

routerManage.get('/save-orderFinish/:orderNo',(req,res)=>{
    if(req.session.loginParndhom){
        const order = req.params.orderNo
        let data_update = {
            customer_status:'success'
        }

        Model_customer.findOne({Order_No:order}).exec((err,data)=>{
            const Array_ID  = data.product_IDs
    
            const Array_amount = data.amountProducts
            if(data.shipping_status === 'จัดส่งแล้ว' && data.tracking_No !== ''){

                for(let i=0; i< Array_ID.length;i++ ){
                     Model_product.findOne({product_ID:Array_ID[i]}).exec((err,dataProduct)=>{

                        let total_amount = dataProduct.product_Amount-parseInt(Array_amount[i]);
                        let update_amount = {product_Amount:parseInt(total_amount)};
                            
                            Model_product.findOneAndUpdate({product_ID:dataProduct.product_ID},update_amount,{useFindAndModufy:false}).exec(err=>{
                             console.log(err)
                        })
                     }) 
                    }
                Model_customer.findOneAndUpdate({Order_No:order},data_update,{useFindAndModufy:false}).exec(err=>{
                    res.redirect('/ManageShipping') 
                })

            }else{
                res.redirect('/ManageShipping')
            }
        })
    }else{
        res.render('ManageLogin.ejs')
    }
 
})


routerManage.post('/logintoAdmin',(req,res)=>{
        const usernameAdmin = req.body.usernameAdmin;
        const passwordAdmin = req.body.passwordAdmin;
        const timeExpireAdmin = 1000*60*60;  // 5 mins
    Model_session.findOne({session:'session'}).exec((err,data)=>{
        if(usernameAdmin === data.Username && passwordAdmin === data.Password){
            req.session.usernameAdmin = usernameAdmin;
            req.session.passwordAdmin = passwordAdmin;
            req.session.loginParndhom = true;
            req.session.cookie.maxAge = timeExpireAdmin;
            res.redirect('/ManageOrder')
        }else{
            res.render('ManageLogin.ejs')
        }
    })
   
})

routerManage.get('/ManageLogout',(req,res)=>{
    req.session.destroy((err)=>{
        res.render('ManageLogin.ejs')
    })
})




module.exports = routerManage;

