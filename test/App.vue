<template>
  <h1>测试</h1>
  <ct/>
  <ft/>
</template>
<script>
import Test from "./components/test.vue";
import { h } from "vue";
import Ct from './components/componenttest/Ct.vue';
import Ft from './components/funtest/Ft.vue';
export default {
  components: {
    Test,
    Ct,
    Ft,
  },
  name: "app",
  data() {
    return {
      zindex: 100,
      visible: false,
      layer1: null,
      layer2: null,
      reset: true,
      isMax: true,
      title: "313131",
      data: { id: 3 },
    };
  },
  // watch: {
  //   title: function (newvalue) {
  //     this.$layer.setTitle(this.layer1, newvalue);
  //   },
  //   data: {
  //     handler: function (newvalue) {
  //       this.$layer.setContent(this.layer1, newvalue);
  //       //或 this.$layer.setContent('layer1', newvalue);
  //     },
  //     deep: true,
  //   },
  // },
  mounted() {},
  methods: {
    open1() {
      this.layer1 = this.$layer({
        // isMax: true,
        // parent: this,
        id: "{id:1}",
        zindex: 999,
        shade: [1, 1],
        el: "#app1",
        // skin: {
        //   //窗口阴影
        //   boxShadow: "1px 1px 50px rgb(0 0 0 / 30%)",
        //   // background: "url(" + require("./bg.png") + ")  0 0/100% 100%",
        //   //标题栏
        //   title: {
        //     //标题栏背景
        //     background: "#5ba",
        //     //标题栏文本色
        //     color: "#bfa",
        //     //标题栏和内容区分割线颜色
        //     borderBottom: "5px solid #123",
        //   },
        //   //内容区
        //   content: {
        //     //内容区背景
        //     background: "red",
        //     //内容区文本色
        //     color: "#ddd",
        //   },
        //   //最大化最小化按钮
        //   maxmin: {
        //     //最大化最小化按钮背景
        //     background: "#fff",
        //     //最大化最小化按钮
        //     color: "#000",
        //     //鼠标移入时最大化最小化按钮文本色
        //     backgroundHover: "#6666",
        //     //鼠标移入时最大化最小化按钮
        //     colorHover: "#008afc",
        //   },
        //   //关闭按钮
        //   close: {
        //     //关闭按钮背景
        //     background: "#323",
        //     //关闭按钮文本色
        //     color: "red",
        //     //鼠标移入时关闭按钮背景
        //     backgroundHover: "#999",
        //     //鼠标移入时关闭按钮文本色
        //     colorHover: "#fff",
        //   },
        // },
        // destroyOnClose: false,
        titleheight: 30,
        // title: true,
        // move: "#movetest",
        maxmin: [1, 1],
        area: [200, 250],
        // isOutAnim: 0,
        // minarea: ["123", "112"],
        offset: "b",
        settop: true,
        // content: this.visible,
        // content: document.getElementById('test'),
        end: () => {
          console.log("end");
        },
        cancel: () => {
          console.log("cancel");
        },
        content: false,
        content: h(Test, this.data),
      });
    },
    async close1() {
      let state = await this.$layer.close(this.layer1);
      console.log(state);
      if (!state) {
        this.$message.warning("窗口不存在或已经关闭");
      }
    },
    async open2() {
      this.zindex += 1;
      // await this.$layer.close(this.layer2);
      this.layer2 = this.$layer({
        // parent: this,
        destroyOnClose: false,
        area: [466, 355],
        offset: "r",
        settop: true,
        // anim:0,
        skin: "winxp",
        id: "123",
        // content: document.getElementById("test"),
        end: () => {
          console.log("end");
        },
        cancel: () => {
          console.log("cancel");
        },
        success: (e, width, height) => {
          console.log(e, width, height);
          setTimeout(() => {
            console.log(this.$layer.setTitle(2, "111"));
          }, 1000);
        },
        resizing: (e, width, height) => {
          // console.log(e,width,height);
        },
        // content: {
        //   component: Test,
        //   data: { id: this.zindex },
        // },
      });
    },

    close2() {
      this.$layer.close(this.layer2);
    },
    close3() {
      this.visible = !this.visible;
    },
    restore() {
      this.$layer.reset(this.layer1);
    },
    end: () => {
      console.log("end");
    },
    cancel: () => {
      console.log("cancel");
    },
    async closeAll() {
      let a = await this.$layer.closeAll();
      console.log(a);
    },
  },
};
</script>
