const mongoose = require('mongoose')
const dbUrl = process.env.MONGO;

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("connect success")})
.catch(err=>console.log(err))

//Schema
let productSchema = mongoose.Schema({
    product_ID:String,
    product_Name:String,
    product_Price:Number,
    product_Amount:Number,
    product_Detail:String,
    Product_Type:String
})


const Model_product = mongoose.model("TH_products",productSchema)

module.exports = Model_product;

module.exports.saveProduct = function(model,prodcut_insert){
    model.save(prodcut_insert)
}