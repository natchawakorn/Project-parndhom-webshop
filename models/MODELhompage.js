const mongoose = require('mongoose')
const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connect success"))
.catch(err=>console.log(err))


let advertSchema = mongoose.Schema({
    adv_header:String,
  adv_detail:String,
  adv_product:String,
  adv_price:String,
  adv_sizeProduct:String
})

let contentbrandSchema = mongoose.Schema({
    cb_header:String,
    cb_title1:String,
    cb_title2:String,
    cb_title3:String,
    cb_list1:String,
    cb_list2:String,
    cb_list3:String,
    cb_list4:String,
    cb_list5:String,
    cb_list6:String,
    cb_list7:String,
    cb_list8:String,
    cb_list9:String,
    cb_outtext:String
})

let popularSchema = mongoose.Schema({
    pop_1:String,
    pop_2:String,
    pop_3:String,
    pop_4:String,
    pop_5:String,
    pop_sell1:String,
    pop_sell2:String,
    pop_sell3:String,
    pop_sell4:String,
    pop_sell5:String
})

let cardshowSchema = mongoose.Schema({
    card_fliename:String
})

let provincesSchema = mongoose.Schema({
    created_at:String,
    geography_id:String,
    id:String,
    name_en:String,
    name_th:String,
    updated_at:String
})

const content = mongoose.model("hp_contentbrand",contentbrandSchema)
const advert = mongoose.model("hp_advert",advertSchema)
const popular = mongoose.model("hp_popular",popularSchema)
const cardshow = mongoose.model("hp_cardshow",cardshowSchema)
const provinces = mongoose.model("thai_provinces",provincesSchema)


const Homepage = {advert,content,popular,cardshow,provinces}
module.exports = Homepage;

module.exports.saveHomepageContent = function(model,data){
    model.save(data) 
}