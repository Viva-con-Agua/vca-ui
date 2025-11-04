import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'
import './assets/main.css'
import './assets/styles/main.scss'
import * as buttons from './buttons'
import * as directives from './directives'
import * as elements from './elements'
import * as form from './form'
import * as layout from './layout'
import * as navigation from './navigation'
import * as table from './table'

const allComponents = {
  ...form,
    ...elements,
    ...layout,
    ...buttons,
    ...navigation,
    ...table
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
export * from './buttons'
export * from './directives'
export * from './elements'
export * from './form'
export * from './layout'
export * from './navigation'

