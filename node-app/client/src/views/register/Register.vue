<template>
    <div class="register">
        <div class="form-contai">
            <div class="title">乐学教育管理平台</div>
   <el-form :model="ruleUser" :rules="rules" ref="ruleForm" label-width="80px" class="ruledom">
    <el-form-item label="用户名" prop="name" >
       <el-input v-model="ruleUser.name" placeholder="请输入用户名"></el-input>
    </el-form-item>
   <el-form-item label="邮箱" prop="email">
       <el-input v-model="ruleUser.email" placeholder="请输入邮箱"></el-input>
   </el-form-item>   
   <el-form-item label="密码" prop="password" >
       <el-input type="password" v-model="ruleUser.password" placeholder="请输入密码"></el-input>
   </el-form-item>
   <el-form-item label="确认密码" prop="password2" >
       <el-input type="password" v-model="ruleUser.password2" placeholder="确认密码"></el-input>
   </el-form-item>

   <el-form-item label="选择身份" prop="age">
      <el-select v-model="ruleUser.identity" placeholder="请选择身份">
        <el-option label="管理员" value="guanliyuan" ></el-option>
        <el-option label="员工" value="yuangong" ></el-option>
      </el-select>
   </el-form-item>

   <el-form-item>
       <el-button type="primary" @click="submitForm('ruleForm')" class="butWidth">注册</el-button>
   </el-form-item>
</el-form> 
        </div>
    </div>
</template>
<script>
export default {
    name:"register",
    components:{},
    data(){
          var validatePass2 = (rules, value, callback) => {
             if (value !== this.ruleUser.password) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
        return  {
        ruleUser:{
            name:"",
            email:"",
            password:'',
            password2:"",
            identity :""
            },
        rules:{
            name:[{
                    required:true,
                    message:"用户名不能为空",
                    trigger:"blur"
                },
                {
                    min:2,
                    max:18,
                    message:"字符长度在2-18之间"
                }],
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
            ],
            password2:[
                    {
                         required:true,
                         message:"确认密码不能为空",
                         trigger:"blur"
                        },
                {
                    validator:validatePass2,
                    message:"两次密码输入不一致",
                    trigger:"blur",
                }
            ]
          }
        }    
    },
        methods: {
               submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                     
                    this.$axios.post("/api/users/register",this.ruleUser,)
                    .then(res=>{
                        //注册成功
                        this.$message({
                     message: '注册成功,请登录!',
                     type:"success"
                         });
                     })
                    this.$router.push('/login')  
                    } else {
                    console.log('error submit!!');
                    return false;
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
.register{
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
      text-align:center;
      .title{
          font-family: "微软雅黑";
          font-weight: bold;
          font-size:20px;
          color:#ccc;
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
  }
     

}
</style>