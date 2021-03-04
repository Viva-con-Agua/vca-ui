<template>
        <div class="vca-input vca-daytime" :class="{error: hasError}">
            <vue-timepicker
                :class="{error: hasError, first: first, last: last}"
                :placeholder="placeholder"
                :format="format"
                close-on-complete
                :minute-interval="minuteInterval"
                :second-interval="secondInterval"

                v-model="inputValue"
                @blur="validate"
                @close="validate"
                @input="input"
                />
            <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
            <span v-else></span>
        </div>
</template>
<script>

export default {
  name: 'VcaDaytime',
  props: {
    value: {
      type: Object      
    },
    format: {
      type: String,
      default: 'HH:mm'
    },
    minuteInterval: {
      type: String,
      default: '15'
    },
    secondInterval: {
      type: String,
      default: '15'
    },
    errorMsg: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'please fill'
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
    }

  },
  data () {
    return {
      inputValue: this.value,
      hasError: false
    }
  },
  methods: {
    input () {
      this.$emit('input', this.inputValue)
    },
    // validate form via vuelidate
    validate () {
      // if validate is set
      if (this.rules !== null) {
        if (this.rules.$invalid) {
          this.hasError = true
        } else {
          this.hasError = false
        }
      }
    }
  }
}
</script>
<style lang="scss">
  .vca-input .time-picker {

    width: 100% !important;
    
    input {
      padding: .6em 1em !important;
      width: 100% !important;  
      height: auto !important;
    }

    .select-list {

      li.hint {
        font-weight: bold;
        line-height: 2em;
      }

      li:hover {  
        background-color: #008fc3 !important;
        color: #fff !important;
      }
      li.active {
        background-color: #002e6d !important;
      }
    }

  }
  
</style>
<style scoped>
  .vca-input-daytime .time-picker {
    width: 100%;
  }
</style>