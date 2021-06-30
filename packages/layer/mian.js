import { createVNode, render, isVNode } from "vue";
import LayerVueConstructor, { merge } from "./main.vue";
const data = {
  // 默认开启
  defvisible: false,
  endanim: false,
  // 最大化按钮
  maxbtn: false,
  minbtn: false,
  // 最小宽度
  minwidth: 300,
  // 最小高度
  minheight: 200,
  // left
  x: 0,
  // top
  y: 0,
  width: 0,
  height: 0,
  zIndex: 1,
  // display
  display: undefined,
  // 皮肤
  defskin: {},
  // 用于记录初始状态
  initdata: { x: 0, y: 0, width: 300, height: 200 },
  defborderwidth: 0,
  l: {},
  deftitle: undefined,
  // 模式
  model: undefined,
  // 序号
  index: undefined,
  ishtml: false,
  isnewDOM: false,
};
const findIndex = (key, LayerOptions) => {
  let index = -1;
  if (typeof key === "number") {
    index = key;
  } else if (typeof key === "string") {
    index = LayerOptions.instances.findIndex((value) => {
      if (value) {
        return value.id === key;
      }
    });
  }
  return index;
};
let LayerVue = (app) => {
  const layer = function (options) {
    return layer.open(options);
  };

  layer.open = (options = {}) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    if (options.id) {
      let index = findIndex(options.id, LayerOptions);
      console.log(index);
      const vm = LayerOptions.instances[index];
      if (vm) {
        if (!vm.destroyOnClose) {
          if (vm.model) {
            vm.defvisible = true;
          } else {
            vm.$emit("update:visible", true);
            if (!vm.defvisible) {
              vm.defvisible = true;
            }
          }
        }
        return index;
      }
    } else {
      options.destroyOnClose = true;
    }
    // 强制删除传入的visible属性
    delete options.visible;
    const newdata = { ...data };
    const newLayerVueConstructor = { ...LayerVueConstructor };
    // 合并全局皮肤配置到默认配置
    const { skin } = LayerOptions;
    if (options.skin) {
      if (typeof options.skin === "string") {
      } else {
        options.skin = merge(options.skin, skin);
      }
    } else {
      options.skin = skin;
    }
    const { content } = options;
    if (isVNode(content)) {
      delete options.content;
    } else if (content instanceof HTMLElement) {
      newdata.ishtml = true;
      delete options.content;
      if (content.parentNode) {
        if (content.parentNode.className.indexOf("layer-vue") >= 0) {
          return content.parentNode.parentNode.dataset.index;
        } else {
        }
      } else {
        newdata.isnewDOM = true;
      }
    }
    let index = LayerOptions.instances.length;
    LayerOptions.instances.push(undefined);
    newdata.index = index;
    newdata.model = 1;
    newLayerVueConstructor.data = () => {
      return { ...newdata };
    };
    const vm = createVNode(newLayerVueConstructor, { ...options }, isVNode(content) ? { default: () => content } : null);
    vm.props.onDestroy = () => {
      if (vm.props.destroyOnClose) {
        delete LayerOptions.instances[index]
        render(null, container)
      }
    }
    vm.appContext = app._context;
    const container = document.createElement("div");
    render(vm, container);
    if (document.querySelector(options.el)) {
      document.querySelector(options.el || "#app").appendChild(container.firstElementChild);
    } else {
      document.body.appendChild(container.firstElementChild);
    }
    return index;
  };
  layer.close = async (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vm = LayerOptions.instances[index];
    if (vm) {
      let result = await vm.closefun();
      return result;
    } else {
      LayerOptions.log && console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
      return false;
    }
  };
  layer.reset = (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vm = LayerOptions.instances[index];
    if (vm) {
      vm.resetfun();
      return true;
    } else {
      LayerOptions.log && console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
      return false;
    }
  };
  layer.closeAll = async () => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    let closeAll = [];
    LayerOptions.instances.forEach((element) => {
      if (element) {
        closeAll.push(element.closefun());
      }
    });
    let result = await Promise.all(closeAll);
    return result;
  };
  layer.full = (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vm = LayerOptions.instances[index];
    if (vm && vm.maxbtn === false) {
      vm.maxfun();
      return true;
    } else {
      LayerOptions.log && console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
      return false;
    }
  };
  layer.min = (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vm = LayerOptions.instances[index];
    if (vm && vm.minbtn === false) {
      vm.maxfun();
      return true;
    } else {
      LayerOptions.log && console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
      return false;
    }
  };
  layer.restore = (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vm = LayerOptions.instances[index];
    if (vm) {
      vm.restorefun();
      return true;
    } else {
      LayerOptions.log && console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
      return false;
    }
  };
  layer.openAgain = (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vm = LayerOptions.instances[index];
    if (vm) {
      if (!vm.destroyOnClose && vm.defvisible === false) {
        if (vm.model) {
          vm.defvisible = true;
        } else {
          vm.$emit("update:visible", true);
          if (!vm.defvisible) {
            vm.defvisible = true;
          }
        }
        return true;
      } else {
        return false;
      }
    } else {
      LayerOptions.log && console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
      return false;
    }
  };
  layer.setTitle = (index, value) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vm = LayerOptions.instances[index];
    console.log(vm);
    if (vm.model) {
      vm.$data.deftitle = value;
      return true;
    }
    return false;
  };
  // layer.setContent = (index, value) => {
  //   const LayerOptions = app.config.globalProperties.$layer.o;
  //   index = findIndex(index, LayerOptions);
  //   const vm = LayerOptions.instances[index];
  //   if (vm.model) {
  //     if (vm._ishtml) {
  //     } else if (vm._isComponent) {
  //       document
  //         .getElementById("layer-vue-" + vm.index)
  //         .querySelector(".layer-vue-content")
  //         .removeChild(
  //           document
  //             .getElementById("layer-vue-" + vm.index)
  //             .querySelector(".layer-vue-content").children[0]
  //         );
  //       let chlidinstance = new vm.content.component({
  //         parent: vm,
  //         propsData: value
  //       });
  //       for (const key in instances.Vuecomponent.$data) {
  //         if (Object.hasOwnProperty.call(instances.Vuecomponent.$data, key)) {
  //           chlidinstance.$data[key] = instances.Vuecomponent.$data[key];
  //         }
  //       }
  //       chlidinstance.vm = chlidinstance.$mount();
  //       instances.instance.$children = [chlidinstance.vm];
  //       instances.Vuecomponent = chlidinstance;
  //       document
  //         .getElementById("layer-vue-" + instances.instance.index)
  //         .querySelector(".layer-vue-content")
  //         .appendChild(chlidinstance.vm.$el);
  //     } else {
  //       document
  //         .getElementById("layer-vue-" + instances.instance.index)
  //         .querySelector(".layer-vue-content").innerHTML = value;
  //     }
  //   } else {
  //     return false;
  //   }
  // };
  return layer;
};
export { LayerVue, LayerVueConstructor, data, merge };
