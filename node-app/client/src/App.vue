<template>
  <div id="app">
    <router-view/>
  </div>
</template>
// 在根组件判断token存入vuex
<script>
    import jwtcode from "jwt-decode";
    export default {
        name:"app", 
        components:{},
    created(){
      if(localStorage.eleToken){
        const decode =jwtcode(localStorage.eleToken);
    //将解析token存储到vuex中    
    this.$store.dispatch("setAuthenticated",!this.isEmpty(decode));
    this.$store.dispatch("setUser",decode);

      }
    },
    methods: {
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

<style lang="scss">
html, body, #app{
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    color: #333;
}
</style>