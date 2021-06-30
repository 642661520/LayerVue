<template>
  <h3>一、开关测试</h3>
  <h4>
    1.内容区是文本,destroyOnClose:true,
    <button @click="test1.visible = !test1.visible">测试按钮</button>
    窗口状态:{{ test1.dom }}
  </h4>
  <layer-vue
    v-model:visible="test1.visible"
    :destroyOnClose="true"
    :maxmin="[1, 1]"
    :skin="{
      title:{
        color:'#bfa',
        background:'#5ba'
      }}"
    :success="success1"
    :cancel="cancel1"
    :end="end1"
    >1.内容区是文本,destroyOnClose:true</layer-vue
  >
  <h4>
    2.内容区是文本,destroyOnClose:false,
    <button @click="test2.visible = !test2.visible">测试按钮</button>
    窗口状态:{{ test2.dom }}
  </h4>
  <layer-vue
    v-model:visible="test2.visible"
    :destroyOnClose="false"
    :maxmin="[1, 1]"
    skin="mac"
    :success="success2"
    :cancel="cancel2"
    :end="end2"
    >1.内容区是文本,destroyOnClose:false</layer-vue
  >
</template>

<script>
export default {
  data() {
    return {
      test1: { visible: false, dom: "待测试" },
      test2: { visible: false, dom: "待测试" },
    };
  },
  methods: {
    success1() {
      console.log("success1");
      this.test1.dom = "打开了";
    },
    cancel1() {
      console.log("cancel1");
      this.test1.dom = "隐藏了";
    },
    end1() {
      console.log("end1");
      this.test1.dom = "销毁了";
    },
    success2() {
      console.log("success2");
      this.test2.dom = "打开了";
    },
    cancel2() {
      console.log("cancel2");
      this.test2.dom = "隐藏了";
    },
    end2() {
      console.log("end2");
      this.test2.dom = "销毁了";
    },
  },
};
</script>

<style></style>
