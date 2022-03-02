const express = require('express');
const router = express.Router();
const Model_product = require('../models/MODELproduct')
const Model_profile = require('../models/MODELprofilebrand')
const Model_customer = require('../models/MODELcustomer')
const Homepage = require('../models/MODELhompage')

const multer = require('multer');



const storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'./public/image/slip')
    },
    filename:function(req,file,cb){
        cb(null,"slip_"+req.body.Order_No+"_"+req.body.customer_phone+".jpg")
    }
})

const upload = multer({
    storage:storage
})


function thisTime() {
    let hours = new Date().getHours();
    let minute = String(new Date().getMinutes()).padStart(2,"0");
    let dd =new Date().getDate();
    let dm = String(new Date().getMonth()+1).padStart(2,"0");
    let dy = new Date().getFullYear();
    let today = `${dd}/${dm}/${dy+543} เวลา ${hours}:${minute}น.`
    return today;
}


router.get('/',(req,res)=>{
    Model_profile.find().exec((err,docProfile)=>{
        Homepage.advert.find().exec((err,docAdvert)=>{
            Homepage.popular.find().exec((err,docPopular)=>{
                Homepage.content.find().exec((err,docContent)=>{
                    res.render('index.ejs',{profile:docProfile,advert:docAdvert,popular:docPopular,content:docContent})
                })
            })

        })
    })
})

router.get('/howtoBuy',(req,res)=>{

Model_profile.find().exec((err,docProfile)=>{

    res.render('clienHowtoBuy.ejs',{profile:docProfile})
    })
})



router.get('/selectProduct',(req,res)=>{

    Model_product.find().exec((err,product)=>{
        Model_profile.find().exec((err,docProfile)=>{
        res.render('clientSelectProduct.ejs',{product:product,profile:docProfile})
        })
    })
})


router.get('/topayment',(req,res)=>{
    

    if(req.query.sum_Amount == '0'){
        res.redirect('/selectProduct')
    }else{
        const product_IDs = req.query.product_IDs;
        const valume = req.query.amountProducts;
        const order = req.query.nameProducts;
        const prices = req.query.priceProducts;
        const dis_ship = 50;
        const sum_Amount = req.query.sum_Amount;
        const pays = parseInt(req.query.sum_Prices) + parseInt(dis_ship);
        const pay_total = parseInt(pays) - parseInt(dis_ship) ;
        const Order_No = req.query.Order_No

        Model_profile.find().exec((err,docProfile)=>{
            Homepage.provinces.find().exec((err,docProvince)=>{
                res.render('clientPayment.ejs',
                {
                    profile:docProfile,
                    Order:order,
                    Valume:valume,
                    Prices:prices,
                    Dis_ship:dis_ship,
                    Pays: pays,
                    TotalPay: pay_total,
                    product_IDs:product_IDs,
                    Order_No:Order_No,
                    amountSum:sum_Amount,
                    province:docProvince
                })
            })
        })
    }
})

let dataCustumer = new Object();
router.post('/checkTOpay',upload.single("customer_slipname"),(req,res)=>{
    
    let data ={
        Order_No:req.body.Order_No,
        product_IDs: req.body.product_IDs,
        nameProducts: req.body.nameProducts,
        amountProducts: req.body.amountProducts,
        priceProducts: req.body.priceProducts,
        priceSum: req.body.priceSum,
        amountSum:req.body.amountSum,
        shipping: req.body.shipping,
        shipping_Discount: req.body.shipping_Discount,
        total_pay: req.body.total_pay,
        customer_sex: req.body.customer_sex,
        customer_name: req.body.customer_name,
        customer_lastname: req.body.customer_lastname,
        customer_phone: req.body.customer_phone,
        customer_email: req.body.customer_email,
        customer_address: req.body.customer_address,
        customer_provine: req.body.customer_provine,
        customer_district: req.body.customer_district,
        customer_subdistrict:req.body.customer_subdistrict,
        customer_zipcode:req.body.customer_zipcode ,
        customer_slipname:req.file.filename,
        customer_timebuy: thisTime()
    };
    dataCustumer = data;
    Model_profile.find().exec((err,docProfile)=>{
    
        res.render('clientConfirmOrder.ejs',{profile:docProfile,data:data})
    })
})


