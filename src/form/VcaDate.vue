<template>
    <div
        class="vca-input vca-date"
        :class="{
            error: hasError === true,
            valid: hasError === false,
            first: first,
            last: last,
        }">
        <datepicker
            ref="input_date"
            :class="{ error: hasError, valid: hasError === false }"
            :placeholder="placeholder"
            :format="format"
            :language="languages[language]"
            :typeable="typeable"
            :monday-first="isMondayFirst"
            :open-date="defaultValue"
            :disabled-dates="disabledVals"
            v-model="inputValue"
            @selected="validate"
            @input="input" />
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
    import { en, de } from 'vuejs-datepicker/dist/locale';
    import datepicker from 'vuejs-datepicker';
    export default {
        name: 'VcaInputDate',
        components: { datepicker },
        props: {
            value: {
                type: [Number, String],
            },
            default: {
                type: Number,
                default: null,
            },
            disabledValues: {
                type: Object,
            },
            format: {
                type: String,
                default: 'dd.MM.yyyy',
            },
            model: {
                type: Object,
            },
            errorMsg: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: 'please fill',
            },
            language: {
                type: String,
                default: 'de',
                validator: function (value) {
                    // The value must match one of these strings
                    return ['de', 'ch', 'en', 'gb'].indexOf(value) !== -1;
                },
            },
            rules: {
                type: Object,
                default: null,
            },
            first: {
                type: Boolean,
                default: false,
            },
            last: {
                type: Boolean,
                default: false,
            },
            typeable: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                disabledVals: this.disabledValues,
                defaultValue: this.default
                    ? new Date(this.default * 1000)
                    : new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
                inputValue: this.value ? new Date(this.value) * 1000 : 0,
                hasError: null,
                languages: {
                    de: de,
                    ch: de,
                    en: en,
                    gb: en,
                },
            };
        },
        watch: {
            value: function (nVal) {
                console.log('changed: ' + nVal);
                this.value = nVal;
                this.inputValue = this.value ? new Date(this.value) * 1000 : undefined;
            },
        },
        computed: {
            getValue() {
                return new Date(this.value);
            },
            isMondayFirst: function () {
                return this.$props.language === 'de' || this.$props.language === 'ch';
            },
        },
        created() {
            this.checkWrap();
            window.addEventListener('resize', this.checkWrap);
        },
        destroyed() {
            window.removeEventListener('resize', this.checkWrap);
        },
        methods: {
            clearDate() {
                this.$refs.input_date.clearDate();
            },
            checkWrap() {
                /* Wait for DOM to be rendered */
                this.$nextTick(() => {
                    /* Check for first class in DOM */
                    var first = document.querySelectorAll('.first');
                    if (first.length == 0) {
                        return;
                    }

                    /* For each first, check if there */
                    first.forEach((element) => {
                        var parent = element.parentNode;

                        var first = parent.querySelector('.first');
                        var last = parent.querySelector('.last');

                        if (last === null || first === null) {
                            return;
                        }

                        var firstRect = first.getBoundingClientRect();
                        var lastRect = last.getBoundingClientRect();

                        /* If wrapped, set width to 100% */
                        if (firstRect.top < lastRect.top) {
                            first.children[0].style.width = '100%';
                            last.children[0].style.width = '100%';
                            last.children[0].style.marginLeft = '0';
                        } else {
                            first.children[0].style.width = '95%';
                            last.children[0].style.width = '95%';
                            last.children[0].style.marginLeft = '5%';
                        }
                    });
                });
            },
            input() {
                this.$emit(
                    'input',
                    this.inputValue ? this.inputValue.getTime() / 1000 : this.inputValue
                );
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
<style scopred lang="scss">
    @import '../../src/assets/styles/utils/variables';

    .vca-date {
        &.first,
        &.last {
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
            .day__month_btn,
            .month__year_btn {
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
                    content: ' \25BE ';
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
            .prev,
            .next {
                border: solid thin transparent !important;
                width: 42.5px !important;
                box-sizing: border-box;

                &:hover {
                    transition: 0.3s;
                    background-color: white !important;
                    border: solid thin $primary-dark !important;
                    color: $primary-dark !important;
                }

                &.disabled {
                    margin: 0;
                    padding: 0;
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

            &.disabled {
                margin: 0;
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
