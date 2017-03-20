import vLoadMore from 'components/vLoadMore';
import vSimditor from 'components/vSimditor';
const components = {
    vLoadMore,
    vSimditor,
}
module.exports.install = (Vue, options) => {
    Object.keys(components).forEach(name => {
        Vue.component(name, components[name]);
    })
}