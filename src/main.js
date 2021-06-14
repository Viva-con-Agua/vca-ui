import * as form from './form'
import * as elements from './elements'
import * as directives from './directives'
import * as navigation from './navigation'
import * as buttons from './buttons'
import * as layout from './layout'
import vSelect from 'vue-select'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import 'vue-select/dist/vue-select.css';
import './assets/main.css'
import './assets/styles/main.scss'

const allComponents = {
  ...form,
    ...elements,
    ...layout,
    ...buttons,
    ...navigation
}

const VcaUi = Vue => {
  Object.values(allComponents).forEach(Comp => Vue.component(Comp.name, Comp))
  Vue.component('v-select', vSelect)
  Vue.component('vue-timepicker', VueTimepicker)
  Object.values(directives).forEach(directive =>
    Vue.directive(directive.name, directive)
  )
}

export default VcaUi
export * from './form'
export * from './directives'
export * from './elements'
export * from './layout'
