<template>
    <div class="login">
       <div class="form-contai">
                <div class="title">登录</div>
       <el-form :model="loginUser" :rules="rules" ref="ruleForm" label-width="60px" class="ruledom">
       <el-form-item label="邮箱" prop="email">
           <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
       </el-form-item>   
       <el-form-item label="密码" prop="password" >
           <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
       </el-form-item>
       <el-form-item>
           <el-button type="primary" @click="lognForm('ruleForm')" class="butWidth">登录</el-button>
       </el-form-item>
       <footer>
       <P>还没有账号?现在<router-link to="/register">注册</router-link></P>
    </footer>
    </el-form> 
    
            </div>

    </div>
</template>
<script>
import jwtcode from "jwt-decode";
export default {
    name:"login",
    components:{},
        data(){
            return  {
            loginUser:{
                name:"",
                email:"",
                password:""
                },
            rules:{
                email:[
                       {
                         required:true,
                         message:"邮箱不能为空",
                         trigger:"blur"
                        },
                    {
                        type:"email",
                        message:"邮箱格式不正确",
                        trigger:"blur",  
                    }
                ],
                password:[
                        {
                        required:true,
                        message:"密码不能为空",
                        trigger:"blur"
                            },
                      {
                        min:6,
                        max:18,
                        message:"密码长度在6-18之间",
                        trigger:"blur",    
                     }
                ]
            }
            }    
        },
        methods: {
                lognForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       this.$axios.post("/api/users/login",this.loginUser)   
                       .then(res=>{
                           //获取设置token
                           const {token} = res.data;
                           //设置到localStorage
                           localStorage.setItem("eleToken",token);
                           //解析token
                           const decode =jwtcode(token);
                           //将解析token存储到vuex中    
                            this.$store.dispatch("setAuthenticated",!this.isEmpty(decode));
                            this.$store.dispatch("setUser",decode);
                            this.$message({
                                   message:"登录成功!",
                                   type:"success"
                               });
                            this.$router.push('/index')
                       });  
                    } 
                  });
                },
        isEmpty(value){//判断值是否为空
                    return (
                        value === undefined ||
                        value === null ||
                        (typeof value==="object" && Object.keys(value).length === 0) ||
                        (typeof value==="string" && value.trim().length === 0)
                    );
                }
            }   
    }
</script>
<style lang="scss" scoped>
    .login{
      position: relative;
      height: 100%;
      width: 100%;
      background: url(../../assets/bg.jpg) no-repeat center center;
      background-size: 100% 100%;
      .form-contai{
          position:absolute;
          width: 370px;
          height:210px;
          top:10%;
          left:35%;
          padding:52px;
          border-radius: 5px;   
          .title{
              font-family: "微软雅黑";
              font-weight: bold;
              font-size:20px;
              color:#fff;
              text-align:center;
               letter-spacing:5px;  
          }
          .ruledom{
              margin-top:20px;
              background:#fff;
              padding:20px 40px 20px 20px;
              box-shadow: 0px 5px 10px #ccc;
          }
          .butWidth{
              width: 100%;
          }
          footer{
              text-align: right;
              font-size: 14px;
              a{
                  color:blue;
              }
          }
      } 
    }

</style>