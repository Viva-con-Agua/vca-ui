<template>
    <div
        class="vca-input"
        :class="{
            error: hasError === true,
            valid: hasError === false,
            first: first,
            last: last,
        }"
    >
        <textarea
            :class="{ error: hasError === true, valid: hasError === false }"
            :value="value"
            :type="type"
            :maxlength="maxlength"
            :disabled="disabled"
            :name="name"
            @input="input"
            :placeholder="placeholder"
            ref="inputField"
            @blur="blur"
        >
        </textarea>
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
export default {
    name: "VcaTextarea",
    props: {
        type: {
            type: String,
            default: "input",
        },
        value: {
            type: String,
        },
        name: {
            type: String,
            default: "",
        },
        errorMsg: {
            type: String,
            default: "",
        },
        maxlength: {
            type: Number,
            default: 10000,
        },
        placeholder: {
            type: String,
            default: "please fill",
        },
        rules: {
            type: Object,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        first: {
            type: Boolean,
            default: false,
        },
        last: {
            type: Boolean,
            default: false,
        },
    },
    created() {
        this.checkWrap();
        window.addEventListener("resize", this.checkWrap);
    },
    destroyed() {
        window.removeEventListener("resize", this.checkWrap);
    },
    data() {
        return {
            hasError: null,
        };
    },
    methods: {
        focusInput() {
            this.$refs.inputField.focus();
        },
        checkWrap() {
            /* Wait for DOM to be rendered */
            this.$nextTick(() => {
                /* Check for first class in DOM */
                var first = document.querySelectorAll(".first");
                if (first.length == 0) {
                    return;
                }

                /* For each first, check if there */
                first.forEach((element) => {
                    var parent = element.parentNode;

                    var first = parent.querySelector(".first");
                    var last = parent.querySelector(".last");

                    if (last === null || first === null) {
                        return;
                    }

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
                });
            });
        },
        input(e) {
            this.hasError = false;
            if (
                !e.target.validity.valid ||
                (this.rules !== null && this.rules.$invalid)
            ) {
                this.hasError = true;
            }
            this.$emit("input", e.target.value);
        },
        blur(e) {
            this.hasError = false;
            if (
                !e.target.validity.valid ||
                (this.rules !== null && this.rules.$invalid)
            ) {
                this.hasError = true;
            }
            this.$emit("blur", e.target.value);
        },
        validate() {
            this.hasError = false;
            if (this.rules !== null && this.rules.$invalid) {
                this.hasError = true;
            }
        },
    },
};
</script>
