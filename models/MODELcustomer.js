const mongoose = require('mongoose')

const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connect success"))
.catch(err=>console.log(err))

let customerSchema = mongoose.Schema({
    Order_No:String,
  product_IDs:Array,
  nameProducts: Array,
  amountProducts: Array,
  priceProducts: Array,
  priceSum: Number,
  amountSum: Number,
  shipping: Number,
  shipping_Discount:Number,
  total_pay: Number,
  customer_sex: String,
  customer_name: String,
  customer_lastname: String,
  customer_phone: String,
  customer_email: String,
  customer_address: String,
  customer_provine: String,
  customer_district: String,
  customer_subdistrict:String,
  customer_zipcode: String,
  customer_slipname: String,
  customer_timebuy: String,
  tracking_No: String,
  shipping_status:String,
  customer_status:String,
  customer_timeapprove:String

})

const Model_customer = mongoose.model("th_customer",customerSchema)

module.exports = Model_customer;

module.exports.saveCustomer = function(model,data){
    model.save(data)
}