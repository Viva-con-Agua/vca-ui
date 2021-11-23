<template>
  <div class="grid-container">
    <div class="grid-item-component">
      <component ref="component"  :is="componentName" v-bind="componentProperties">
        <slot></slot>
      </component>
    </div>
    <div class="grid-item-settings">
      <div class="settings-box" v-for="(value, key) in componentProperties" :key="key">
        <div v-if="properties[key] === 'String'">
          {{key}}
          <input type="text" placeholder="enter text" v-model="componentProperties[key]">
        </div>
        <div v-if="properties[key] === 'Number'">
          {{key}}
          <input type="number" placeholder="enter number" v-model="componentProperties[key]">
        </div>
        <div v-if="properties[key] === 'Boolean'">
          {{key}}
          <!-- <input type="text" placeholder="enter text" v-model="componentProperties[key]"> -->
          <label class="switch">
            <input type="checkbox" v-model="componentProperties[key]">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
    <div class="grid-item-code pre-wrapper">
      <button type="button" class="copy-button" @click="copyToClipboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24 17v-21h21v2h-19v19h-2z"/></svg>
      </button>
      <pre :class="{selectcode: showSelection} "><code ref="codesnippet">{{codeOutput}}</code></pre>
    </div>
  </div>
</template>

<script>
import VcaDropButton from '../../../src/components/buttons/VcaDropButton.vue'
  // import Prism from "prismjs";
  // import "prismjs/themes/prism.css"; // you can change

  export default {
  components: { VcaDropButton },
    name: "Demo",
    props: {
      componentName: { type: String, required: true },
      properties: { type: Object, required: true},
    },
    data() {
      return {
        component: null,
        componentProperties: {},
        codeOutput: '',
        showSelection: false,
      }
    },
    computed: {
      // codeOutput() {
      //   const codeSnippet = 
      //     `<${this.componentName}\n  ${''}\n>\n</${this.componentName}>`;
      //   return codeSnippet;
      // },
    },
    watch: {
      componentProperties: {
        handler (newValue, oldValue) {
          let formattedPropertiesString = ''
          for (let key in this.componentProperties){
            switch (this.properties[key]) {
              case 'String':
                formattedPropertiesString = formattedPropertiesString.concat("\n  ",key, '="', this.componentProperties[key], '"')
                break;
              case 'Number':
                formattedPropertiesString = formattedPropertiesString.concat("\n  ",key, '="', this.componentProperties[key], '"')
                break;
              case 'Boolean':
                if (this.componentProperties[key]) formattedPropertiesString = formattedPropertiesString.concat("\n  ",key)
                break;
            
              default:
                break;
            }

          }
          this.codeOutput = `<${this.componentName}${formattedPropertiesString}\n>\n</${this.componentName}>`;
        },
        deep: true
      }
    },
    methods: {
      copyToClipboard() {
        try {
          navigator.clipboard.writeText(this.codeOutput)
          this.showSelection = true;
          console.log('copied')
        } catch (error) {
          console.error(error)
        }
      },
      createDefaultProps() {
        let props = {}
        for (let propName in this.properties) {
          switch (this.properties[propName]) {
            case 'String':
              props[propName] = ''
              break;
            case 'Boolean':
              props[propName] = false
              break;
            case 'Number':
              props[propName] = 0
              break;
            default:
              break;
          } 
        }
        return props
      }
    },
    mounted() {
      this.componentProperties = this.createDefaultProps()
    },
  }
</script>

<style lang="scss" scoped>
.grid-container {
  min-height: 30vh;
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr min-content;
  grid-template-areas: 
    'component settings'
    'code code';
  background-color: #ffffff;

  .grid-item-component {
    grid-area: component;
    background-color: #ffffff;
    border: #e0e0e0 solid 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .grid-item-settings {
    grid-area: settings;
    border: #e0e0e0 solid 1px;
    background-color: #f9f9f9;
    // display: flex;
    // justify-content: center;
    // align-items: center;

    .settings-box {
      padding: 10px;
      border-bottom: 1px solid #e0e0e0;
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .grid-item-code {
    grid-area: code;
    background-color: #31529300;
    // // display: flex;
    // // justify-content: left;
    // // align-items: center;
    // white-space: pre-wrap;

  }
  .pre-wrapper pre {
    margin-top: 0px;
    // margin-bottom: 0px;
    border-radius: 0px 0px 5px 5px;
    // display: flex;
    // justify-content: left;
    // align-items: center;
  }
  .switch {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 16px;
  }

  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 0px;
    bottom: 0px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .copy-button {
    position: absolute;
    right: 4px;
    background: rgba(255, 255, 255, 0);
    border: none;
    padding: 6px;
    border-radius: 100%;
    cursor: pointer;
    
    &:hover{
      background: #ffffff30;
    }

    svg {
      fill: rgb(194, 194, 194);
    }
  }
  .selectcode {
    user-select: all;
  }
}
  
</style>