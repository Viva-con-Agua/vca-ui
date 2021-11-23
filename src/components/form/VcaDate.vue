<template>
    <div class="vca-input vca-date" :class="{error: hasError === true, valid: hasError === false, first: first, last: last}">
        <datepicker
        :class="{error: hasError, valid: hasError === false}"
        :placeholder="placeholder"
        :format="format"
        :language="languages[language]"
        :typeable="typeable"
        :open-date="defaultValue"
        v-model="inputValue"
        @selected="validate"
        @input="input"
        />
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
    import {en, de} from 'vuejs-datepicker/dist/locale'
    import datepicker from 'vuejs-datepicker';
    export default {
      name: 'VcaInputDate',
      components: {datepicker},
      props: {
        value: {
          type: [Number, String]
      },
      default: {
          type: Number,
          default: null
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
      language: {
          type: String,
          default: 'de',
          validator: function (value) {
            // The value must match one of these strings
            return ['de', 'en'].indexOf(value) !== -1
          }
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
      typeable: {
          type: Boolean,
          default: false
      }
},
data () {
    return {
      defaultValue: (this.default) ? new Date(this.default) * 1000 : new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      inputValue: (this.value) ? new Date(this.value) * 1000 : 0,
      hasError: null,
      languages: {
        'de': de,
        'en': en
      }
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
      this.validate()
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
@import "../../assets/styles/utils/variables";

  .vca-date {

      &.first, &.last {
          width: 95%;
          flex-basis: 150px;
          flex-grow: 1;
          flex-shrink: 1;
          input {
            width: 100% !important;
          }
      }
  }

  .vdp-datepicker__calendar {

    width: 302px !important;

    header {

      .day__month_btn, .month__year_btn {
          border: solid thin transparent !important;
          width: 215px !important;
          box-sizing: border-box;

          &:hover {
              transition: 0.3s;
              background-color: white !important;
              border: solid thin $primary-dark !important;
              color: $primary-dark !important;
          }

          &::after {
            content: " \25BE ";
            position: relative;
            bottom: 2px;
            left: 5px;
          }
          /*&::before {
            content: " \25BE ";
            position: relative;
            bottom: 2px;
            right: 5px;
          }*/
      }
      .prev, .next {

          border: solid thin transparent !important;
          width: 42.5px !important;
          box-sizing: border-box;

          &:hover {
              transition: 0.3s;
              background-color: white !important;
              border: solid thin $primary-dark !important;
              color: $primary-dark !important;
          }
      }

    }


    .cell {
        transition: 0.3s;
        color: #000 !important;
        border: solid thin transparent !important;
        
        &.blank:hover {
            border: solid thin transparent !important;
        }

        &:hover {
            transition: 0.3s;
            border: solid thin $primary-dark !important;
            color: $primary-dark !important;
        }
        &.day-header:hover {
            transition: 0.3s;
            border: solid thin transparent !important;
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