router.post('/confirmPay',(req,res)=>{
 

     data = new Model_customer({
        Order_No:dataCustumer.Order_No,
        product_IDs:dataCustumer.product_IDs,
        nameProducts: dataCustumer.nameProducts,
        amountProducts: dataCustumer.amountProducts,
        priceProducts: dataCustumer.priceProducts,
        priceSum: dataCustumer.priceSum,
        amountSum: dataCustumer.amountSum,
        shipping: dataCustumer.shipping,
        shipping_Discount:dataCustumer.shipping_Discount,
        total_pay: dataCustumer.total_pay,
        customer_sex: dataCustumer.customer_sex,
        customer_name: dataCustumer.customer_name,
        customer_lastname: dataCustumer.customer_lastname,
        customer_phone: dataCustumer.customer_phone,
        customer_email: dataCustumer.customer_email,
        customer_address: dataCustumer.customer_address,
        customer_provine: dataCustumer.customer_provine,
        customer_district: dataCustumer.customer_district,
        customer_subdistrict:dataCustumer.customer_subdistrict,
        customer_zipcode: dataCustumer.customer_zipcode,
        customer_slipname: dataCustumer.customer_slipname,
        customer_timebuy: dataCustumer.customer_timebuy,
        customer_status:'requestbuy',
        tracking_No: '',
        shipping_status:'ยังไม่จัดส่ง'
        })
      
    Model_profile.find().exec((err,docProfile)=>{
        Model_customer.saveCustomer(data,(err)=>{
            if(err){console.log(err)}
            res.render('clientStatusOrder.ejs',{profile:docProfile,Order_No:dataCustumer.Order_No,status:"สั่งซื้อเรียบร้อย ระบบกำลังตรวจสอบ",name:dataCustumer.customer_name,lastname:dataCustumer.customer_lastname,address:`${dataCustumer.customer_address} ${dataCustumer.customer_subdistrict}`,tracking:"รออัพเดรต"})
        })
    })
})



router.post('/checkOrder',(req,res)=>{
    const check_order = req.body.check_order;
 
    Model_profile.find().exec((err,docProfile)=>{
        Model_customer.findOne({Order_No:check_order}).exec((err,order)=>{
            if(order === null){
                res.render('clientStatusOrder.ejs',{profile:docProfile,Order_No:"",status:"ไม่พบข้อมูล",name:"ไม่พบข้อมูล",lastname:"ไม่พบข้อมูล",address:"ไม่พบข้อมูล",tracking:"ไม่พบข้อมูล"})
            }else if(order.shipping_status ==='ยังไม่จัดส่ง' && order.customer_status ==='requestbuy'){
                res.render('clientStatusOrder.ejs',{profile:docProfile,Order_No:check_order,status:"ระบบกำลัง ตรวจสอบข้อมูล",name:order.customer_name,lastname:order.customer_lastname,address:`${order.customer_address} ${order.customer_subdistrict}`,tracking:"รออัพเดรต"})
            }else if(order.shipping_status ==='ยังไม่จัดส่ง' && order.customer_status ==='approve'){
                res.render('clientStatusOrder.ejs',{profile:docProfile,Order_No:check_order,status:"ยืนยันการชำระแล้ว รอจัดส่ง",name:order.customer_name,lastname:order.customer_lastname,address:`${order.customer_address} ${order.customer_subdistrict}`,tracking:order.tracking_No})
            }else if(order.shipping_status ==='กำลังจัดส่ง'){
                res.render('clientStatusOrder.ejs',{profile:docProfile,Order_No:check_order,status:"ยืนยันการชำระแล้ว รอจัดส่ง",name:order.customer_name,lastname:order.customer_lastname,address:`${order.customer_address} ${order.customer_subdistrict}`,tracking:order.tracking_No})
            }else if(order.shipping_status ==='จัดส่งแล้ว'){
                res.render('clientStatusOrder.ejs',{profile:docProfile,Order_No:check_order,status:"จัดส่งเรียบร้อย",name:order.customer_name,lastname:order.customer_lastname,address:`${order.customer_address} ${order.customer_subdistrict}`,tracking:order.tracking_No})
            }else if(order.shipping_status ==='พัสดุตีกลับ'){
                res.render('clientStatusOrder.ejs',{profile:docProfile,Order_No:check_order,status:"พัสดุตีกลับ ไม่มีคนรับ",name:order.customer_name,lastname:order.customer_lastname,address:`${order.customer_address} ${order.customer_subdistrict}`,tracking:order.tracking_No})
            }
        })
    })
})








module.exports = router;