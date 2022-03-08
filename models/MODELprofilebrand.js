const mongoose = require('mongoose')
const dbUrl = process.env.MONGO;
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connect success"))
.catch(err=>console.log(err))

let ProfileBrandschema = mongoose.Schema({
    Brand_Name:String,
    Brand_Address:String,
    Brand_Province:String,
    Brand_Subdistrict:String,
    Brand_District:String,
    Brand_Postcode:String,
    Brand_Phone:String,
    Brand_Email:String,
    Brand_Facebook:String,
    Brand_IG:String,
    Brand_Line:String,
    Brand_Youtube_1:String,
    Brand_Youtube_2:String
})

let Model_profile = mongoose.model("br_profile",ProfileBrandschema)


module.exports = Model_profile;