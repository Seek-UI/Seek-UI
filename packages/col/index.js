/**
 * @author 寻彦（Seek_lin）
 * Date: 17/11/9
 */
import Col from './src/col';

/* istanbul ignore next */
Col.install = function(Vue) {
  Vue.component(Col.name, Col);
};

export default Col;

