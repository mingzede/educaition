const exporess =require("express");
const router =exporess.Router();
const Profile = require("../../module/Profile");//引入数据库表格模块
const passport =require("passport");//验证token
//测试接口     
// router.get('/test',(req,res)=>{
//     res.json({msg:"profile"})
// }) 

//添加接口 
router.post("/add",passport.authenticate('jwt',{ session:false}),(req,res)=>{
    const profileFie ={};
    if(req.body.type) profileFie.type = req.body.type;
    if(req.body.describe) profileFie.describe = req.body.describe;
    if(req.body.incode) profileFie.incode = req.body.incode;
    if(req.body.expend) profileFie.expend = req.body.expend;
    if(req.body.cash) profileFie.cash = req.body.cash;
    if(req.body.remark) profileFie.remark = req.body.remark;
    //存储profileFie
    new Profile (profileFie).save().then(profile=>{
        console.log(profile)
        res.json(profile)
    })  
})

//查询所有信息
router.get("/",passport.authenticate('jwt',{ session:false}),(req,res)=>{
    Profile.find()
           .then(profile=>{
               if(!profile){
                  return res.status(404),json("内容不存在!") 
               }else{
                  return res.json(profile);
               }
           })
           .catch(err=>{
               return res.status(400).json(err)
           })
})

//查询单个信息
router.get(
    "/:id",
passport.authenticate('jwt',{ session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id})//请求id是否存在 
            .then(profile=>{
                if(!profile){
                    return res.status(404),json("内容不存在!") 
                }else{
                    return res.json(profile);
                }
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
})

//编辑信息接口 
router.post(
    "/edit/:id",
passport.authenticate('jwt',{ session:false}),(req,res)=>{
    const profileFie ={};
    if(req.body.type) profileFie.type = req.body.type;
    if(req.body.describe) profileFie.describe = req.body.describe;
    if(req.body.incode) profileFie.incode = req.body.incode;
    if(req.body.expend) profileFie.expend = req.body.expend;
    if(req.body.cash) profileFie.cash = req.body.cash;
    if(req.body.remark) profileFie.remark = req.body.remark;
    //编辑profileFie
    Profile.findOneAndUpdate(//获取id 设置编辑返回编辑后的数据
        {_id:req.params.id},
        {$set:profileFie},
        {new:true}
        ).then(profile=>res.json(profile));
})

//删除接口
router.delete(
    "/delete/:id",
passport.authenticate('jwt',{ session:false}),(req,res)=>{
    Profile.findOneAndRemove({_id:req.params.id}).then(profile=>{//根据id删除对应id的数据
        profile.save().then(profile=>res.json(profile));//将删除后的数据保存进数据库
})
.catch(err=>res.status(404).json("删除失败!"));
});
module.exports =router;