<template>
  <h4>1.内容区是文本,destroyOnClose:true,不传id<button @click="open1">打开</button>
  窗口状态:{{}}</h4>
</template>

<script>
export default {
  data() {
    return {
      layer1:{index:undefined,}
    }
  },
methods:{
  open1(){
    this.layer1.index=this.$layer({

    })
  }
}
}
</script>

<style>

</style>