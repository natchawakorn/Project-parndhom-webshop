const mongoose = require('mongoose')
const dbUrl = process.env.MONGODB_URI;

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

let sessionschema = mongoose.Schema({
    Username_parndhom:String,
    Password_parndhom:String,
    session_parndhom:String
})

let Model_session = mongoose.model("pr_session",sessionschema)


module.exports = Model_session;