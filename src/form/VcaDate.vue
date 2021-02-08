<template>
        <div class="vca-input vca-date" :class="{error: hasError}">
            <Datepicker
                :class="{error: hasError, first: first, last: last}"
                :placeholder="placeholder"
                :format="format"
                :value="getValue"
                v-model="inputValue"
                @blur="validate"
                @input="input"
                />
            <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
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
      hasError: false
    }
  },
  computed: {
    getValue() {
      return new Date(this.value)
    }
  },
  methods: {
    input () {
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
<style type="text/css">
  .vdp-datepicker__calendar .cell {
    color: 000 !important;
    border: solid thin transparent !important;
  }
  .vdp-datepicker__calendar .cell:hover {
    background-color: #008fc3 !important;
    color: #fff !important;
  }
  .vdp-datepicker__calendar .cell.selected {
    background-color: #002e6d !important;
    color: #fff !important;
  }
  .vdp-datepicker__calendar .cell.selected:hover {
    border: solid thin transparent !important;
  }
</style>
