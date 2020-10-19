<template>
        <div class="vca-input" :class="{error: hasError, first: first, last: last}">
            <input
                :class="{error: hasError}"
                :value="value"
                :type="type"
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
    type: {
        type: String,
        default: 'input'
    },
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
  created() {
    this.checkWrap()
    window.addEventListener("resize", this.checkWrap);
  },
  destroyed() {
    window.removeEventListener("resize", this.checkWrap);
  },
  data () {
    return {
      inputValue: '',
      hasError: false
    }
  },
  methods: {

    checkWrap() {
      /* Wait for DOM to be rendered */
      this.$nextTick(() => {

        /* Check for first class in DOM */
        var first = document.querySelectorAll(".first")
        if (first.length == 0) {
          return
        }

        /* For each first, check if there */
        first.forEach((element) => {
          var parent = element.parentNode

          var first = parent.querySelector(".first")
          var last = parent.querySelector(".last")

          var firstRect = first.getBoundingClientRect();
          var lastRect = last.getBoundingClientRect();

          /* If wrapped, set width to 100% */
          if (firstRect.top < lastRect.top) {
              first.children[0].style.width = "100%";
              last.children[0].style.width = "100%";
              last.children[0].style.marginLeft = "0";
          } else {
              first.children[0].style.width = "95%";
              last.children[0].style.width = "95%";
              last.children[0].style.marginLeft = "5%";
          }

        })

      })
    },
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

