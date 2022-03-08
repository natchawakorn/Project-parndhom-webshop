const mongoose = require('mongoose')
const dbUrl = process.env.MONGO;

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connect success"))
.catch(err=>console.log(err))

let sessionschema = mongoose.Schema({
    Username:String,
    Password:String,
    session:String
})

let Model_session = mongoose.model("pr_session",sessionschema)


module.exports = Model_session;