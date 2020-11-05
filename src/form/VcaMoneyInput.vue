<template>
    <div class="vca-input" :class="{error: hasError}">
        <div class="vca-money-input">
            <div class="vca-input-container" :class="{focus: hasFocus}">
                <label> {{ topText }} </label>
                <input ref="ta" v-model="displayAmount" :placeholder="label" :disabled="disabled" @keyup="keyup()" @click="click" @change="change" @blur="blur" @focus="setFocus">
            </div>
            <div v-if="select" class="currency-select">
                <select v-if="select" v-model="money.currency">
                    <option v-for="cur in currency" :key="cur.value" label="€" :value="cur.value">{{ cur.label }}</option>
                </select>
            </div>
            <div v-if="!select" class="currency-label">
                <label v-if="!select" class="currency-select"> {{ currency[0].label }} </label>
            </div>
        </div>
        <span v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
import Money from '../utils/Money'
export default {
    name: 'VcaMoneyInput',
    props: {
        money: {
            type: Object,
            default: function () {
                return {
                    'amount': 0,
                    'currency': 'EUR'
                }
            }
        },
        currency: {
            type: Array,
            default: function() {
                return     [
                    {
                        label: "€",
                        value: 'EUR'
                    }
                ]
            }
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
        label: {
            'type': String,
            'default': ''
        },
        disabled: {
            'type': Boolean,
            'default': false
        },
        size: {
            type: String,
            default: 'medium'
        },
        select: {
            type: Boolean,
            default: false
        },
        topText: {
            type: String,
            default: ""
        }
    },
    data () {
        return {
            hasError: false,
            hasFocus: false,
            lastLength: 0,
            lastPos: 0,
        }
    },
    computed: {
        displayAmount: {
            get: function () {
                return Money.getInputString(this.money.amount, this.money.currency)
            },
            set: function (value) {
                this.money.amount = Money.getAmount(value)
            }
        }
    },
    methods: {
        internalValidation (numeric) {
            return this.rules.reduce((acc, rule) => {
                var res = acc
                if (rule.validator(numeric)) {
                    res = {
                        'valid': false,
                        'msg': rule.msg
                    }
                }
                return res
            }, {
                'valid': true
            })
        },
        change () {
            this.$emit('change', this.amount)
        },
        keyup () {
            if (typeof this.$refs.ta.selectionStart == "number") {
                var diff = Math.abs(this.lastLength - this.$refs.ta.value.length)
                this.$refs.ta.setSelectionRange(this.lastPos + diff, this.lastPos + diff)

                this.lastLength = this.$refs.ta.value.length
                this.lastPos = this.$refs.ta.selectionStart//this.$refs.ta.selectionEnd;
            } else if (typeof this.$refs.ta.createTextRange != "undefined") {
                this.$refs.ta.focus();
                var range = this.$refs.ta.createTextRange();
                range.collapse(false);
                range.select();
            }
        },
        click () {
            this.lastLength =  this.$refs.ta.value.length
            this.lastPos =  this.$refs.ta.selectionStart
        },
        setFocus () {
            this.lastLength =  this.$refs.ta.value.length
            this.lastPos =  this.$refs.ta.selectionStart
            this.hasFocus = true
        },
        blur () {
            this.validate()
            this.hasFocus = false
        },
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
