import { createVNode, render } from "vue";
import LayerVueConstructor from "./main.vue";
let LayerVue = function () {
  const container = document.createElement("div");
  let options = { data: 2 };
  options = { ...options };
  const vm = createVNode(LayerVueConstructor, options);
  render(vm, container);
  document.body.appendChild(container.firstElementChild);
};
export  {LayerVue,LayerVueConstructor};
