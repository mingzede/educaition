<template>
<div class="adding">
   <el-dialog 
   :visible.sync="dialog.show"
   :title="dialog.title"
   :close-on-click-modal="false"
   :close-on-press-escape="false"
   :modal-append-to-body="false"
   >  
  <div class="formlist">
      <el-form
       ref="form" 
       :model="formdata"
       :rules="form_rulse" 
       label-width="120px" 
       style="margin:10px;width:auto">
       <el-form-item label="收支类型:">
         <el-select v-model="formdata.type" placeholder="收支类型">
             <el-option  
             v-for="(item,index) in fromSelect" 
             :key="index"
             :lable="item"
             :value="item">
             </el-option>
         </el-select> 
        </el-form-item>
        <el-form-item class="distyep" label="收支描述:" prop="describe" >
            <el-input type="describe" v-model="formdata.describe"></el-input>
        </el-form-item>
        <el-form-item class="distyep" label="收入:" prop="incode">
            <el-input type="incode" v-model="formdata.incode"></el-input>
        </el-form-item>
        <el-form-item class="distyep" label="支出:" prop="expend">
                <el-input type="expend" v-model="formdata.expend"></el-input>
        </el-form-item>
        <el-form-item class="distyep" label="账户现金:" prop="cash">
                <el-input tyep="cash" v-model="formdata.cash"></el-input>
        </el-form-item>
        <el-form-item class="distyep" label="备注" prop="remark">
                <el-input type="remark" v-model="formdata.remark"></el-input>
        </el-form-item>
        <el-form-item class="noYes" >
            <el-button type="info" @click="formCacel">取消</el-button>
            <el-button type="primary" @click="formSubmit('form')">提交</el-button>
        </el-form-item>

      </el-form>
  </div>
</el-dialog>
</div>
</template>
<script>
export default {
  name: "adding",
  props:{
      dialog:Object,
      formdata:Object
  },
  data(){
      return{
          fromSelect:["提现","提现手续费","充值","优惠券","充值优惠券","转账"],
          form_rulse:{
                describe:[{required:true,message:"描述不能为空",trigger:"blur"}],
                incode:[{required:true,message:"收入不能为空",trigger:"blur"}],
                expend:[{required:true,message:"支出不能为空",trigger:"blur"}],
                cash:[{required:true,message:"账户现金不能为空",trigger:"blur"}]
            }
          } 
      },
      methods:{
          formCacel(){
              this.dialog.show=false;
              this.formdata.type='';
              this.formdata.describe='';
              this.formdata.incode='';
              this.formdata.expend='';
              this.formdata.cash='';
              this.formdata.remark='';
          },
        formSubmit(formlist){
          this.$refs[formlist].validate((valid)=>{
              if(valid){
                  const url = this.dialog.option=="add" ? "add" : `edit/${this.formdata.id}`
                  this.$axios.post(`/api/profile/${url}`,this.formdata)
                  .then(res=>{
                      if(url=="add"){
                         this.$message({
                              message:"添加成功!",
                              type:"success"
                          });
                      }else{
                        this.$message({
                            message:"修改成功!",
                            type:"success"
                        });

                      }
                      
                      //隐藏对话框
                      this.dialog.show=false;
                      this.$emit("created");//给父组件子组件标签绑定一个方法调用getprofil重新获取 数据
                  })
              }
          })
        }
      }
  }
</script>
<style lang="scss" scoped>
.adding{
    width: 100%;
    height: 100%;
    .formlist{
        height: 100%;
        width: 100%;
    }
}

</style>