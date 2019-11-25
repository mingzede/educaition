<template>
<div class="fillheader">
<div class="navrRight clearfloat">
    <el-form :inline="true" ref="add_data" :model="and_date">
    <el-form-item label="按照时间筛选:" class="datacre">
     <el-date-picker
          v-model="and_date.starTime"
          type="datetime"
          placeholder="选择开始时间">
     </el-date-picker>
     --
    <el-date-picker
        v-model="and_date.outTime"
        type="datetime"
        placeholder="选择结束时间">
    </el-date-picker>
    <el-button 
            type="primary" 
            size="small" 
            icon="view" 
            @click="handledate"
            >筛选</el-button>
    </el-form-item>    
<!-- 添加按钮 -->
    <el-form-item class="butRight">
        <el-button 
        type="primary" 
        size="small" i
        con="view" 
        @click="handleAdd"
        v-if="user.identity=='guanliyuan'"
        >添加</el-button>
    </el-form-item>
    </el-form>
</div>
<!-- 表格 -->
<div class="fillmain">
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
    <el-table-column property="date" label="日期" width="200" align="center"></el-table-column>
    <el-table-column property="type" label="收支类型" width="150" align="center"></el-table-column>
    <el-table-column property="describe" label="收支描述" width="100" align="center">
    <template slot-scope="scope">
        <span style="color:#00d053"> {{scope.row.describe}}</span>
    </template>
    </el-table-column>
    <el-table-column property="incode" label="收入" width="120" align="center">
        <template slot-scope="scope">
            <span style="color:#00d053"> {{scope.row.incode}}</span>
        </template>
    </el-table-column>
    <el-table-column property="expend" label="支出" width="120" align="center">
        <template slot-scope="scope">
            <span style="color:#f56767"> {{scope.row.expend}}</span>
        </template>
    </el-table-column>
    <el-table-column property="cash" label="现金" width="120" align="center">
        <template slot-scope="scope">
            <span style="color:#00d053"> {{scope.row.cash}}</span>
        </template>
    </el-table-column>
    <el-table-column property="remark" label="备注" width="200" align="center"></el-table-column>
    <el-table-column label="操作"
    v-if="user.identity=='guanliyuan'"
     width="220" align="center">
      <template slot-scope="scope">
        <el-button size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!--分页 -->
  <el-row>
      <el-col :span="24">
         <div class="pagation">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.page_index"
          :page-sizes="pagination.page_sizes"
          :page-size="pagination.page_size"
          :layout="pagination.layout"
          :total="pagination.total"
          >
          </el-pagination>
         </div>
      </el-col>
  </el-row>
  </div>
  <!-- 添加,编辑弹出对话框 -->
  <Adding :dialog="dialog" :formdata="formdata" @created="getprofil"></Adding>
</div>

</template>
<script>
import Adding from "../fundlist/children/Adding"
export default {
  name: "fundlist",
  components:{
      Adding
  },
  computed:{
      user(){//v-if权限
          return this.$store.getters.user
      }
  },
  data() {
    return {
      and_date:{
          starTime:"",//开始时间
          outTime:""//结束时间
      },
      pagination:{
          page_index:1,//当前显示页
          total:0,//总数
          page_size:10,//一页显示多少条
          page_sizes:[5,10,15,20],//每页显示多少条
          layout:"total,sizes,prev,pager,next,jumper"//翻页属性
        },
      fileTabDate:[],
      alltableData:[],
      tableData: [],
      formdata:{
            type:"",
            describe:"",
            incode:"",
            expend:"",
            cash:"",
            remark:"",
            id:""
        },
      dialog:{
          show:false,
          title:"",
          option:"edit"
      }
    };
  },
  created() {
      this.getprofil();   
  },
  methods: {
    //获取表格数据
    getprofil() {
      this.$axios
        .get("/api/profile")
        .then(res => {
            //存储所有数据
          this.alltableData = res.data;
          //存储所有时间数据
          this.fileTabDate = res.data;
          //设置所有分页数据
           this.setpagination();
           //
        })
        .cath(err => {
             console.log(err)
        })
    },
    //编辑
    handleEdit(index,row){
         this.dialog={
             show:true,
             title:"修改资金信息",
             option:"edit"
         },
         this.formdata={
             type:row.type,
             describe:row.describe,
             incode:row.incode,
             expend:row.expend,
             cash:row.cash,
             remark:row.remark,
             id:row._id
         }
    },
    //删除
    handleDelete(index,row){
        this.$axios.delete(`api/profile/delete/${row._id}`)
        .then(res=>{
            this.$message({
                message:"删除成功!",
                type:"success"
            });
            //隐藏对话框
            this.dialog.show=false;
            this.getprofil();
        })
    },
    //添加
    handleAdd(){
    this.dialog={
            show:true,
            title:"添加资金信息",
            option:"add"
            }
    },
    setpagination(){
        //分页属性设置
        this.pagination.total = this.alltableData.length;
        this.pagination.page_index = 1 ;
        this.pagination.page_size = 5 ;
        //设置默认的分页数据 5
        this.tableData = this.alltableData.filter((item,index)=>{
            return index < this.pagination.page_size;
        })
    },
    handleSizeChange(page_size){
        //切换size 每页/数量
            this.pagination.page_index = 1 ;
            this.pagination.page_size = page_size ;
            //设置默认的分页数据 5
            this.tableData = this.alltableData.filter((item,index)=>{
                return index < page_size;
            })
    },
    handleCurrentChange(page){
        //获取当前 页
        let index =this.pagination.page_size * (page - 1);
        //数据的总数
        let nums =this.pagination.page_size * page;
        //容器
        console.log(nums)
        let table = [];

        for(let i=index; i<nums ; i++){
            if(this.alltableData[i]){
              table.push(this.alltableData[i]);
            }
            this.tableData =table;
        }
    },
    //筛选
    handledate(){
      //判断开始时间和结束时间是否为空
      if(!this.and_date.starTime ||  !this.and_date.outTime){
          this.$message({
              message:"请选择时间区间!",
              type:"waring"
          })
          this.getprofil();//没有筛选重新请求数据
          return;
      }
      //获取时间
      const sTime = this.and_date.starTime.getTime();//获取选择的开始时间
      const oTime = this.and_date.outTime.getTime();//获取选择的结束时间
      //过滤数据,将过滤的数据存进alldata中
      this.alltableData = this.fileTabDate.filter(item=>{
          let date = new Date(item.date);//将全部数据时间转格式
          console.log(date)
          let time =date.getTime();//获取到对应的时间
          console.log(time)
          return time >= sTime && time <= oTime ;
      });
          this.setpagination();//调用分页数据
    }
  }
};
</script>
<style lang="scss" scoped>
.fillheader{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    .datacre{
        margin:10px 20px;
    .el-button{
        margin:0 22px;
    }

    }
.butRight{
    float: right;
    margin:10px 55px 0;
    }
    .fillmain{
     width: 100%;
     height: 100%;
        .pagation{
            float: right;
            margin-right: 55px;
        }
        .el-button{
           margin:0 22px;
        }
    }
}
</style>