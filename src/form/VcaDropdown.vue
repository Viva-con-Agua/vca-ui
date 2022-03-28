<template>
    <div class="dropdown-container">
        <label>{{ label }}</label>
        <div class="vca-input" :class="{error: hasError === true, valid: hasError === false, first: first, last: last}">
            <v-select
                    class="custom-style"
                    :value="currentOptions"
                    :options="options"
                    :class="{error: hasError === true, valid: hasError === false}"
                    :multiple="multiple"
                    :taggable="taggable"
                    :placeholder="placeholder"
                    v-on:input="handleClick"
            >
                <span slot="no-options">Bitte auswählen</span>
                <template slot="option" slot-scope="option">
                    <div class="dropdown-option">
                        <h3 class="option-title">{{ option.title }}</h3>
                        <h5 v-if="option.subtitle" class="option-subtitle">{{ option.subtitle }}</h5>
                    </div>
                </template>
            </v-select>
            <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
            <span v-else></span>
        </div>

    </div>
</template>

<script>
export default {
    name: "VcaDropdown",
    props: {
        value: {
            type: Array,
            default: function() {
                return []
            }
        },
        title: {
            type: String,
            default: 'deprecated, remove title, use placeholder'
        },
        placeholder: {
            type: String,
            default: 'default placeholder'
        },
        label: {
            type: String,
            default: 'default label'
        },
        rules: {
            type: Object,
            default: null
        },
        first: {
            type: Boolean,
            default: false
        },
        last: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        taggable: {
            type: Boolean,
            default: false
        },
        errorMsg: {
            type: String,
            default: 'Error'
        },
        options: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            currentOptions: this.value,
            hasError: null
        }
    },
    created() {
        if (!this.value) {
            return []
        }
        var preSelected = []
        this.value.forEach(val => {
          var value = this.options.find(element => element.value == val.value)
          if (value != null) {
            preSelected.push(value)
          } else if(this.taggable) {
            preSelected.push(val)
          }
        })
        this.currentOptions = preSelected
    },
    watch: {
      value: function(nVal) {
        this.setPreselection(nVal)
      },
      options: function() {
        this.setPreselection(this.value)
      }
    },
    methods: {
        setPreselection(val) {
            var preSelected = []
            val.forEach(val => {
              var value = this.options.find(element => element.value == val.value)
              if (value != null) {
                preSelected.push(value)
              } else if(this.taggable) {
                preSelected.push(val)
              }
            })
            this.currentOptions = preSelected
        },
        handleClick(event) {
            if(event !== null) {

                // Set event as an array if its only a single selection, otherwise we cannot handle the model correctly
                if(!Array.isArray(event)) {
                    event = [event]                
                }

                this.currentOptions = event
                this.$emit("input", event)
            } else {
                this.currentOptions = []
                this.$emit("input", [])
            }
            this.validate()
        },
        validate () {
              this.hasError = false
              if (this.rules !== null && this.rules.$invalid) {
                this.hasError = true
              }
        }
    }
}
</script>