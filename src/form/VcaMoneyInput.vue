<template>
    <div class="vca-input" :class="{error: hasError}">
        <div class="vca-labeled-input">
            <div class="vca-labeled-input-container">
                <label v-if="topText"> {{ topText }} </label>
                <div class="vca-right">
                    <input 
                     class="left"
                     type="number"
                     v-model="money_data.unit" 
                     :placeholder="0" 
                     min="0"
                     @input="changeUnit"
                     @blur="blur"
                     @change="change">
                    
                    <span class="middle">,</span>
                    <input 
                     class="middle"
                     type="number"
                     v-model="money_data.subunit" 
                     placeholder="00"
                     @change="change"
                     @blur="blur"
                     @input="changeSubUnit">
                </div>
            </div>
            <div v-if="select" class="currency-select">
                <select v-if="select" v-model="money_data.currency">
                    <option v-for="cur in currency" :key="cur.value" label="€" :value="cur.value">{{ cur.label }}</option>
                </select>
            </div>
            <div v-if="!select" class="currency-label">
                <label v-if="!select" class="currency-select"> {{ currency[0].label }} </label>
            </div>
        </div>
        <span class="errorMsg" v-if="hasError">{{ errorMsg }}</span>
        <span v-else></span>
    </div>
</template>
<script>
import Money from '@/utils/Money'
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
            money_data: { unit: Money.getData(this.value).unit, subunit: Money.getData(this.value).subunit, currency: this.value.currency },
            hasError: false,
            lastLength: 0,
            lastPos: 0,
        }
    },
    watch: {
      value: function(nVal) {
        this.money_data = { unit: Money.getData(nVal).unit, subunit: Money.getData(nVal).subunit, currency: nVal.currency }
      }
    },
    methods: {
        blur () {
            this.validate()
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
        },
        change() {
            this.$emit("input", { 'amount': Money.getValue(this.money_data), 'currency': this.currency[0].value })
        },
        changeSubUnit(){
            this.money_data.subunit = this.money_data.subunit.substring(this.money_data.subunit.length - 2, this.money_data.subunit.length)
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
<style scoped>

input[class*="middle"] {
    text-align: left;
}
input[class*="left"] {
    text-align: right;
    width: 100px;
}

</style>