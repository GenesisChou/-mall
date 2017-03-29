import vSupport from 'components/vSupport';
import vSimditor from 'components/vSimditor';
const components = {
    vSimditor,
    vSupport
};
module.exports.install = (Vue, options) => {
    Object.keys(components).forEach(name => {
        Vue.component(name, components[name]);
    });
};