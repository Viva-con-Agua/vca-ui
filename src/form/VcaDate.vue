<template>
        <div class="vca-input-date" :class="{error: hasError}">
            <Datepicker
                :class="{error: hasError, first: first, last: last}"
                :placeholder="placeholder"
                format="dd.MM.yyyy"
                :value="value"
                v-model="inputValue"
                @blur="validate"
                @input="input"
                />
            <span v-if="hasError">{{ errorMsg }}</span>
            <span v-else></span>
        </div>
</template>
<script>

import Datepicker from 'vuejs-datepicker';
export default {
  name: 'VcaInputDate',
  components: {Datepicker},
  props: {
    value: {
      type: Date
    },
    format: {
      type: String
    },
    model: {
      type: Object
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
