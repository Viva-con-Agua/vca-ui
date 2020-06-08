<template>
    <div class="vca-input" :class="{error: hasError}">
        <div class="vca-money-input">
        <input ref="ta" v-model="displayAmount" :placeholder="label" :disabled="disabled" @change="change" @blur="validate">
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
        }
    },
    data () {
        return {
            hasError: false
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
<style scoped>
.vca-money-input {
    width: 100%;
    display: inline-flex;
    border-radius: 0em;
    border: 0em;
}
.vca-money-input input {
    width: 80%;
    border-radius: 0em;
    border-top-right-radius: 0em;
    border-bottom-right-radius: 0em;;
    border: none;
}
.vca-money-input select {
    background: rgba(34,36,38,.15);
    width: 20%;
    border: none;
    border-left: none;
    border-top-left-radius: 0em;
    border-bottom-left-radius: 0em;
}
</style>
