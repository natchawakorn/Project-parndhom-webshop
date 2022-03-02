const express = require('express')
const path = require('path')
const CookieParser = require('cookie-parser')
const session = require('express-session')
const routerManage = require('./routes/routerManage')
const routerClient = require('./routes/router')

const app = express();


app.set('views',path.join(__dirname,'views'))
app.set('view egine','ejs')

app.use(express.urlencoded({extended:false}))
app.use(CookieParser())
app.use(session({secret:"parndhomsession",resave:false,saveUninitialized:false}))
app.use(routerClient)
app.use(routerManage)

app.use(express.static(path.join(__dirname,'public')));

const port = process.env.PORT || 8000 ;


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})