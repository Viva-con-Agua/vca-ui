<template>
        <div class="vca-input vca-number" :class="{error: hasError === true, valid: hasError === false, first: first, last: last}">
            <input :class="{error: hasError === true, valid: hasError === false}" :value="value" @change="input" type="number" :max="max" :min="min" :step="step" :placeholder="placeholder">
            <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
            <span v-else></span>
        </div>
</template>
<script>

export default {
  name: 'VcaNumber',
  props: {
    value: {
      type: [ String, Number ]
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    placeholder: {
      type: String,
      default: ''
    },
    rules: {
      type: Object,
      default: null
    },
    errorMsg: {
      type: String,
      default: ''
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
    input (e) {
      this.hasError = false
      if (!e.target.validity.valid) {
        this.hasError = true
      } else {
        this.$emit('input', parseInt(e.target.value))
      }
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
<style style="scss">
  .vca-input {
      &.vca-number {
          input:invalid {
            box-shadow: none;
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
</style>