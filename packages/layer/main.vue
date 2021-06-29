<template>
<div>{{id}}---{{data}}</div>
</template>

<script>
export default {
name: 'LayerVue',
data() {
  return {
    id:1
  }
},
props:{
 data: { type: String, default: '1' },
}
}
</script>

<style>

</style>