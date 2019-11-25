<template>
    <div class="index">
       <Header></Header>
       <Listmenu></Listmenu>
       <div class="rightstyle">
        <router-view></router-view>
       </div>  
    </div>
</template>
<script>
import Header from "../../components/heder/Header"
import Listmenu from "../../components/listmenu/Listmenu"
export default {
    name:"index",
    components:{
        Header,
        Listmenu
    }   
}
</script>
<style scoped lang="scss">
  .index{
      height: 100%;
      width: 100%;
      overflow: hidden;
      .rightstyle{
        position: relative;
        top:0;
        left: 200px;
        width: calc(100% - 200px);
        height: calc(100% - 71px);
      }
  }
</style>