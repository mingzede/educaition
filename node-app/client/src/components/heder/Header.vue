<template>
<div class="headers">
    <el-row>
     <el-col :span="6" class="logoleft">
           <img src="../../assets/tb.jpg" class="logo">
           <span class="title">乐学在线管理系统</span>
     </el-col>
    <el-col :span="6" class="logoright">
        <div class="user">
            <img :src="user.avatar" class="avatar">
            <div class="hello">
                <p class="name welcome">欢迎!</p>
                <p class="name nameText">{{user.name}}</p>
            </div>  
            <el-dropdown  trigger="click" @command="setCommande">
            <span class="el-dropdown-link">
             <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="d" >个人信息</el-dropdown-item>
            <el-dropdown-item command="e" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>   
    </el-col>
    </el-row>  
</div>
</template>

<script>
export default {
name:"headers",
computed:{
   user(){
       return this.$store.getters.user;
   }
},
methods:{
    setCommande(com){
        console.log(com)
        switch(com){
            case "d":
                this.showNameList();
            break;
            case "e":
                this.outLogin();
            break;    
        }
    },
        //个人信息
    showNameList(){
     this.$router.push("/inshow");
    },
    //退出
    outLogin(){
     //清除token
     localStorage.removeItem("eleToken");
     //清空个人信息
    this.$store.dispatch("setClear")
    //跳转登录
    this.$router.push("/login");
    }

},

}
</script>
<style lang="scss" scoped>
.headers{
    width: 100%;
    height: 60px;
    background: #324057;
    min-width: 600px;
    color: #fff;
    border-bottom:1px solid #1f2d3d;
    padding: 5px 0;
    .logoleft{
        line-height: 60px;
        min-width: 400px;
            .logo{
                width: 45px;
                height: 45px;
                border-radius: 50%;
                margin: 0 10px;
                display: inline-block;
                vertical-align: middle;
        }
            .title{
                line-height: 60px;
                font-weight: bolder;
                font-size: 20px;
                vertical-align: middle;
                    }
    }
    .logoright{
        float:right;
        min-width: 400px;
        vertical-align: middle;
        line-height: 60px;
        .user{
            float:right;
                .avatar{
                width: 45px;
                height: 45px;
                border-radius:50%;
                display: inline-block;
                vertical-align: middle;
                }
        .hello{
            display: inline-block;
            vertical-align: middle;
            width: auto;
            padding: 0 10px;
            .name{
            text-align: center;
            font-size: 14px;
            line-height: 20px;
            }
            .nameText{
                color:#409eff; 
                cursor: pointer;
            }
            .welcome{
               font-size: 12px;
            }
        }
        .el-dropdown{
            color:#fff;
            font-size: 12px;
            margin-right: 15px;
        }
        }
    }
}   
</style>
