<template>
    <div class="vca-input vca-checkbox" :class="{error: hasError}">
        <label class="container">
            <div class="vca-row container-row">
                <input type="checkbox" v-model="checked" @change="change" @blur="validate">
                <p class="checkbox-text">
                    <span class="checkmark"></span>
                    <slot></slot>
                </p>
            </div>
        </label>
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
    </div>
</template>
<script>
export default {
    name: 'VcaCheckbox',
    props: {
        value: {
            type: Boolean,
            default: false
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
        }
    },
    data(){
        return {
            checked: false,
            hasError: false
        }
    },
    watch: { 
      value: function(nVal) {
        this.checked = nVal
      }
    },
    mounted () {
        this.checked = this.value
    },
    methods: {
        change (e) {
            this.validate()
            this.$emit('input',  e.target.checked)
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