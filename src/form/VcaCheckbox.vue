<template>
    <div
        class="vca-input vca-checkbox"
        :class="{ error: hasError === true, valid: hasError === false }"
    >
        <label class="container">
            <div class="vca-row container-row">
                <input
                    :disabled="disabled"
                    v-if="!isArray"
                    type="checkbox"
                    v-model="checked"
                    :name="name"
                    @change="change"
                    @blur="validate"
                />
                <input
                    :disabled="disabled"
                    v-else
                    type="checkbox"
                    @change="change"
                    :value="id"
                    :name="name"
                    v-model="checked"
                />
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
    name: "VcaCheckbox",
    props: {
        value: {
            type: [Boolean, Array],
            default: false,
        },
        errorMsg: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            default: "",
        },
        placeholder: {
            type: String,
            default: "please fill",
        },
        id: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        rules: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            checked: false,
            hasError: null,
            isArray: false,
        };
    },
    watch: {
        value: function (nVal) {
            this.checked = nVal;
        },
    },
    mounted() {
        this.isArray = Array.isArray(this.value);
        this.checked = this.value;
    },
    methods: {
        change(e) {
            if (this.isArray) {
                this.$emit("input", this.checked);
            } else {
                this.$emit("input", e.target.checked);
            }
            this.validate();
        },
        // validate form via vuelidate
        validate() {
            // if validate is set
            if (this.rules !== null) {
                if (this.rules.$invalid) {
                    this.hasError = true;
                } else {
                    this.hasError = false;
                }
            }
        },
    },
};
</script>
