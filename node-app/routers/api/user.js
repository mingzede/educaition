const exporess =require("express");
const router =exporess.Router();
const User = require("../../module/User");//引入数据库表格模块
const bcrypt = require("bcrypt");//引入第三方加密插件
const gravatar =require("gravatar")//引入第三方头像生成工具
const jwt =require("jsonwebtoken")//token
const passport =require("passport");//验证token
router.get('/test',(req,res)=>{
    res.json({msg:"login"})
}) 

//post请求 注册接口
router.post("/register",(req,res) =>{
    //判断邮箱是否在数据库中
    User.findOne({email:req.body.email})
       .then((user)=>{
           if(user){
            return res.status(400).json("邮箱已被注册!")
           }else{//如果不存在就将用户信息存储进数据库
            //头像插件  获取头像需要在网站进行全球注册
            const  avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
               const newUser =new User({
                   name:req.body.name,
                   email:req.body.email,
                   avatar:avatar,
                   password:req.body.password,
                   identity:req.body.identity
               })
    bcrypt.genSalt(10, function(err, salt) {//加密配置 saltRounds =10加密模式
    bcrypt.hash(newUser.password, salt, (err, hash) =>{//user.password要加密的数据
        // Store hash in your password DB.
        if(err) throw err;//如果有错误抛出错误
        //如果没有错误就使用加密后的密码
            newUser.password=hash;
            newUser.save()//调用存储方法 将数据存进数据库
                   .then(user=>res.json(user)) //存储成功
                   .catch(err=>console.log(err))//存储失败 
                });
            });
           }
       })
})

//登录接口
router.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({email})
        .then( user => {
            if(!user){
                return res.status(404).json("邮箱不存在")
            }  //如果用户存在进行加密 密码匹配
                bcrypt.compare(password, user.password) 
                      .then(isMatch=>{
                          if(isMatch){
                              //jwt.sign(规则,加密名字,{过期时间},箭头函数)
                              const rule = {
                                id:user.id,
                                email:user.email,
                                name:user.name,
                                avatar:user.avatar,
                                identity:user.identity
                            }
                              jwt.sign(rule,"secret",{expiresIn:36000},(err,token)=>{//"secret"加引号
                                  if(err) throw err;
                                  res.json({
                                      success:true,
                                      token:"Bearer "+token//必须格式
                                  })
                              })
                          }else{
                              return res.status(400).json("密码错误")
                          }
                      })
        })
})

//验证token
router.get("/yanzheng",passport.authenticate('jwt',{ session:false}),(req,res)=>{
     res.json({
         id:req.user.id,
         name:req.user.name,
         email:req.user.email,
         identity:req.user.identity
     })
})
module.exports =router;