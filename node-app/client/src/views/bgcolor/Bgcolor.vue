<template>
    <div class="bgcolor">
        <div class="mban">
            <div class="title">乐学教育</div>
            <p class="text">专注线上教育,用心做教育,用心做服务!</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"bgcolor"   
}
</script>
<style lang="scss" scoped>
.bgcolor{
    width: 100%;
    height: 100%;
    text-align: center;
    color:#fff;
    background: url(../../assets/350.jpg) no-repeat;
    background-size: 100% 100%;
    position: relative;
    .mban{
       background: rgba(0,0,0,.6) ;
       width: 100%;
       height: 100%;
       position: absolute;
       top:0;
       left:0;
    .title{
            font-size: 16px;  
            font-weight: 600;
            padding-top:100px;
        }
        .text{
            font-size: 14px;
            margin-top:20px;
            font-weight: 600;
        }

    }
}

</style>