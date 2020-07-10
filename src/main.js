import * as form from './form'
import * as elements from './elements'
import * as directives from './directives'
import * as layout from './layout'
import './assets/main.css'
const allComponents = {
  ...form,
    ...elements,
    ...layout
}

const VcaUi = Vue => {
  Object.values(allComponents).forEach(Comp => Vue.component(Comp.name, Comp))
  Object.values(directives).forEach(directive =>
    Vue.directive(directive.name, directive)
  )
}

export default VcaUi
export * from './form'
export * from './directives'
export * from './elements'
export * from './layout'
