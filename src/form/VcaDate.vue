<template>
    <div class="vca-input vca-date" :class="{error: hasError === true, valid: hasError === false}">
        <datepicker
        :class="{error: hasError, valid: hasError === false, first: first, last: last}"
        :placeholder="placeholder"
        :format="format"
        :value="getValue"
        v-model="inputValue"
        @selected="validate"
        @input="input"
        />
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>

    import datepicker from 'vuejs-datepicker';
    export default {
      name: 'VcaInputDate',
      components: {datepicker},
      props: {
        value: {
          type: Number
      },
      format: {
          type: String,
          default: 'dd.MM.yyyy'
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
      inputValue: new Date(this.value) * 1000,
      hasError: null
    }
},
computed: {
    getValue() {
      return new Date(this.value)
    }
},
methods: {
    input () {
      this.validate()
      this.$emit('input', this.inputValue.getTime() / 1000)
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

  .vdp-datepicker__calendar {
    .cell {
        transition: 0.3s;
        color: #000 !important;
        border: solid thin transparent !important;
     
        &:hover {
            transition: 0.3s;
            border: solid thin $primary-dark !important;
            color: $primary-dark !important;
        }

        &.selected {
            transition: 0.3s;
            background-color: $main-color !important;
            color: $white !important;
            &:hover {
                transition: 0.3s;
                background-color: $primary-dark !important;
                border: solid thin transparent !important;
            }
        }
    }
}
</style>
