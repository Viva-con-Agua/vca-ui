import * as form from './form'
import * as elements from './elements'
import * as directives from './directives'
import * as layout from './layout'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import './assets/main.css'
import VueCountryRegionSelect from 'vue-country-region-select'
const allComponents = {
  ...form,
    ...elements,
    ...layout
}

const VcaUi = Vue => {
  Object.values(allComponents).forEach(Comp => Vue.component(Comp.name, Comp))
  Vue.component('v-select', vSelect)
  Vue.use(VueCountryRegionSelect)
  Object.values(directives).forEach(directive =>
    Vue.directive(directive.name, directive)
  )
}

export default VcaUi
export * from './form'
export * from './directives'
export * from './elements'
export * from './layout'