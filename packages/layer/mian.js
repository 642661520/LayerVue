import { createVNode, render, isVNode } from "vue";
import LayerVueConstructor, { merge } from "./main.vue";
const data = {
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
      const vNode = LayerOptions.instances[index];
      if (vNode) {
        if (!vNode.destroyOnClose) {
          if (vNode.model) {
            vNode.defvisible = true;
          } else {
            vNode.$emit("update:visible", true);
            if (!vNode.defvisible) {
              vNode.defvisible = true;
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
    // console.log(LayerVueConstructor.setup());
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
    const vNode = createVNode(newLayerVueConstructor, { ...options }, isVNode(content) ? { default: () => content } : null);
    console.log("createVNode", vNode, vNode.component);
    vNode.props.onDestroy = () => {
      render(null, container);
      delete LayerOptions.instances[index];
    };

    vNode.appContext = app._context;

    const container = document.createElement("div");
    render(vNode, container);
    console.log("rendervNode", vNode, vNode.component);
    if (document.querySelector(options.el || "#app")) {
      document.querySelector(options.el || "#app").appendChild(container.firstElementChild);
    } else {
      document.body.appendChild(container.firstElementChild);
    }
    console.log("appendChild", vNode, vNode.component);
    vNode.component.proxy.titlexxx = "123131231231";
    vNode.component.proxy.defvisible = true;
    console.log(vNode.component.proxy);

    return index;
  };
  layer.close = async (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vNode = LayerOptions.instances[index];
    if (vNode) {
      let result = await vNode.closefun();
      return result;
    } else {
      LayerOptions.log && console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
      return false;
    }
  };
  layer.reset = (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vNode = LayerOptions.instances[index];
    if (vNode) {
      vNode.resetfun();
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
    const vNode = LayerOptions.instances[index];
    if (vNode && vNode.maxbtn === false) {
      vNode.maxfun();
      return true;
    } else {
      LayerOptions.log && console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
      return false;
    }
  };
  layer.min = (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vNode = LayerOptions.instances[index];
    if (vNode && vNode.minbtn === false) {
      vNode.maxfun();
      return true;
    } else {
      LayerOptions.log && console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
      return false;
    }
  };
  layer.restore = (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vNode = LayerOptions.instances[index];
    if (vNode) {
      vNode.restorefun();
      return true;
    } else {
      LayerOptions.log && console.warn("[layer-warn]:No layer with index ：layer-vue-" + index + " found");
      return false;
    }
  };
  layer.openAgain = (index) => {
    const LayerOptions = app.config.globalProperties.$layer.o;
    index = findIndex(index, LayerOptions);
    const vNode = LayerOptions.instances[index];
    if (vNode) {
      if (!vNode.destroyOnClose && vNode.defvisible === false) {
        if (vNode.model) {
          vNode.defvisible = true;
        } else {
          vNode.$emit("update:visible", true);
          if (!vNode.defvisible) {
            vNode.defvisible = true;
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
    const vNode = LayerOptions.instances[index];
    console.log(vNode);
    if (vNode.model) {
      vNode.$data.deftitle = value;
      return true;
    }
    return false;
  };
  // layer.setContent = (index, value) => {
  //   const LayerOptions = app.config.globalProperties.$layer.o;
  //   index = findIndex(index, LayerOptions);
  //   const vNode = LayerOptions.instances[index];
  //   if (vNode.model) {
  //     if (vNode._ishtml) {
  //     } else if (vNode._isComponent) {
  //       document
  //         .getElementById("layer-vue-" + vNode.index)
  //         .querySelector(".layer-vue-content")
  //         .removeChild(
  //           document
  //             .getElementById("layer-vue-" + vNode.index)
  //             .querySelector(".layer-vue-content").children[0]
  //         );
  //       let chlidinstance = new vNode.content.component({
  //         parent: vNode,
  //         propsData: value
  //       });
  //       for (const key in instances.Vuecomponent.$data) {
  //         if (Object.hasOwnProperty.call(instances.Vuecomponent.$data, key)) {
  //           chlidinstance.$data[key] = instances.Vuecomponent.$data[key];
  //         }
  //       }
  //       chlidinstance.vNode = chlidinstance.$mount();
  //       instances.instance.$children = [chlidinstance.vNode];
  //       instances.Vuecomponent = chlidinstance;
  //       document
  //         .getElementById("layer-vue-" + instances.instance.index)
  //         .querySelector(".layer-vue-content")
  //         .appendChild(chlidinstance.vNode.$el);
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
