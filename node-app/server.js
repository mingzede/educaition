const express = require('express');
// const mongoose = require("mongoose");
 const mongoose = require("mongoose");

const bodyParser =require("body-parser");
const passport =require("passport");
const app = express();
const port = process.env.PORT||5000;//配置端口
const users =require("./routers/api/user")//引入routers
const profile = require("./routers/api/profile")
//连接数据库
mongoose.connect('mongodb://localhost:27018',{ useUnifiedTopology: true },(err)=>{
   if(err){
       console.log('连接数据库失败');
   }else{
       console.log('连接数据库成功');
   }
})
//使用bodyparser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//将文件传递进config文件进行处理
require("./config/passport")(passport);

//passport 初始化
app.use(passport.initialize());

app.get("/",(req,res)=>{//设置路由
   res.send("niha000")
})

//使用routers
app.use('/api/users',users);
app.use('/api/profile',profile)

//请求服务
app.listen(port,()=>{
    console.log("5000服务器开启")
})

