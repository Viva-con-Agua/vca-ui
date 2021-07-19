<template>
    <div class="vca-input vca-label-field" :class="{error: hasError === true, valid: hasError === false}">
        <div class="vca-input-label">
            <div class="vca-labeled-input-container">
                <div class="top-text" v-if="topText"> {{ topText }} </div>

                <div class="input-fields">
                    <input 
                    class="left"
                    type="number"
                    v-model="money_data.unit" 
                    :placeholder="0"
                    :min="min"
                    :class="css"
                    @input="changeUnit"
                    @blur="validate"
                    @change="change">
                    
                    <span class="middle" :class="css">,</span>
                    <input 
                    class="middle"
                    type="number"
                    v-model="money_data.subunit" 
                    placeholder="00"
                    :min="0"
                    :class="css"
                    @change="change"
                    @blur="validate"
                    @input="changeSubUnit">
                    <div v-if="select" :class="css" class="currency-select">
                        <select v-if="select" v-model="money_data.currency">
                            <option v-for="cur in currency" :key="cur.value" label="€" :value="cur.value">{{ cur.label }}</option>
                        </select>
                    </div>
                    <div v-if="!select" :class="css" class="currency-label">
                        <label v-if="!select" class="currency-select"> {{ currency[0].label }} </label>
                    </div>
                </div>
            </div>
        </div>
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
// TODO SWITCH BACK
import Money from '../utils/Money'
export default {
    name: 'VcaMoneyInput',
    props: {
        value: {
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
        min: {
            type: Number,
            default: 0
        },
        css: {
            type: String,
            default: ""
        },
        threshhold: {
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
            default: ''
        }
    },
    data () {
        return {
            amount: this.value,
            money_data: { unit: Money.getData(this.value).unit, subunit: Money.getData(this.value).subunit, currency: this.value.currency },
            hasError: null,
            lastLength: 0,
            lastPos: 0,
        }
    },
    watch: {
      value: function(nVal) {
        this.amount = nVal
        this.money_data = { unit: Money.getData(nVal).unit, subunit: Money.getData(nVal).subunit, currency: nVal.currency }
      }
    },
    methods: {
        validate () {
            // if validate is set
            if (this.rules !== null) {
                if (this.rules.$invalid) {
                    this.hasError = true
                } else {
                    this.hasError = false
                }
            }
        },
        change() {
            this.$emit("input", { 'amount': Money.getValue(this.money_data), 'currency': this.currency[0].value })
        },
        changeSubUnit(){
            this.money_data.subunit = this.money_data.subunit.substring(this.money_data.subunit.length - 2, this.money_data.subunit.length)
            console.log(this.money_data.subunit)
            if (this.money_data.subunit >= 99) {
                this.money_data.subunit = 99
            }
            if (this.money_data.subunit === "") {
                this.money_data.subunit = 0
            }
            this.change()
        },
        changeUnit(){
            if (this.money_data.unit >= 99999) {
                this.money_data.unit = 99999
            }
            if (this.money_data.unit === "") {
                this.money_data.unit = 0
            }
            this.change()
        }
    }
}

</script>