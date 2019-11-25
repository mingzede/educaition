    <template>
        <div class="inshow">
           <el-row type="flex" class="row-bg" justify="center">
             <el-col :span="6">
               <div class="useravatar">
                 <img :src="user.avatar" alt="" class="avatar">
                 <p>{{user.name}}</p>
               </div>
             </el-col>
            <el-col :span="18">
              <div class="userName">
                  <div class="user-item">
                     <i class=" el-icon-user-solid"></i>
                     <span>{{user.name}}</span>
                  </div>
                  <div class="user-item">
                    <i class="el-icon-message"></i>
                    <span>{{user.email}}</span>
                  </div>
                  <div class="user-item">
                    <i class="el-icon-s-custom"></i>
                    <span>{{user.identity=="guanliyuan" ? "管理员" : "员工"}}</span>
                </div>
              </div>
            </el-col>
           </el-row>
        </div>
    </template>
    <script>
    export default {
        name:"inshow",
        computed:{
            user(){
                return this.$store.getters.user;
            }
        }   
    }
    </script>
    <style lang="scss" scoped>
    .inshow{
        height: 100%;
        width: 100%;
        display: inline-block;
        .el-row{
            height: 100%;
            .useravatar{
                height: 100%;
                text-align: center;
                padding-top:30%;
                .avatar{
                 display: inline-block;
                 border-radius: 50%;
                }
                p{
                    text-align: center;
                }
            }
        }
        .useravatar{
            height: 100%;
            background: #eee;
        }
        .userName{
            background: #5656;
            height: 100%;
            padding-top:20%;
            .user-item{
                margin-bottom: 10px;
                span{
                    margin-left: 4px;
                }
            }
        }  
    }
    </style>
