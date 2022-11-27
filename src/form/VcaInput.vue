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
        <input
            :class="{ error: hasError }"
            :value="value"
            :type="type"
            :disabled="disabled"
            name="value"
            :maxlength="maxLength"
            @input="input"
            @keydown="input"
            @blur="blur"
            :placeholder="placeholder"
        />
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
export default {
    name: "VcaInput",
    props: {
        type: {
            type: String,
            default: "input",
        },
        value: {
            type: String,
        },
        maxLength: {
            type: Number,
            default: 524288,
        },
        errorMsg: {
            type: String,
            default: "",
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
            this.$emit("input", e.target.value);
            if (this.type == "email") {
                return;
            }
            this.hasError = false;
            if (
                !e.target.validity.valid ||
                (this.rules !== null && this.rules.$invalid)
            ) {
                this.hasError = true;
            }
        },
        blur(e) {
            this.$emit("blur", e.target.value);
            this.hasError = false;
            if (
                !e.target.validity.valid ||
                (this.rules !== null && this.rules.$invalid)
            ) {
                this.hasError = true;
            }
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
