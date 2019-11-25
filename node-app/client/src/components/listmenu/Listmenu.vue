<template >
 <el-row class="menu"> 
  <el-col>
   <el-menu
    class="el-menu-vertical-demo listmenu"
    background-color="#324057"
    text-color="#fff"
    active-text-color="#ffd04b">
    <router-link to="/index">
     <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
         <span slot="title">首页</span>
     </el-menu-item>

        <template v-for="item in listarr">
           
            <el-submenu v-if="item.children" :index="item.id"  :key="item.id">
              <template slot="title" :index="item.id">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <router-link 
                v-for="(citem,cindex) in item.children" 
                :key="cindex"
                :to="citem.path">
                <el-menu-item>
                    <span slot="title">{{citem.name}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
           
        </template>
    
   </router-link>
</el-menu>
</el-col> 
</el-row> 

 

</template>

<script>
export default {
    name:"listmenu",
    data(){
        return{
            listarr:[
                {
                 icon:"el-icon-s-finance",
                 name:"资金管理",
                 id:"2",
                 children:[
                    {id:"3",name:"资金流水",path:"/fundlist"}
                 ]
                },
                {
                    icon:"el-icon-postcard",
                    name:"信息管理",
                    id:"3",
                    children:[
                    {id:"pimc",name:"个人信息",path:"/inshow"}
                    ]
                }
            ]
        }
    }
}
</script>
<style scoped>
.menu{
    height: calc(100% - 71px);
    width: 200px;
    z-index: 1;
    background:#324057;
    position: absolute;
    top:71px;
    left: 0;
}
 .el-menu-vertical-demo{
    width: 35px;
}
.el-menu-item{
    min-width: 200px;
}
.el-submenu {
    min-width: 200px;
}
a{
    text-decoration: none;
} 
  
</style>