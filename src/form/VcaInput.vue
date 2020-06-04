<template>
        <div class="vca-input" :class="{error: hasError, first: first, last: last}">
            <input
                :class="{error: hasError}"
                :value="value"
                type="value"
                name="value"
                @input="input"
                :placeholder="placeholder"
                @blur="validate"
                />
            <span v-if="hasError">{{ errorMsg }}</span>
            <span v-else></span>
        </div>
</template>
<script>
export default {
  name: 'VcaInput',
  props: {
    value: {
      type: String
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
      inputValue: '',
      hasError: false
    }
  },
  methods: {
    input (e) {
      this.$emit('input', e.target.value)
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

