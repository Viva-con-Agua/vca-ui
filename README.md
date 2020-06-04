# vca-ui

## Install

```
npm install --save vca-ui
```
## Use

```
import VcaUi from 'vca-ui'
Vue.use(VcaUi)
```

## Forms
Everything you need for forms. 

### Root element of a form
```
    <vca-form>
        content
    </vca-form>
```

### Define a field element
```
    <vca-field label="Label">
        content
    </vca-field>
```

### content will display in a row 
```
    <vca-field-row>
        content
    </vca-field-row>
```

### Input

[Vuelidate](https://vuelidate.js.org/) rules can apply to the input via `rules` property. 
The errorMsg will show if a rule is invalid. 
For row padding add the propertys `first` or `last`
```
    <vca-input errorMsg="error" v-model="value" :rules="$v.value">
        content
    </vca-input>
```
### MoneyInput
```
<vca-money-input v-model="money" :amount="money"/>
```
Edit `money` datatype.

```
money: {
    amount: 0, //int in cents
    currency: "EUR" //currenry tag
}
```
## Elements

### Tabs

```
<vca-tabs>
    <vca-tab>
        content
    </vca-tab>
</vca-tabs>

```




## Project setup
```
npm install
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
