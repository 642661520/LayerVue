<template>
  <h3>一、开关测试</h3>
  <h4>
    1.内容区是文本,destroyOnClose:true,不传id
    <button @click="open1">打开</button>
    index:{{ layer1.index }}窗口状态:{{ layer1.dom }};测试结果：{{
      layer1.result
    }}
  </h4>
  <h4>
    2.内容区是文本,destroyOnClose:false,不传id
    <button @click="open2">打开</button>
    index:{{ layer2.index }}窗口状态:{{ layer2.dom }};测试结果：{{
      layer2.result
    }}
  </h4>
  <h4>
    3.内容区是文本,destroyOnClose:false,传id
    <button @click="open3">打开</button>
    id:{{ layer3.id }}, index:{{ layer3.index }},窗口状态:{{
      layer3.dom
    }};测试结果：{{ layer3.result }}
  </h4>
  <h4>
    4.内容区是文本,destroyOnClose:true,传id
    <button @click="open4">打开</button>
    id:{{ layer4.id }}, index:{{ layer4.index }},窗口状态:{{
      layer4.dom
    }};测试结果：{{ layer4.result }}
  </h4>
  <div  id="divtest" style="display:none">123</div>
</template>

<script>
export default {
  data() {
    return {
      layer1: { index: -1, dom: "待测试", result: "" },
      layer2: { index: -1, dom: "待测试", result: "" },
      layer3: { index: -1, dom: "待测试", result: "", id: "Ft1-layer3" },
      layer4: { index: -1, dom: "待测试", result: "", id: "Ft1-layer4" },
    };
  },
  methods: {
    open1() {
      this.layer1.index = this.$layer({
        content: "1.内容区是文本,destroyOnClose:true,不传id,会重复打开",
        // content:document.getElementById('divtest'),
        success: () => {
          this.layer1.dom = "打开了";
        },
        cancel: () => {
          this.layer1.dom = "隐藏了";
          this.layer1.result = false;
        },
        end: () => {
          this.layer1.dom = "销毁了";
          this.layer1.result = true;
        },
      });
    },
    open2() {
      this.layer2.index = this.$layer({
        destroyOnClose: false,
        content:
          "2.内容区是文本,destroyOnClose:false,不传id,没有id,会重复打开,destroyOnClose会重置为true",
        success: () => {
          this.layer2.dom = "打开了";
        },
        cancel: () => {
          this.layer2.dom = "隐藏了";
          this.layer2.result = false;
        },
        end: () => {
          this.layer2.dom = "销毁了";
          this.layer2.result = true;
        },
      });
    },
    open3() {
      this.layer3.index = this.$layer({
        id: this.layer3.id,
        destroyOnClose: false,
        content:
          "3.内容区是文本,destroyOnClose:false,传id,关闭之后可以重新打开",
        success: () => {
          this.layer3.dom = "打开了";
        },
        cancel: () => {
          this.layer3.dom = "隐藏了";
          this.layer3.result = true;
        },
        end: () => {
          this.layer3.dom = "销毁了";
          his.layer3.result = false;
        },
      });
    },
    open4() {
      this.layer4.index = this.$layer({
        el:'body',
        id: this.layer4.id,
        destroyOnClose: true,
        content: "4.内容区是文本,destroyOnClose:true,传id,销毁之后可以重新打开",
        success: () => {
          this.layer4.dom = "打开了";
          this.$layer.o.instances[this.layer4.index].titlexxx=this.layer4.index
          
        },
        cancel: () => {
          this.layer4.dom = "隐藏了";
          this.layer4.result = false;
        },
        end: () => {
          this.layer4.dom = "销毁了";
          this.layer4.result = true;
        },
      });
    },
  },
};
</script>

<style></style>
