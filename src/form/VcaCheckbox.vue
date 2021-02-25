<template>
    <div class="vca-input vca-checkbox" :class="{error: hasError}">
        <label class="container">
            <input type="checkbox" v-model="checked" @change="change" @blur="validate">
            <span class="checkmark"></span>
            <slot></slot>
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
    mounted () {
        this.checked = this.value
    },
    methods: {
        change (e) {
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