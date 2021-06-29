import { LayerVue, LayerVueConstructor } from "./layer/mian";
import "./theme/index.css";
LayerVue.install = (app) => {
  app.component(LayerVueConstructor.name, LayerVueConstructor);
  app.config.globalProperties.$layer = LayerVue;
};
export default LayerVue;
