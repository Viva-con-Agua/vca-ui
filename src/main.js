// import * as form from './form'
// import * as elements from './elements'
// import * as navigation from './navigation'
// import * as buttons from './buttons'
// import * as table from './table'
// import * as layout from './layout'
import * as components from './components'
import * as directives from './directives'

import vSelect from 'vue-select'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import 'vue-select/dist/vue-select.css';

import './assets/styles/main.scss'
import './assets/main.css'


const VcaUi = {
  install(Vue) {
    for (let componentName in components) {
      const component = components[componentName]
      Vue.component(component.name, component)
    }
    Vue.component('v-select', vSelect)
    Vue.component('vue-timepicker', VueTimepicker)  
    Object.values(directives).forEach(directive =>
      Vue.directive(directive.name, directive)
    )
  }
}

export default VcaUi

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VcaUi)
}

// const allComponents = {
//   ...form,
//     ...elements,
//     ...layout,
//     ...buttons,
//     ...navigation,
//     ...table
// }

// const VcaUi = Vue => {
//   Object.values(allComponents).forEach(Comp => Vue.component(Comp.name, Comp))
//   Vue.component('v-select', vSelect)
//   Vue.component('vue-timepicker', VueTimepicker)
//   Object.values(directives).forEach(directive =>
//     Vue.directive(directive.name, directive)
//   )
// }

// export default VcaUi
// export * from './form'
// export * from './directives'
// export * from './elements'
// export * from './layout'
// export * from './buttons'
// export * from './navigation'
