<template>
        <div class="vca-input vca-daytime" :class="{error: hasError === true, valid: hasError === false, first: first, last: last}">
            <vue-timepicker
                :class="{error: hasError === true, valid: hasError === false}"
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
      hasError: null
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
<style scopred lang="scss">
@import "../../src/assets/styles/utils/variables";

.vca-input {

    .time-picker {

      width: 100%;

      input {
          padding: .6em 1em !important;
          width: 100%;  
          height: auto !important;
      }

      .select-list {

          li {

              transition: 0.3s;
              color: #000 !important;
              border: solid thin transparent !important;

              &.hint {
                  font-weight: bold;
                  line-height: 2em;
              }
      
              &.active {
                  transition: 0.3s;
                  background-color: $main-color !important;
                  color: $white !important;
                  &:hover {
                      transition: 0.3s;
                      background-color: $primary-dark !important;
                      border: solid thin transparent !important;
                      color: $white !important;
                  }
              }

              &:hover {  
                  border: solid thin $primary-dark !important;
                  background-color: $white !important;
                  color: $primary-dark !important;
              }

          }

      }

    }

    &.vca-daytime {
        &.first, &.last {
            width: 95%;
            flex-basis: 150px;
            flex-grow: 1;
            flex-shrink: 1;
        }
    }

}

</style>